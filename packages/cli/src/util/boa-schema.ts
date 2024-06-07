import { z } from 'zod';
import fs from 'fs-extra';
import path from 'path';
import { errorMap } from 'zod-validation-error';

z.setErrorMap(errorMap);

export const buildsSchema = z.object({
  target: z.enum(['preview', 'production']),
  argv: z.string().array(),
  builds: z.array(
    z.object({
      require: z.string(), // eg. `@vercel/node`
      requirePath: z.string(),
      // requirePath: z.string().refine(async (path: string) => {
      //   // This doesn't specify an extension, so if we want to check this exists we need to check all possible (.js, .mjs, .cjs, other?)
      //   // const exists = await fs.existsSync(x);
      //   return true;
      // }),
      apiVersion: z.literal(3),
      use: z.string(), // eg. @vercel/node
      src: z.string(),
      config: z.object({ zeroConfig: z.boolean() }),
    })
  ),
});

export const configSchema = z.object({
  version: z.number(),
  routes: z
    .array(
      z.union([
        z.object({
          handle: z.enum([
            'rewrite',
            'filesystem',
            'resource',
            'miss',
            'hit',
            'error',
          ]),
          src: z.string().nullish(),
          dest: z.string().nullish(),
          status: z.number().nullish(),
        }),
        z.object({
          src: z.string().nullish(),
          status: z.number().nullish(),
          headers: z.object({ Location: z.string() }).nullish(),
          dest: z.string().nullish(),
          continue: z.boolean().nullish(),
          check: z.boolean().nullish(),
          methods: z.array(z.string()).nullish(),
          all: z.boolean().nullish(),
          next: z.boolean().nullish(),
          handle: z.string().nullish(),
          script: z.string().nullish(),
          image: z.string().nullish(),
          use: z.string().nullish(),
          config: z.object({ zeroConfig: z.boolean() }).nullish(),
        }),
      ])
    )
    .nullish(),
  images: z
    .object({
      sizes: z.array(z.number()),
      domains: z.array(z.string()),
      minimumCacheTTL: z.number(),
      formats: z.array(z.string()),
      remotePatterns: z.array(
        z.object({
          protocol: z.string(),
          hostname: z.string(),
          pathname: z.string(),
        })
      ),
    })
    .nullish(),
  wildcard: z
    .object({
      domain: z.string(),
      value: z.string(),
    })
    .array()
    .nullish(),
  overrides: z.record(z.string(), z.object({ path: z.string() })).nullish(),
  cache: z.string().array().nullish(),
  crons: z
    .object({
      path: z.string(),
      schedule: z.string(),
    })
    .array()
    .nullish(),
});

export const vcServerlessSchema = z.object({
  operationType: z.enum(['ISR']).nullish(),
  handler: z.string(), // this is a file that should be present '___next_launcher.cjs',
  runtime: z.enum(['nodejs20.x']), // not sure if this value is standardized
  environment: z.record(z.string(), z.string()), // docs say this is an array
  supportsMultiPayloads: z.boolean().nullish(), // not documented
  framework: z
    .object({
      slug: z.enum(['next']), // not sure if this value is standardized
      version: z.string(),
    })
    .nullish(),
  experimentalAllowBundling: z.boolean().nullish(),
  launcherType: z.literal('Nodejs'), // currently only supports Nodejs
  shouldAddHelpers: z.boolean(),
  shouldAddSourcemapSupport: z.boolean(),
});

export const vcEdgeFunctionsSchema = z.object({
  runtime: z.literal('edge'),
  deploymentTarget: z.enum(['v8-worker']),
  entrypoint: z.string(), // this is afile that should be checked. Also ensure it's ['.js', '.json', '.wasm']
  envVarsInUse: z.array(z.string()),
  framework: z.object({
    slug: z.enum(['remix']),
    version: z.string(),
  }),
  regions: z.union([z.literal('all'), z.string(), z.array(z.string())]),
});

export const prerenderFunctionsSchema = z.object({
  type: z.literal('Prerender'),
  expiration: z.boolean(),
  group: z.number(),
  bypassToken: z.string(),
  experimentalBypassFor: z.array(
    z.object({ type: z.string(), key: z.string(), value: z.string() })
  ),
  fallback: z.union([
    z.string(), //docs say it's a string but my example shows an object
    z.object({
      type: z.literal('FileFsRef'),
      mode: z.number(),
      fsPath: z.string(), // actual file
    }),
  ]),
  initialHeaders: z.record(z.string(), z.string()),
});

const findAllFilesRecursively = (
  dir: string,
  filename: string | ((filename: string) => boolean)
) => {
  let results: string[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(findAllFilesRecursively(filePath, filename));
    } else {
      if (typeof filename === 'function') {
        if (filename(file)) {
          results.push(filePath);
        }
      } else {
        if (file === filename) {
          results.push(filePath);
        }
      }
    }
  }
  return results;
};

export const vcConfigSchema = z.union([
  vcServerlessSchema,
  vcEdgeFunctionsSchema,
]);

export const validateBOA = async (dir: string) => {
  // find the builds.json file and validate it
  const builds = await fs.readJSON(`${dir}/builds.json`);
  await buildsSchema.parseAsync(builds);

  // find the config.json file and validate it
  const config = await fs.readJSON(`${dir}/config.json`);
  await configSchema.parseAsync(config);

  // find all `.vc-config.json` files and validate them
  const vcConfigs = findAllFilesRecursively(dir, '.vc-config.json');
  for await (const vcConfig of vcConfigs) {
    const vcConfigJson = await fs.readJSON(vcConfig);
    await vcConfigSchema.parseAsync(vcConfigJson, {});
  }

  // find all `*.prerender-config.json` functions and validate them
  const prerenderConfigs = findAllFilesRecursively(dir, (file: string) =>
    file.endsWith('.prerender-config.json')
  );
  for await (const prerenderConfig of prerenderConfigs) {
    const prerenderConfigJson = await fs.readJSON(prerenderConfig);
    await prerenderFunctionsSchema.parseAsync(prerenderConfigJson, {});
  }
};
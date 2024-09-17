/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { VercelCore } from "../core.js";
import {
  encodeFormQuery as encodeFormQuery$,
  encodeSimple as encodeSimple$,
} from "../lib/encodings.js";
import * as m$ from "../lib/matchers.js";
import * as schemas$ from "../lib/schemas.js";
import { RequestOptions } from "../lib/sdks.js";
import { extractSecurity, resolveGlobalSecurity } from "../lib/security.js";
import { pathToFunc } from "../lib/url.js";
import {
  ConnectionError,
  InvalidRequestError,
  RequestAbortedError,
  RequestTimeoutError,
  UnexpectedClientError,
} from "../models/errors/httpclienterrors.js";
import { SDKError } from "../models/errors/sdkerror.js";
import { SDKValidationError } from "../models/errors/sdkvalidationerror.js";
import {
  GetSecretRequest,
  GetSecretRequest$outboundSchema,
  GetSecretResponseBody,
  GetSecretResponseBody$inboundSchema,
} from "../models/operations/getsecret.js";
import { Result } from "../types/fp.js";

/**
 * Get a single secret
 *
 * @remarks
 * Retrieves the information for a specific secret by passing either the secret id or name in the URL.
 */
export async function secretsGet(
  client$: VercelCore,
  request: GetSecretRequest,
  options?: RequestOptions,
): Promise<
  Result<
    GetSecretResponseBody,
    | SDKError
    | SDKValidationError
    | UnexpectedClientError
    | InvalidRequestError
    | RequestAbortedError
    | RequestTimeoutError
    | ConnectionError
  >
> {
  const input$ = request;

  const parsed$ = schemas$.safeParse(
    input$,
    (value$) => GetSecretRequest$outboundSchema.parse(value$),
    "Input validation failed",
  );
  if (!parsed$.ok) {
    return parsed$;
  }
  const payload$ = parsed$.value;
  const body$ = null;

  const pathParams$ = {
    idOrName: encodeSimple$("idOrName", payload$.idOrName, {
      explode: false,
      charEncoding: "percent",
    }),
  };

  const path$ = pathToFunc("/v3/secrets/{idOrName}")(pathParams$);

  const query$ = encodeFormQuery$({
    "decrypt": payload$.decrypt,
    "slug": payload$.slug,
    "teamId": payload$.teamId,
  });

  const headers$ = new Headers({
    Accept: "application/json",
  });

  const bearerToken$ = await extractSecurity(client$.options$.bearerToken);
  const security$ = bearerToken$ == null ? {} : { bearerToken: bearerToken$ };
  const context = {
    operationID: "getSecret",
    oAuth2Scopes: [],
    securitySource: client$.options$.bearerToken,
  };
  const securitySettings$ = resolveGlobalSecurity(security$);

  const requestRes = client$.createRequest$(context, {
    security: securitySettings$,
    method: "GET",
    path: path$,
    headers: headers$,
    query: query$,
    body: body$,
    timeoutMs: options?.timeoutMs || client$.options$.timeoutMs || -1,
  }, options);
  if (!requestRes.ok) {
    return requestRes;
  }
  const request$ = requestRes.value;

  const doResult = await client$.do$(request$, {
    context,
    errorCodes: ["400", "401", "403", "404", "410", "4XX", "5XX"],
    retryConfig: options?.retries
      || client$.options$.retryConfig,
    retryCodes: options?.retryCodes || ["429", "500", "502", "503", "504"],
  });
  if (!doResult.ok) {
    return doResult;
  }
  const response = doResult.value;

  const [result$] = await m$.match<
    GetSecretResponseBody,
    | SDKError
    | SDKValidationError
    | UnexpectedClientError
    | InvalidRequestError
    | RequestAbortedError
    | RequestTimeoutError
    | ConnectionError
  >(
    m$.json(200, GetSecretResponseBody$inboundSchema),
    m$.fail([400, 401, 403, 404, 410, "4XX", "5XX"]),
  )(response);
  if (!result$.ok) {
    return result$;
  }

  return result$;
}
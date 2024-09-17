# GetProjectsRequest

## Example Usage

```typescript
import { GetProjectsRequest } from "@vercel/sdk/models/operations/getprojects.js";

let value: GetProjectsRequest = {
  gitForkProtection: "1",
  repoUrl: "https://github.com/vercel/next.js",
};
```

## Fields

| Field                                                                                                       | Type                                                                                                        | Required                                                                                                    | Description                                                                                                 | Example                                                                                                     |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `from`                                                                                                      | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | Query only projects updated after the given timestamp                                                       |                                                                                                             |
| `gitForkProtection`                                                                                         | [operations.GitForkProtection](../../models/operations/gitforkprotection.md)                                | :heavy_minus_sign:                                                                                          | Specifies whether PRs from Git forks should require a team member's authorization before it can be deployed | 1                                                                                                           |
| `limit`                                                                                                     | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | Limit the number of projects returned                                                                       |                                                                                                             |
| `search`                                                                                                    | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | Search projects by the name field                                                                           |                                                                                                             |
| `repo`                                                                                                      | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | Filter results by repo. Also used for project count                                                         |                                                                                                             |
| `repoId`                                                                                                    | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | Filter results by Repository ID.                                                                            |                                                                                                             |
| `repoUrl`                                                                                                   | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | Filter results by Repository URL.                                                                           | https://github.com/vercel/next.js                                                                           |
| `excludeRepos`                                                                                              | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | Filter results by excluding those projects that belong to a repo                                            |                                                                                                             |
| `edgeConfigId`                                                                                              | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | Filter results by connected Edge Config ID                                                                  |                                                                                                             |
| `edgeConfigTokenId`                                                                                         | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | Filter results by connected Edge Config Token ID                                                            |                                                                                                             |
| `deprecated`                                                                                                | *boolean*                                                                                                   | :heavy_minus_sign:                                                                                          | N/A                                                                                                         |                                                                                                             |
| `teamId`                                                                                                    | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | The Team identifier to perform the request on behalf of.                                                    |                                                                                                             |
| `slug`                                                                                                      | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | The Team slug to perform the request on behalf of.                                                          |                                                                                                             |
# CancelDeploymentGitSource3

## Example Usage

```typescript
import { CancelDeploymentGitSource3 } from "@vercel/sdk/models/operations/canceldeployment.js";

let value: CancelDeploymentGitSource3 = {
  type: "gitlab",
  projectId: 1875.52,
};
```

## Fields

| Field                                                                                                                                      | Type                                                                                                                                       | Required                                                                                                                                   | Description                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`                                                                                                                                     | [operations.CancelDeploymentGitSourceDeploymentsResponseType](../../models/operations/canceldeploymentgitsourcedeploymentsresponsetype.md) | :heavy_check_mark:                                                                                                                         | N/A                                                                                                                                        |
| `projectId`                                                                                                                                | *operations.CancelDeploymentGitSourceProjectId*                                                                                            | :heavy_check_mark:                                                                                                                         | N/A                                                                                                                                        |
| `ref`                                                                                                                                      | *string*                                                                                                                                   | :heavy_minus_sign:                                                                                                                         | N/A                                                                                                                                        |
| `sha`                                                                                                                                      | *string*                                                                                                                                   | :heavy_minus_sign:                                                                                                                         | N/A                                                                                                                                        |
| `prId`                                                                                                                                     | *number*                                                                                                                                   | :heavy_minus_sign:                                                                                                                         | N/A                                                                                                                                        |
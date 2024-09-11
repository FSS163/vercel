/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { checksCreate } from "../funcs/checksCreate.js";
import { checksGet } from "../funcs/checksGet.js";
import { checksList } from "../funcs/checksList.js";
import { checksRerequest } from "../funcs/checksRerequest.js";
import { checksUpdate } from "../funcs/checksUpdate.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import {
  CreateCheckRequest,
  CreateCheckResponseBody,
} from "../models/operations/createcheck.js";
import {
  GetAllChecksRequest,
  GetAllChecksResponseBody,
} from "../models/operations/getallchecks.js";
import {
  GetCheckRequest,
  GetCheckResponseBody,
} from "../models/operations/getcheck.js";
import {
  RerequestCheckRequest,
  RerequestCheckResponseBody,
} from "../models/operations/rerequestcheck.js";
import {
  UpdateCheckRequest,
  UpdateCheckResponseBody,
} from "../models/operations/updatecheck.js";
import { unwrapAsync } from "../types/fp.js";

export class Checks extends ClientSDK {
  /**
   * Creates a new Check
   *
   * @remarks
   * Creates a new check. This endpoint must be called with an OAuth2 or it will produce a 400 error.
   */
  async create(
    request: CreateCheckRequest,
    options?: RequestOptions,
  ): Promise<CreateCheckResponseBody> {
    return unwrapAsync(checksCreate(
      this,
      request,
      options,
    ));
  }

  /**
   * Retrieve a list of all checks
   *
   * @remarks
   * List all of the checks created for a deployment.
   */
  async list(
    request: GetAllChecksRequest,
    options?: RequestOptions,
  ): Promise<GetAllChecksResponseBody> {
    return unwrapAsync(checksList(
      this,
      request,
      options,
    ));
  }

  /**
   * Get a single check
   *
   * @remarks
   * Return a detailed response for a single check.
   */
  async get(
    request: GetCheckRequest,
    options?: RequestOptions,
  ): Promise<GetCheckResponseBody> {
    return unwrapAsync(checksGet(
      this,
      request,
      options,
    ));
  }

  /**
   * Update a check
   *
   * @remarks
   * Update an existing check. This endpoint must be called with an OAuth2 or it will produce a 400 error.
   */
  async update(
    request: UpdateCheckRequest,
    options?: RequestOptions,
  ): Promise<UpdateCheckResponseBody> {
    return unwrapAsync(checksUpdate(
      this,
      request,
      options,
    ));
  }

  /**
   * Rerequest a check
   *
   * @remarks
   * Rerequest a selected check that has failed.
   */
  async rerequest(
    request: RerequestCheckRequest,
    options?: RequestOptions,
  ): Promise<RerequestCheckResponseBody> {
    return unwrapAsync(checksRerequest(
      this,
      request,
      options,
    ));
  }
}
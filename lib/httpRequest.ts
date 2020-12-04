/*
 * Copyright 2020 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ServerRequest } from "../deps.ts";

/* An interface which provides information about the current request. */
export class HttpRequest {
  /**
   * Construct a new, empty instance of the {@code HttpRequest} object.
   * @param {ServerRequest} req
   */
  constructor(private readonly req: ServerRequest) {}

  /**
   * Return request headers.
   *
   * @returns {Headers}
   * @api public
   */
  public GetHeaders(): Headers {
    return this.req.headers;
  }

  /**
   * Retrieves the HTTP method of the request.
   *
   * @return {string}
   * @api public
   */
   public GetMethod(): string {
     return this.req.method;
   }


}

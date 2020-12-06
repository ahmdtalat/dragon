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

import { assert, DefaultServer, ServerTLS } from "../deps.ts";
import { HttpRequest } from "./httpRequest.ts";
import { HttpResponse } from "./httpResponse.ts";
import { HttpRouting, Middleware } from "./httpRouting.ts";

/**
 * Request methods to indicate the desired action to be performed.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods}
 * */
export enum RequestMethod {
  GET = 0,
  POST,
  PUT,
  DELETE,
  PATCH,
  ALL,
  OPTIONS,
  HEAD,
}

// Handler sets a handler for the route.
export interface HandlerCallableFun {
  Request: HttpRequest;
  ResponseWriter: HttpResponse,
}

// RouteMatch stores information about a matched route.
export interface RouteMatch {
  methods: string;
  path: string;
  handler: HandlerCallableFun;
  params?: Map<String, String> | null | undefined;
}

export interface RoutingOptions {
  /** A custom length for parameters * This defaults to `100 characters`. */
  maxParamLength?: number;
  /** Allow unsage regex. This defaults to `false` */
  allowUnsafeRegex?: boolean;
  /** Ignore trailing slashes in routes. This option applies to all route registrations for the resulting server instance
   * This defaults to `false`. */
  ignoreTrailingSlash?: boolean;
  /** Allow case sensitive. This default to `true` */
  caseSensitive?: boolean;
  /** Configurable Handler to be used when no route matches. */
  notFoundHandler?: Middleware;
}

export interface ApplicationOptions extends RoutingOptions {
  /** An initial set of key for signing cookies and sessions produced by the application. */
  key?: { cookie: string; session: string };
  /** If set to `true`, proxy headers will be trusted when processing requests.
   * This defaults to `false`. */
  proxy?: boolean;
  /** Return array of subdomains in the domain name of the request.
   * This defaults to `2`. */
  subdomainOffset?: string[] | 2;
  /** Return header for identifying the originating IP address of a client connecting to a web server
   * through an HTTP proxy or a load balancer */
  proxyIpHeader?: string | "X-Forwarded-For";
}

export interface ListenSimpleOptions {
  /** A unique name for a computer or network node in a network
   * This defaults to `0.0.0.0` */
  hostname?: string;
  /** Numbers used by protocols for operation of network applications.
   * This defaults to `4200` */
  port: number;
}

export interface ListenTlsOptions extends ListenSimpleOptions {
  certFile: string;
  keyFile: string;
  /** The listening will be over HTTPS */
  secure: true;
}

export type ListenOptions = ListenSimpleOptions | ListenTlsOptions;

/* Initialize and Expose `NewApplication` class */
export class NewApplication {
  /**
   * Register list of routes.
   *
   * @var {routes}
   * @internal
   */
  private readonly routes: HttpRouting[] = [];

  /**
  * Construct a new, empty instance of the {@code NewApplication} object.
  * @param {ApplicationOptions} options
  */
  constructor(private readonly options: ApplicationOptions = {}) {}

  /**
   * Check if TLS is enabled.
   *
   * @param {ListenOptions} options
   * @returns {boolean}
   * @api public
   */
  public IsSecure(options: ListenOptions): options is ListenTlsOptions {
    return "secure" in options;
  }

  /**
   * Return showing settings.
   *
   * @returns {object}
   * @api public
   */
  public Settings(): ApplicationOptions {
    return this.options;
  }

  /**
   * Converts the input into a string that has the same format console.log().
   *
   * @returns {string}
   * @api public
   */
  public Inspect(value: unknown): string {
    return Deno.inspect(value);
  }

}

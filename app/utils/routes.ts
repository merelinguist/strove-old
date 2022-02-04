/* eslint-disable no-restricted-syntax, no-param-reassign, @typescript-eslint/no-invalid-void-type, no-underscore-dangle */
import type { List, String, Union } from "ts-toolbelt";

const sanitizeRoutePath = (routePath: string) => {
  if (!routePath.startsWith("/")) {
    routePath = "/".concat(routePath);
  }

  if (routePath.length > 1 && routePath.endsWith("/")) {
    routePath = routePath.slice(0, -1);
  }

  routePath = routePath.replace(/\/+/g, "/");
  return routePath;
};

const replaceRouteParams = (routePath: string, params?: RouteParams) => {
  if (params) {
    const requiredParams =
      routePath.match(/\[{1,2}(\.{3})?[^\\[\]\\.]+\]{1,2}/g)?.map((value) => ({
        key: value.replace(/(\[|\]|\.)/g, ""),
        value,
      })) ?? [];

    for (const { key, value } of requiredParams) {
      const paramValue = params[key];

      routePath = routePath.replace(
        value,
        paramValue instanceof Array ? paramValue.join("/") : paramValue,
      );
    }
  }

  return sanitizeRoutePath(routePath);
};

export const createRoute = <
  TRoutePath extends string,
  TSubRoutes extends SubRoutes | void = void,
>(
  routePath: TRoutePath,
  subRoutes?: TSubRoutes,
) => {
  const routeBuilder = (params?: RouteParams) =>
    replaceRouteParams(routePath, params);

  routeBuilder.__path__ = routePath;

  if (subRoutes) {
    routeBuilder.__subRoutes__ = subRoutes;

    for (const [subRouteName, subRouteBuilder] of Object.entries(
      subRoutes as SubRoutes,
    )) {
      Object.assign(routeBuilder, {
        [subRouteName]: createRoute(
          `${routeBuilder.__path__}/${(subRouteBuilder as any).__path__}`,
          (subRouteBuilder as any).__subRoutes__,
        ),
      });
    }
  }

  return routeBuilder as any as RouteFactory<TRoutePath, TSubRoutes>;
};

type RouteFactory<
  TRoutePath extends string,
  TSubRoutes extends SubRoutes | void = void,
> = RouteBuilder<TRoutePath> &
  (TSubRoutes extends SubRoutes
    ? ExpandSubRoutes<TRoutePath, TSubRoutes>
    : { [key: never]: never });

type RouteBuilder<TRoutePath extends string> = (
  ...args: RouteBuilderArgs<TRoutePath>
) => string;

type RouteBuilderArgs<
  TRoutePath extends string,
  TRouteParams extends RouteParams = InferRouteParamsFromPath<TRoutePath>,
> = { [key: never]: never } extends TRouteParams ? [] : [params: TRouteParams];

type RouteParams = { [key: string | never]: RouteParamType | never };
type RouteParamType = string | OneOrMoreStrings | ZeroOrMoreStrings;
type OneOrMoreStrings = { 0: string } & string[];
type ZeroOrMoreStrings = string[];

type InferRouteParamsFromPath<
  TRoutePath extends string,
  TRoutePart extends string = List.UnionOf<String.Split<TRoutePath, "/">>,
  TRouteParam extends {
    [key: string]: RouteParamType;
  } = InferRouteParamFromPart<TRoutePart>,
> = Union.Merge<TRouteParam>;

type InferRouteParamFromPart<TRoutePart extends string> =
  TRoutePart extends `[[...${infer TRouteParamName}]]`
    ? { [key in TRouteParamName]: ZeroOrMoreStrings }
    : TRoutePart extends `[...${infer TRouteParamName}]`
    ? { [key in TRouteParamName]: OneOrMoreStrings }
    : TRoutePart extends `[${infer TRouteParamName}]`
    ? { [key in TRouteParamName]: string }
    : never;

type SanitizeRoutePath<
  TRoutePath extends string,
  TRoutePart extends string = List.UnionOf<String.Split<TRoutePath, "/">>,
> = `/${String.Join<List.Filter<Union.ListOf<TRoutePart>, "">, "/">}`;

type SubRoutes = { [name: string]: RouteFactory<any, any> };

type ExpandSubRoutes<
  TParentPath extends string,
  TSubRoutes extends SubRoutes,
> = {
  [TSubRoute in keyof TSubRoutes]: TSubRoutes[TSubRoute] extends RouteFactory<
    infer TSubRoutePath,
    infer TSubRouteSubRoutes
  >
    ? RouteFactory<
        SanitizeRoutePath<`${TParentPath}/${TSubRoutePath}`>,
        TSubRouteSubRoutes
      >
    : never;
};

export type InferRouteParams<TRouteFactory extends RouteFactory<any>> =
  TRouteFactory extends RouteFactory<infer TRoutePath>
    ? InferRouteParamsFromPath<TRoutePath>
    : never;

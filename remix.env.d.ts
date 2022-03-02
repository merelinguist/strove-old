/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

declare module "string-similarity" {
  export function compareTwoStrings(stringA: string, stringB: string): number;
}

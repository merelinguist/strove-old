declare module "routes-gen" {
  export type RouteParams = {
    "/:id": { id: string };
    "/:id/learn": { id: string };
    "/logout": {};
    "/": {};
    "/login": {};
    "/join": {};
    "/new": {};
  };

  export function route<
    T extends
      | ["/:id", RouteParams["/:id"]]
      | ["/:id/learn", RouteParams["/:id/learn"]]
      | ["/logout"]
      | ["/"]
      | ["/login"]
      | ["/join"]
      | ["/new"]
  >(...args: T): typeof args[0];
}

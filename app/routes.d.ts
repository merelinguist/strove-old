declare module "routes-gen" {
  export type RouteParams = {
    "/actions/logout": {};
    "/": {};
    "/login": {};
    "/join": {};
    "/app": {};
    "/app/decks/:id": { id: string };
    "/app/decks/:id/quiz": { id: string };
  };

  export function route<
    T extends
      | ["/actions/logout"]
      | ["/"]
      | ["/login"]
      | ["/join"]
      | ["/app"]
      | ["/app/decks/:id", RouteParams["/app/decks/:id"]]
      | ["/app/decks/:id/quiz", RouteParams["/app/decks/:id/quiz"]]
  >(...args: T): typeof args[0];
}

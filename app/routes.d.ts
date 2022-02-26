declare module "routes-gen" {
  export type RouteParams = {
    "/actions/logout": { [key: string]: never };
    "/": { [key: string]: never };
    "/login": { [key: string]: never };
    "/home": { [key: string]: never };
    "/join": { [key: string]: never };
    "/app": { [key: string]: never };
    "/app/decks/:id": { id: string };
    "/app/decks/:id/quiz": { id: string };
    "/app/decks/new": { [key: string]: never };
  };

  export function route<
    T extends
      | ["/actions/logout"]
      | ["/"]
      | ["/login"]
      | ["/home"]
      | ["/join"]
      | ["/app"]
      | ["/app/decks/:id", RouteParams["/app/decks/:id"]]
      | ["/app/decks/:id/quiz", RouteParams["/app/decks/:id/quiz"]]
      | ["/app/decks/new"],
  >(...args: T): typeof args[0];
}

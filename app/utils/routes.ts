export const routes = {
  decks: {
    show: (id: string) => `/decks/${id}`,
    learn: (id: string) => `/decks/${id}/learn`,
    index: "/decks",
    new: "/decks/new",
  },
  index: "/",
  login: "/login",
  logout: "/logout",
  me: "/me",
  register: "/register",
};

import { LoaderFunction, redirect } from "remix";
import { route } from "routes-gen";

import { getUser } from "~/models/user.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (user) {
    throw redirect(route("/app"));
  }

  return {};
};

// eslint-disable-next-line no-restricted-exports
export { default, links } from "~/routes/home";

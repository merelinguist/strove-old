import { ActionFunction, Form, json, Link, LoaderFunction } from "remix";

import { useLoaderData } from "~/utils/hooks/useLoaderData";
import { db, User, Workspace } from "~/utils/server/db.server";
import { getUser } from "~/utils/server/session.server";
import { stripe } from "~/utils/server/stripe.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const workspaceId = formData.get("workspacedId");

  if (typeof workspaceId !== "string") {
    return null;
  }

  const workspace = await db.workspace.findUnique({
    where: {
      id: workspaceId,
    },
  });

  if (!workspace) {
    return null;
  }

  const prices = await stripe.prices.list({
    lookup_keys: ["prod_JBLw4pjboeIadf"],

    expand: ["data.product"],
  });

  console.log(prices);

  // const { url } = await stripe.checkout.sessions.create({
};

type LoaderData = {
  user: User | null;
  workspaces: Workspace[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  const workspaces = await db.workspace.findMany();
  const users = await db.user.findMany();

  return json<LoaderData>({ user, workspaces });
};

const IndexRoute = () => {
  const data = useLoaderData<LoaderData>();

  console.log();

  setTimeout(() => {
    alert("2 mins");
  }, 1000 * 60 * 2);

  return (
    <div className="p-8 mx-auto prose">
      <h1>My SaaS Name</h1>
      <h2>This could be your tagline</h2>

      <select>
        {data.workspaces.map((workspace) => (
          <option value={workspace.id}>{workspace.name}</option>
        ))}
      </select>

      <ul>
        {data.workspaces.map((workspace) => (
          <li>
            <pre>{JSON.stringify(workspace, null, 2)}</pre>
            <Form method="post">
              <input name="workspaceId" type="hidden" value={workspace.id} />
              <input type="submit" value="Checkout" />
            </Form>
          </li>
        ))}
      </ul>

      <ul>
        {!data.user ? (
          <>
            <li>
              <Link to="/get-started">Get started</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/app">Go to dashboard</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default IndexRoute;

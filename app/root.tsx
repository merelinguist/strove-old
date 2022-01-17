import {
  HeadersFunction,
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  Outlet,
  useLoaderData,
} from "remix";

import { App } from "~/components/App";
import { Sidebar } from "~/components/Sidebar";
import styles from "~/styles.css";
import { auth } from "~/utils/server/auth.server";
import type { User } from "~/utils/server/db.server";

import { seo } from "./utils/seo";

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "public, s-maxage=60",
  };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => {
  return {
    ...seo({}),
  };
};

type LoaderData = {
  user: User | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await auth.isAuthenticated(request);

  return json<LoaderData>({ user });
};

export default function Root() {
  const data = useLoaderData<LoaderData>();

  return (
    <App>
      <Sidebar user={data.user} />
      <div className="flex flex-col flex-1 md:pl-64">
        <main className="flex-1">
          <div className="py-8 px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </App>
  );
}

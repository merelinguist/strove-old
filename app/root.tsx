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
import { seo } from "~/utils/seo";
import { auth } from "~/utils/server/auth.server";
import type { User } from "~/utils/server/db.server";

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "public, s-maxage=60",
  };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap",
      rel: "stylesheet",
    },
  ];
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
      {/* <Sidebar user={data.user} />
      <div className="flex flex-col flex-1 md:pl-64">
        <main className="flex-1">
          <div className="py-8 px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
            <Outlet />
          </div>
        </main>
      </div> */}
      <Outlet />
    </App>
  );
}

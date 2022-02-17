import Inspect from "inspx";
import type { LinksFunction, MetaFunction } from "remix";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";

import { Navbar } from "~/components/Navbar";
import styles from "~/styles.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
  ];
};

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  return (
    <html className="text-gray-900 antialiased" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>

      <body>
        <Inspect disabled={process.env.NODE_ENV === "production"}>
          <div className="space-y-10">
            <Navbar />
            <Outlet />
          </div>
        </Inspect>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// export { ErrorBoundary } from "remix-crash";

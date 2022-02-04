import Inspect from "inspx";
import type { ReactNode } from "react";
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from "remix";

import { LoginModalProvider } from "~/components/LoginModal";
import { useNProgress } from "~/utils/hooks/useNProgress";
import { useSplitbee } from "~/utils/hooks/useSplitbee";

export const App = ({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) => {
  useNProgress();
  useSplitbee();

  return (
    <html className="h-full antialiased text-gray-900" lang="en">
      <head>
        {title && <title>{title}</title>}
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Inspect>
          <LoginModalProvider>{children}</LoginModalProvider>
        </Inspect>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
};

import type { ReactNode } from "react";
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from "remix";

export function App({
	children,
	title,
}: {
	children: ReactNode;
	title?: string;
}) {
	return (
		<html className="h-full antialiased text-gray-900" lang="en">
			<head>
				{title && <title>Your Page Title</title>}
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<Meta />
				<Links />
			</head>
			<body className="h-full">
				{children}
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
	);
}

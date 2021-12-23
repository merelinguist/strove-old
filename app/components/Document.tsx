import { ReactNode } from "react";
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from "remix";

export function Document({
	children,
	title,
}: {
	children: ReactNode;
	title?: string;
}) {
	return (
		<html lang="en">
			<head>
				{title && <title>Your Page Title</title>}

				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />

				<Meta />
				<Links />
			</head>
			<body className="antialiased text-gray-900">
				{children}
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
	);
}

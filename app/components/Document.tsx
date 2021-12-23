import { ReactNode } from "react";
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from "remix";
import colors from "tailwindcss/colors";

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

				<style>
					{`
						#nprogress .bar {
							background: ${colors.blue["500"]} !important;
						}

						#nprogress .spinner {
							display: none;
						}
					`}
				</style>
			</head>
			<body className="antialiased bg-gray-50 text-gray-900">
				{children}
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
	);
}

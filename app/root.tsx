import { ReactNode } from "react";
import type { LinksFunction } from "remix";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
} from "remix";

import styles from "./styles/tailwind.css";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: styles }];
};

function Document({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<title>Your Page Title</title>

				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />

				<Meta />
				<Links />
			</head>
			<body className="p-8 mx-auto antialiased text-gray-900 prose">
				{children}
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
	);
}

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	);
}

export function ErrorBoundary({ error }: { error: Error }) {
	return (
		<Document>
			<>
				<h1>There was an error</h1>
				<p>{error.message}</p>
				<hr />
				<p>
					Hey, developer, you should replace this with what you want your users
					to see.
				</p>
			</>
		</Document>
	);
}

export function CatchBoundary() {
	const caught = useCatch();

	let message;

	switch (caught.status) {
		case 401:
			message = (
				<p>
					Oops! Looks like you tried to visit a page that you do not have access
					to.
				</p>
			);

			break;
		case 404:
			message = (
				<p>Oops! Looks like you tried to visit a page that does not exist.</p>
			);

			break;
		default:
			throw new Error(caught.data || caught.statusText);
	}

	return (
		<Document>
			<h1>
				{caught.status}: {caught.statusText}
			</h1>
			{message}
		</Document>
	);
}

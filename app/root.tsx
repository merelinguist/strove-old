import { ReactNode } from "react";
import {
	Link,
	Links,
	LinksFunction,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
} from "remix";

import styles from "~/styles/tailwind.css";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: styles }];
};

function Document({ children }: { children: ReactNode }) {
	return (
		<html className="h-full" lang="en">
			<head>
				<title>Your Page Title</title>

				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />

				<Meta />
				<Links />
			</head>
			<body className="h-full antialiased text-gray-900">
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
			{/* <div className="p-8 mx-auto prose"> */}
			<Outlet />
			{/* </div> */}
		</Document>
	);
}

export function ErrorBoundary({ error }: { error: Error }) {
	return (
		<Document>
			<div className="p-8 mx-auto prose">
				<h1>
					{error.name}: {error.message}
				</h1>
				<pre>{error.stack}</pre>
			</div>
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
			<div className="md:grid md:place-items-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-full bg-white">
				<div className="mx-auto max-w-max">
					<main className="sm:flex">
						<p className="text-4xl sm:text-5xl font-extrabold text-blue-600">
							{caught.status}
						</p>
						<div className="sm:ml-6">
							<div className="sm:pl-6 sm:border-l sm:border-gray-200">
								<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
									{caught.statusText}
								</h1>
								<p className="mt-1 text-base text-gray-500">{message}</p>
							</div>
							<div className="flex sm:pl-6 mt-10 space-x-3 sm:border-l sm:border-transparent">
								<Link
									className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md border border-transparent focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm focus:outline-none"
									to="/"
								>
									Go back home
								</Link>
							</div>
						</div>
					</main>
				</div>
			</div>
		</Document>
	);
}

import {
	json,
	LinksFunction,
	LoaderFunction,
	Outlet,
	useLoaderData,
} from "remix";

import { App } from "~/components/App";
import { Sidebar } from "~/components/Sidebar";
import styles from "~/styles.css";
import { auth } from "~/utils/server/auth.server";
import type { User } from "~/utils/server/db.server";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: styles }];
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
			<div className="md:pl-64 flex flex-col flex-1">
				<main className="flex-1">
					<div className="max-w-7xl py-8 mx-auto px-4 sm:px-6 md:px-8">
						<Outlet />
					</div>
				</main>
			</div>
		</App>
	);
}

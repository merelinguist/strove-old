import { LoaderFunction, useLoaderData } from "remix";

import { db } from "~/utils/db.server";

export const loader: LoaderFunction = () => db.user.findMany();

export default function AdminRoute() {
	const data = useLoaderData();

	return (
		<>
			<h1>Admin</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</>
	);
}

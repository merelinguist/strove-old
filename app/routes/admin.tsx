import { LoaderFunction, useLoaderData } from "remix";

import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = () => prisma.user.findMany();

export default function AdminRoute() {
	const data = useLoaderData();

	return (
		<>
			<h1>Admin</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</>
	);
}

import { LoaderFunction, redirect } from "remix";

import { prisma } from "~/utils/prisma.server";
import { routes } from "~/utils/routes";

// eslint-disable-next-line import/prefer-default-export
export const loader: LoaderFunction = async () => {
	const entries = await prisma.entry.findMany({});

	const entry = entries[0];

	if (!entry) {
		throw new Error("No entries found");
	}

	return redirect(routes.journal.show(entry.id));
};

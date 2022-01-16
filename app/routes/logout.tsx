import type { ActionFunction, LoaderFunction } from "remix";
import { redirect } from "remix";

import { auth } from "~/utils/server/auth.server";

export const action: ActionFunction = async ({ request }) => {
	await auth.logout(request, { redirectTo: "/" });
};

export const loader: LoaderFunction = async () => {
	return redirect("/");
};

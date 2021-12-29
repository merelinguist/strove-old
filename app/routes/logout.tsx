import type { ActionFunction, LoaderFunction } from "remix";
import { redirect } from "remix";

import { destroySession, getSession } from "~/utils/session.server";

export const action: ActionFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));

	return redirect(request.headers.get("Referer") ?? "/", {
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
};

export const loader: LoaderFunction = async () => {
	return redirect("/");
};

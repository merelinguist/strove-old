import { createCookieSessionStorage, redirect } from "remix";

import { routes } from "~/utils/routes";

const sessionStorage = createCookieSessionStorage({
	cookie: {
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		secrets: ["secret"],
		name: "_session",
	},
});

export const { getSession, commitSession, destroySession } = sessionStorage;

export const getUserSession = (request: Request) =>
	getSession(request.headers.get("Cookie"));

export const getUserId = async (request: Request) => {
	const session = await getUserSession(request);

	const userId = session.get("userId");

	if (typeof userId !== "string") {
		return null;
	}

	return userId;
};

export const requireUserId = async (request: Request) => {
	const session = await getUserSession(request);

	const userId = session.get("userId");

	if (typeof userId !== "string") {
		throw redirect(routes.login);
	}

	return userId;
};

// export async function getUser(request: Request) {
// 	const userId = await getUserId(request);
// 	if (typeof userId !== "string") {
// 		return null;
// 	}

// 	try {
// 		const user = await db.user.findUnique({ where: { id: userId } });
// 		return user;
// 	} catch {
// 		throw logout(request);
// 	}
// }

export const createUserSession = async (userId: string, redirectTo: string) => {
	const session = await getSession();

	session.set("userId", userId);

	return redirect(redirectTo, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};

import { createCookieSessionStorage, redirect } from "remix";

import { routes } from "~/utils/routes";

import { db } from "./db.server";

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

export const logout = async (request: Request) => {
	const session = await sessionStorage.getSession(
		request.headers.get("Cookie"),
	);

	return redirect("/login", {
		headers: {
			"Set-Cookie": await sessionStorage.destroySession(session),
		},
	});
};

export const getUser = async (request: Request) => {
	const userId = await getUserId(request);

	if (typeof userId !== "string") {
		return null;
	}

	try {
		return await db.user.findUnique({ where: { id: userId } });
	} catch {
		throw logout(request);
	}
};

export const createUserSession = async (request: Request, userId: string) => {
	const session = await getSession();

	session.set("userId", userId);

	return redirect(request.headers.get("Referer") ?? "/", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};

import { createCookieSessionStorage } from "remix";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import invariant from "tiny-invariant";

import { db, User } from "~/utils/db.server";

if (typeof process.env.SESSION_SECRET !== "string") {
	throw new Error("Missing `process.env.SESSION_SECRET`");
}

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		secrets: [process.env.SESSION_SECRET],
	},
});

export const auth = new Authenticator<User>(sessionStorage);

auth.use(
	new FormStrategy(async ({ form }) => {
		const email = form.get("email");
		const password = form.get("password");

		invariant(typeof email === "string", "Email must be a string");
		invariant(typeof password === "string", "Password must be a string");

		const user = await db.user.findUnique({ where: { email } });

		invariant(user, "User not found");

		return user;
	}),
	"form",
);

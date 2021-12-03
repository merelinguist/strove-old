import { createCookieSessionStorage } from "remix";

const sessionSecret: string | undefined = "process.env.SESSION_SECRET";

if (!sessionSecret) {
	throw new Error("SESSION_SECRET must be set");
}

export const storage = createCookieSessionStorage({
	cookie: {
		name: "session",
		secure: process.env.NODE_ENV === "production",
		secrets: [sessionSecret],
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 30,
		httpOnly: true,
	},
});

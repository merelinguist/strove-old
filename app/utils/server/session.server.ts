import { createCookieSessionStorage, redirect } from "remix";

import { env } from "~/utils/server/env.server";

import { db } from "./db.server";

export const storage = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    secrets: [env.SESSION_SECRET],
  },
});

export const createUserSession = async (userId: string, redirectTo: string) => {
  const session = await storage.getSession();

  session.set("userId", userId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};

export const getUser = async (request: Request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (typeof userId !== "string") {
    return null;
  }

  const user = await db.user.findUnique({ where: { id: userId } });

  return user;
};

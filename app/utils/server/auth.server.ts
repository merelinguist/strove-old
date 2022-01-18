import bcrypt from "bcryptjs";
import { createCookieSessionStorage } from "remix";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

import { db, User } from "~/utils/server/db.server";
import { env } from "~/utils/server/env.server";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    secrets: [env.SESSION_SECRET],
  },
});

export const auth = new Authenticator<User>(sessionStorage);

auth.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    if (typeof email !== "string") {
      throw new AuthorizationError("Email is required");
    }

    if (typeof password !== "string") {
      throw new AuthorizationError("Password is required");
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AuthorizationError("Wrong email");
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.hashedPassword,
    );

    if (!isCorrectPassword) {
      throw new AuthorizationError("Wrong password");
    }

    return { id: user.id, name: user.id, email: user.email, role: user.role };
  }),
  "form",
);

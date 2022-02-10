import { createCookieSessionStorage, redirect } from "remix";
import invariant from "tiny-invariant";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

const USER_SESSION_KEY = "userId";

async function destroySession(request: Request, redirectTo: string) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

async function getSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  const unsafeUserId = session.get(USER_SESSION_KEY);
  const userId = typeof unsafeUserId === "string" ? unsafeUserId : null;

  return { userId };
}

async function setSession(
  request: Request,
  redirectTo: string,
  { userId }: { userId?: string },
) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  if (userId) {
    session.set(USER_SESSION_KEY, userId);
  }

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export { destroySession, getSession, setSession };

import { createCookieSessionStorage, redirect, Session } from "remix";
import type { route } from "routes-gen";
import invariant from "tiny-invariant";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
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
const FLASH_SESSION_KEY = "flash";

export async function destroySession(request: Request, redirectTo: string) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export type Flash = {
  type: "error";
  message: string;
};

export async function flash(
  request: Request,
  redirectTo: string,
  { type, message }: Flash,
) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  session.flash(FLASH_SESSION_KEY, { type, message });

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function getSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  const unsafeUserId = session.get(USER_SESSION_KEY);
  const userId = typeof unsafeUserId === "string" ? unsafeUserId : null;

  const unsafeFlash = session.get(FLASH_SESSION_KEY);

  function isFlash(flash: any): flash is Flash {
    return (
      typeof flash === "object" &&
      "type" in flash &&
      "message" in flash &&
      flash["type"] === "error"
    );
  }

  const flash = isFlash(unsafeFlash) ? unsafeFlash : null;

  return { session, userId, flash };
}

export async function setSession(
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

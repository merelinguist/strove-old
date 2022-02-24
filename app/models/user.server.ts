import bcrypt from "@node-rs/bcrypt";
import { redirect } from "remix";

import { prisma } from "~/db.server";
import { getSession, setSession } from "~/session.server";

export async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password);

  try {
    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw new Response("Email already exists", { status: 400 });
  }
}

export async function getUser(request: Request) {
  const { userId } = await getSession(request);

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  return user;
}

export async function login(request: Request, userId: string) {
  return setSession(request, "/", { userId });
}

export async function requireUser(request: Request, redirectTo: string) {
  const { userId } = await getSession(request);

  if (!userId) {
    throw redirect(redirectTo);
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw redirect(redirectTo);
  }

  return user;
}

export async function verifyLogin(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.verify(password, user.password);

  if (!isValid) {
    return null;
  }

  return user;
}

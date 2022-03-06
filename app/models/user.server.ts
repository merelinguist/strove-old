import bcrypt from "@node-rs/bcrypt";

import { prisma } from "~/db.server";

export async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
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

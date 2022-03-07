import bcrypt from "@node-rs/bcrypt";

import { prisma } from "~/db.server";

export async function createUser(email: string, password: string) {
  const hash = await bcrypt.hash(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash,
        },
      },
    },
  });

  return user;
}

export async function verifyLogin(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!user || !user.password) {
    return null;
  }

  const isValid = await bcrypt.verify(password, user.password.hash);

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { password: _password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

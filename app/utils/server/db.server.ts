import { PrismaClient, User as PrismaUser } from "@prisma/client";

export const db = new PrismaClient();

const bold = (string: string) => `\x1B[1m${string}\x1B[0m`;

db.$use(async (params, next) => {
  const before = Date.now();

  const result = await next(params);

  const after = Date.now();

  const name = `${params.model}.${params.action}`;

  // eslint-disable-next-line no-console
  console.log(`Query ${bold(name)} took ${after - before}ms`);

  return result;
});

export * from "@prisma/client";

export type User = Pick<PrismaUser, "id" | "name" | "email" | "role">;

export type UnsafeUser = PrismaUser;

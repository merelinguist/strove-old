import { PrismaClient } from "@prisma/client";

type GlobalThisWithPrismaClient = typeof globalThis & {
  ["prisma"]: PrismaClient;
};

const getPrismaClient = () => {
  if (process.env.NODE_ENV === `production`) {
    return new PrismaClient();
  }

  const newGlobalThis = globalThis as GlobalThisWithPrismaClient;

  if (!newGlobalThis.prisma) {
    newGlobalThis.prisma = new PrismaClient();
  }

  return newGlobalThis.prisma;
};

export const prisma = getPrismaClient();

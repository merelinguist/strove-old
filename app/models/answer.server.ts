import { prisma } from "~/db.server";

export async function createAnswer(correctness: number, cardId: string) {
  return prisma.answer.create({
    data: { correctness, cardId },
  });
}

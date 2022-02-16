import { prisma } from "~/db.server";

export function getCard(id: string) {
  return prisma.card.findUnique({
    where: { id },
  });
}

import { prisma } from "~/db.server";

function createDeck(name: string, userId: string) {
  return prisma.deck.create({
    data: {
      name,
      userId,
    },
  });
}

function deleteDeck(id: string) {
  return prisma.deck.delete({
    where: { id },
  });
}

export { createDeck, deleteDeck };

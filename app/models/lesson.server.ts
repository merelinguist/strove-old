import { serverError } from "remix-utils";

import { prisma } from "~/db.server";

export async function getLesson(deckId: string) {
  const deck = await prisma.deck.findUnique({
    include: {
      user: true,
      lesson: { include: { cards: true } },
      cards: { include: { answers: true } },
    },
    where: { id: deckId },
  });

  if (!deck) {
    throw serverError("deck not found");
  }

  if (!deck.lesson) {
    return prisma.lesson.create({
      include: { cards: true },
      data: {
        deckId: deck.id,
        cards: {
          connect: deck.cards.map((card) => ({ id: card.id })).slice(0, 10),
        },
      },
    });
  }

  return deck.lesson;
}

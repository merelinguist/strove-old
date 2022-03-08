import type { Card, Deck as PrismaDeck } from "@prisma/client";

import { prisma } from "~/db.server";

type StubDeck = PrismaDeck & {
  cards: Card[];
};

export type Deck = PrismaDeck & {
  cards: Card[];
} & { quiz: Card[] };

function getQuiz(deck: StubDeck) {
  const cards = deck.cards.filter(
    (card) =>
      card.dueDate < new Date() ||
      card.dueDate.toDateString() === new Date().toDateString(),
  );

  return cards;
}

function buildDeck(deck: StubDeck): Deck {
  return {
    ...deck,
    quiz: getQuiz(deck),
  };
}

export async function getDeck(id: string): Promise<Deck | null> {
  const deck = await prisma.deck.findUnique({
    include: {
      cards: true,
    },
    where: { id },
  });

  if (!deck) {
    return null;
  }

  return buildDeck(deck);
}

export async function getDecks(userId: string): Promise<Deck[]> {
  const decks = await prisma.deck.findMany({
    include: {
      cards: true,
    },
    where: { userId },
  });

  return decks.map(buildDeck);
}

export function deleteDeck(id: string) {
  return prisma.deck.delete({
    where: { id },
  });
}

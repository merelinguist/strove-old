import type { Card, Deck as PrismaDeck } from "@prisma/client";

import { prisma } from "~/db.server";

type StubDeck = PrismaDeck & {
  cards: Card[];
};

export type Deck = PrismaDeck & {
  cards: Card[];
} & { quiz: Question[] };

export type Question =
  | { type: "simple"; card: Card }
  | { type: "multi"; card: Card; cards: Card[] };

function getQuiz(deck: StubDeck) {
  const cards = deck.cards.filter(
    (card) =>
      card.dueDate < new Date() ||
      card.dueDate.toDateString() === new Date().toDateString(),
  );

  const questions: Question[] = cards.map((card) => {
    if (card.repetition === 0) {
      return {
        type: "multi",
        card,
        cards: [
          card,
          ...deck.cards.filter((_, index) => index > 0).slice(0, 3),
        ].sort((cardA, cardB) => {
          function shuffle(id: string) {
            return id.split(/[a-z]/g).reverse().join();
          }

          return shuffle(cardA.id).localeCompare(shuffle(cardB.id));
        }),
      };
    }

    return { type: "simple", card };
  });

  return questions;
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

import type { Answer, Card, Deck as PrismaDeck } from "@prisma/client";

import { prisma } from "~/db.server";

type StubDeck = PrismaDeck & {
  cards: (Card & {
    answers: Answer[];
  })[];
};

export type Deck = PrismaDeck & {
  cards: (Card & {
    answers: Answer[];
  } & { score: number })[];
} & { quiz: (Card & { answers: Answer[] })[]; quizProgress: number };

const now = new Date();

function score(answers: Answer[]) {
  if (answers.length === 0) {
    return -1;
  }

  const weight = 1000 * 60 * 60 * 24; // 24 hours

  const weightedSum = answers
    .map(
      (answer) =>
        answer.correctness *
        Math.exp(
          (new Date(answer.createdAt).getTime() - now.getTime()) / weight,
        ),
    )
    .reduce((sum, x) => sum + x);

  return weightedSum / answers.length;
}

function getQuizLength(deck: StubDeck) {
  const yesterdaysDeck = {
    ...deck,
    cards: deck.cards.map((card) => ({
      ...card,
      answers: card.answers.filter(
        (answer) =>
          new Date(answer.createdAt).toDateString() !== now.toDateString(),
      ),
    })),
  };

  const quiz = yesterdaysDeck.cards
    .sort((cardA, cardB) => score(cardA.answers) - score(cardB.answers))
    .slice(0, 20);

  return quiz.length;
}

function getQuiz(deck: StubDeck) {
  const yesterdaysDeck = {
    ...deck,
    cards: deck.cards.map((card) => ({
      ...card,
      answers: card.answers.filter(
        (answer) =>
          new Date(answer.createdAt).toDateString() !== now.toDateString(),
      ),
    })),
  };

  const quiz = yesterdaysDeck.cards
    .sort((cardA, cardB) => score(cardA.answers) - score(cardB.answers))
    .slice(0, 20);

  const cardIdsToday = deck.cards
    .filter(
      (card) =>
        card.answers.filter(
          (answer) =>
            new Date(answer.createdAt).toDateString() === now.toDateString(),
        ).length > 0,
    )
    .map((card) => card.id);

  return quiz.filter((card) => !cardIdsToday.includes(card.id));
}

// TODO: swr redis cache
function buildDeck(deck: StubDeck): Deck {
  return {
    ...deck,
    cards: deck.cards.map((card) => ({
      ...card,
      score:
        Math.round(score(card.answers) * 100) === -100
          ? 0
          : Math.round(score(card.answers) * 100),
    })),
    quiz: getQuiz(deck),
    quizProgress:
      ((getQuizLength(deck) - getQuiz(deck).length) / getQuizLength(deck)) *
      100,
  };
}

export async function getDeck(id: string): Promise<Deck | null> {
  const deck = await prisma.deck.findUnique({
    where: { id },
    include: {
      cards: {
        include: { answers: true },
      },
    },
  });

  if (!deck) {
    return null;
  }

  return buildDeck(deck);
}

export async function getDecks(userId: string): Promise<Deck[]> {
  const decks = await prisma.deck.findMany({
    where: { userId },
    include: {
      cards: {
        include: { answers: true },
      },
    },
  });

  return decks.map(buildDeck);
}

import type { Answer, Card, Deck } from "@prisma/client";

import { prisma } from "~/db.server";

export type DeckWithAnswers = Deck & {
  cards: (Card & {
    answers: Answer[];
  })[];
};

export type Quiz = (Card & { answers: Answer[] })[];

export async function createDeck(name: string, userId: string) {
  const create: { front: string; back: string }[] = [];

  for (let index = 0; index < 40; index += 1) {
    const first = Math.floor(Math.random() * 5 + 1);
    const second = Math.floor(Math.random() * 5 + 1);

    const front = `${first} + ${second}`;
    const back = `${first + second}`;

    create.push({ front, back });
  }

  return prisma.deck.create({
    data: {
      name,
      userId,
      cards: { create },
    },
  });
}

export function deleteDeck(id: string) {
  return prisma.deck.delete({
    where: { id },
  });
}

const now = new Date();

export function score(answers: Answer[]) {
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

export function getDailyQuiz(deck: DeckWithAnswers) {
  const yesterdaysDeck: DeckWithAnswers = {
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

export function getDeck(id: string) {
  return prisma.deck.findUnique({
    where: { id },
  });
}

export function getDeckWithAnswers(id: string) {
  return prisma.deck.findUnique({
    where: { id },
    include: {
      cards: {
        include: { answers: true },
      },
    },
  });
}

export function getDecksWithAnswers(userId: string) {
  return prisma.deck.findMany({
    where: {
      userId,
    },
    include: {
      cards: {
        include: { answers: true },
      },
    },
  });
}

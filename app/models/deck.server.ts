import type { Answer, Card, Deck } from "@prisma/client";

import { prisma } from "~/db.server";

const now = new Date();

function getDailyQuiz(deck: Deck & { cards: (Card & { answers: Answer })[] }) {
  const answersToday = deck.cards
    .map((card) => card.answers)
    .flat()
    .filter(
      (answer) =>
        new Date(answer.createdAt).toDateString() === now.toDateString(),
    )
    .sort(
      (answerA, answerB) =>
        new Date(answerA.createdAt).getTime() -
        new Date(answerB.createdAt).getTime(),
    );

  // // 1. A user has lots of cards and has done their daily session (and possibly some extra work)
  // // 2. A user has fewer than 20 cards but has done their daily session (and possibly some extra work)
  // if (
  //   cardsToday.length >= 20 ||
  //   (deck.cards.length <= 20 && deck.cards.length === cardsToday.length)
  // ) {
  //   return null;
  // }

  // return cardsToday;

  console.log(answersToday);
}

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

export { createDeck, deleteDeck, getDailyQuiz };

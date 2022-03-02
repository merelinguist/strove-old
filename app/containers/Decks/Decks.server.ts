import { json, LoaderFunction } from "remix";
import { route } from "routes-gen";

import { prisma } from "~/db.server";
import { DeckWithAnswers, getDailyQuiz, Quiz } from "~/models/deck.server";
import { requireUser } from "~/models/user.server";

export type LoaderData = {
  decks: (DeckWithAnswers & { quiz: Quiz })[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request, route("/login"));

  const decks = await prisma.deck.findMany({
    include: { cards: { include: { answers: true } } },
    where: {
      userId: user.id,
    },
  });

  const decksWithQuizzes = decks.map((deck) => ({
    ...deck,
    quiz: getDailyQuiz(deck),
  }));

  return json<LoaderData>({ decks: decksWithQuizzes });
};

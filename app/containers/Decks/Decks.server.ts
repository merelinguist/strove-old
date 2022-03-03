import { json, LoaderFunction } from "remix";
import { route } from "routes-gen";

import { Deck, getDecks } from "~/models/deck.server";
import { requireUser } from "~/models/user.server";

export type LoaderData = {
  decks: Deck[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request, route("/login"));

  const decks = await getDecks(user.id);

  decks.sort((deckA, deckB) => {
    if ((deckA.quiz.length === 0) === (deckB.quiz.length === 0)) {
      return 0;
    }

    if (deckA.quiz.length === 0) {
      return 1;
    }

    return -1;
  });

  return json<LoaderData>({ decks });
};

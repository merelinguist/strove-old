import { json, Link, LoaderFunction, useLoaderData } from "remix";

import { Deck, getDecks } from "~/models/deck.server";
import { requireUserId } from "~/session.server";
import { classNames } from "~/utils/classNames";

type LoaderData = {
  decks: Deck[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const decks = await getDecks(userId);

  return json<LoaderData>({ decks });
};

export default function IndexPage() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="prose mx-auto p-8">
      <h1>Decks</h1>
      <ul>
        {data.decks.map((deck) => (
          <li>
            <Link to={deck.id}>{deck.name}</Link>
            <p>{deck.cards.length} cards</p>
            <p>{deck.quiz.length} left to learn</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { Card, Deck } from "@prisma/client";
import { Form, json, Link, LoaderFunction, useLoaderData } from "remix";

import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  decks: (Deck & { cards: Card[] })[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const decks = await prisma.deck.findMany({
    include: { cards: true },
    where: { userId },
  });

  return json<LoaderData>({ decks });
};

export default function IndexPage() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="prose mx-auto p-8">
      <h1>Strove</h1>

      <ul>
        <li>
          <Link to="new">Create deck</Link>
        </li>
        <li>
          <Form action="logout" method="post" reloadDocument>
            <button
              className="font-medium text-gray-900 underline"
              type="submit"
            >
              Logout
            </button>
          </Form>
        </li>
      </ul>

      <h2>Decks</h2>
      <ul>
        {data.decks.map((deck) => (
          <li key={deck.id}>
            <Link to={deck.id}>{deck.name}</Link>
            <p>{deck.cards.length} cards</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

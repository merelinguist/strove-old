import type { Card, Deck } from "@prisma/client";
import { json, Link, LoaderFunction, useLoaderData } from "remix";
import { notFound } from "remix-utils";

import { prisma } from "~/db.server";

type LoaderData = {
  deck: Deck & { cards: Card[] };
};

export const loader: LoaderFunction = async ({ params }) => {
  const deck = await prisma.deck.findUnique({
    include: { cards: true },
    where: { id: params.id },
  });

  if (!deck) {
    throw notFound("deck not found");
  }

  return json<LoaderData>({ deck });
};

export default function ShowDeck() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="prose mx-auto p-8">
      <h1>{data.deck.name}</h1>

      <ul>
        <li>
          <Link to="learn">Learn</Link>
        </li>
      </ul>

      <h2>Cards</h2>
      <table>
        <thead>
          <tr>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th />
            <th>Front</th>
            <th>Back</th>
          </tr>
        </thead>
        <tbody>
          {data.deck.cards.map((card, index) => (
            <tr key={card.id}>
              <td>{index + 1}</td>
              <td>{card.front}</td>
              <td>{card.back}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

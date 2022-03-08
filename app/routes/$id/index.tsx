import { json, Link, LoaderFunction, useLoaderData } from "remix";
import { notFound } from "remix-utils";

import { Deck, getDeck } from "~/models/deck.server";

type LoaderData = {
  deck: Deck;
};

export const loader: LoaderFunction = async ({ params }) => {
  const deck = await getDeck(params.id as string);

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
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th />
          <th>Front</th>
          <th>Back</th>
          <th>Due date</th>
        </thead>
        <tbody>
          {data.deck.cards.map((card, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{card.front}</td>
              <td>{card.back}</td>
              <td>{new Date(card.dueDate).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import { notFound } from "remix-utils";

import { Deck, deleteDeck, getDeck } from "~/models/deck.server";

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData();

  const actionType = formData.get("_action");

  switch (actionType) {
    case "delete-deck": {
      const deckId = params.id;

      if (typeof deckId !== "string") {
        throw new Response("deckId must be a string", { status: 400 });
      }

      await deleteDeck(deckId);

      return redirect("/");
    }

    default: {
      throw new Response("Invalid action", { status: 400 });
    }
  }
};

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
      <h1>Hello</h1>
      <Form method="post">
        <input name="noteId" type="hidden" value={data.deck.id} />
        <button name="_action" type="submit" value="delete-deck">
          Delete
        </button>
        <ul>
          {data.deck.cards.map((card) => (
            <li key={card.id}>{card.front}</li>
          ))}
        </ul>
      </Form>
    </div>
  );
}

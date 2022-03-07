import {
  Dialog,
  Disclosure,
  Popover,
  RadioGroup,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  HeartIcon,
  MenuIcon,
  MinusSmIcon,
  PlusSmIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
/*
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState } from "react";
import {
  ActionFunction,
  Form,
  json,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import { notFound } from "remix-utils";

import { Button } from "~/components/Button";
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
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
        {data.deck.name}
      </h1>

      <div className="prose mt-12 max-w-none">
        <table>
          <thead>
            <th />
            <th>Front</th>
            <th>Back</th>
          </thead>
          <tbody>
            {data.deck.cards.map((card, index) => (
              <tr>
                <td>{index + 1}</td>
                <td contentEditable>{card.front}</td>
                <td>{card.back}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

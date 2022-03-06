import { Form, json, Link, LoaderFunction, useLoaderData } from "remix";

import { Deck, getDecks } from "~/models/deck.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  decks: Deck[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const decks = await getDecks(userId);

  return json<LoaderData>({ decks });
};

export default function Example() {
  const data = useLoaderData<LoaderData>();

  return (
    <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
      <div className="border-b border-gray-200 pt-24 pb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          My Decks
        </h1>
        <p className="mt-4 text-base text-gray-500">
          Quis proident voluptate veniam labore occaecat proident adipisicing
          occaecat esse adipisicing elit velit.
        </p>
        <Form action="/logout" className="mt-4" method="post">
          <button
            className="inline-flex items-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            type="submit"
          >
            Logout
          </button>
        </Form>
      </div>

      <div className="pt-12 pb-24">
        <section
          aria-labelledby="product-heading"
          className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
        >
          <h2 className="sr-only" id="product-heading">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
            {data.decks.map((deck) => (
              <div
                key={deck.id}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <Link prefetch="intent" to={deck.id}>
                      <span aria-hidden className="absolute inset-0" />
                      {deck.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500">
                    {deck.cards.length} cards
                  </p>
                  <p className="text-sm text-gray-500">
                    {deck.quiz.length} more to learn today
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

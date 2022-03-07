import { Form, json, Link, LoaderFunction, useLoaderData } from "remix";

import { Navbar } from "~/components/Navbar";
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

const tabs = [
  { name: "Recent", href: "#", current: true },
  { name: "All Decks", href: "#", current: false },
];

export default function IndexPage() {
  const data = useLoaderData<LoaderData>();

  return (
    <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
      <div className="pt-24 pb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          My Decks
        </h1>
        <p className="mt-4 text-base text-gray-500">
          Quis proident voluptate veniam labore occaecat proident adipisicing
          occaecat esse adipisicing elit velit.
        </p>
      </div>

      <div>
        <div className="sm:hidden">
          <label className="sr-only" htmlFor="tabs">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
            defaultValue={tabs.find((tab) => tab.current)?.name}
            id="tabs"
            name="tabs"
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  aria-current={tab.current ? "page" : undefined}
                  className={classNames(
                    tab.current
                      ? "border-sky-500 text-sky-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
                  )}
                  href={tab.href}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="pt-12 pb-24">
        <section
          aria-labelledby="product-heading"
          className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
        >
          <h2 className="sr-only" id="product-heading">
            Decks
          </h2>

          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
            {data.decks.map((deck) => (
              <div
                key={deck.id}
                className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
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

import { json, Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";

import { routes } from "~/utils/routes";
import { seo } from "~/utils/seo";
import { db, Deck } from "~/utils/server/db.server";

export const meta: MetaFunction = () => {
  return {
    ...seo({ name: "Dashboard" }),
  };
};

type LoaderData = { decks: Deck[] };

export const loader: LoaderFunction = async () => {
  const decks = await db.deck.findMany();

  return json<LoaderData>({ decks });
};

export default function Example() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <h1 className="text-2xl font-bold">My decks</h1>
      <div className="mt-2 max-w-3xl text-gray-600 prose">
        <p>
          Lorem est ullamco reprehenderit et duis dolore fugiat nostrud
          consectetur. Fugiat ea officia nostrud elit excepteur aliquip ex
          nostrud Lorem non et non adipisicing.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-x-6 gap-y-10 mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {data.decks.map((deck) => (
          <li key={deck.id} className="p-4 rounded-md border">
            <Link className="group" to={routes.decks.show(deck.id)}>
              <p className="font-semibold group-hover:text-gray-600">
                {deck.name}
              </p>
              <div className="mt-1 text-gray-600 prose prose-sm">
                <p>
                  Sunt non proident dolor labore et aliqua tempor et laboris.
                </p>
              </div>
            </Link>
          </li>
        ))}
        <li className="flex">
          <Link
            className="group flex flex-col justify-center items-center p-4 w-full text-sm font-medium leading-6 text-slate-900 hover:text-blue-500 hover:bg-white rounded-md border-2 border-slate-300 hover:border-blue-500 border-dashed hover:border-solid"
            to={routes.decks.new}
          >
            <svg
              aria-hidden="true"
              className="mb-1 text-slate-400 group-hover:text-blue-500"
              fill="currentColor"
              height="20"
              width="20"
            >
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
            New project
          </Link>
        </li>
      </ul>
    </>
  );
}

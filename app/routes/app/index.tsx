import { Link, useLoaderData } from "remix";
import { route } from "routes-gen";

import { Button } from "~/components/Button";
import { Header } from "~/components/Header";
import { Main } from "~/components/Main";
import type { LoaderData } from "~/containers/Decks/Decks.server";
import { classNames } from "~/utils/classNames";

export { loader } from "~/containers/Decks/Decks.server";

export default function IndexPage() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <Header
        title="My decks"
        description="Create your decks and learn them with our great quizzes."
        actions={[
          <Button as={Link} to={route("/app/decks/new")}>
            Create Deck
          </Button>,
        ]}
      />
      <Main>
        {data.decks.length === 0 ? (
          <p>No decks yet </p>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {data.decks.map((deck) => (
              <li key={deck.id} className="relative rounded-md border p-4">
                <Link to={route("/app/decks/:id", { id: deck.id })}>
                  <span className="absolute inset-0" aria-hidden />
                  <div className="flex items-baseline">
                    <h3 className="font-semibold">{deck.name}</h3>

                    <span
                      className={classNames(
                        "ml-4 inline-flex items-center rounded-full  px-2.5 py-0.5 text-xs font-medium ",
                        deck.quiz.length === 0
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800",
                      )}
                    >
                      {deck.quiz.length === 0
                        ? "All done!"
                        : `${deck.quiz.length} left to learn`}
                    </span>
                  </div>
                </Link>
                <div className="prose prose-sm mt-1 text-gray-600">
                  <p>{deck.cards.length} cards</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Main>
    </>
  );
}

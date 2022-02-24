import type { User } from "@prisma/client";
import { matchSorter } from "match-sorter";
import {
  ActionFunction,
  json,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
  useLocation,
  useTransition,
} from "remix";
import { route } from "routes-gen";

import { Header } from "~/components/Header";
import { Main } from "~/components/Main";
import {
  createDeck,
  DeckWithAnswers,
  getDailyQuiz,
  getDecksWithAnswers,
  Quiz,
} from "~/models/deck.server";
import { requireUser } from "~/models/user.server";
import { classNames } from "~/utils/classNames";
import { getFormData } from "~/utils/getFormData";

export const action: ActionFunction = async ({ request }) => {
  const { name } = await getFormData(request, ["name"] as const);

  const user = await requireUser(request, route("/login"));

  await createDeck(name, user.id);

  return redirect(route("/"));
};

type LoaderData = {
  user: User;
  status: "decksFound" | "noDecks" | "emptySearch";
  searchTerm: string;
  decks: DeckWithAnswers[];
  quizzes: Quiz[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request, route("/login"));

  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search");

  const decks = await getDecksWithAnswers(user.id);

  if (!searchTerm) {
    return json<LoaderData>({
      user,
      status: "emptySearch",
      searchTerm: searchTerm || "",
      decks,
      quizzes: decks.map((deck) => getDailyQuiz(deck)),
    });
  }

  const results = matchSorter(decks, searchTerm, { keys: ["name"] });

  if (!results.length) {
    return json<LoaderData>({
      user,
      status: "noDecks",
      searchTerm,
      decks: [],
      quizzes: [],
    });
  }

  return json<LoaderData>({
    user,
    status: "decksFound",
    searchTerm,
    decks: results,
    quizzes: results.map((deck) => getDailyQuiz(deck)),
  });
};

export default function IndexPage() {
  const location = useLocation();
  const data = useLoaderData<LoaderData>();
  const transition = useTransition();

  return (
    <>
      <Header
        title="My decks"
        description="Create your decks and learn them with our great quizzes."
      />
      <Main>
        {data.decks.length === 0 ? (
          <p>No decks yet </p>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {data.decks.map((deck, index) => (
              <li key={deck.id} className="relative rounded-md border p-4">
                <Link to={route("/app/decks/:id", { id: deck.id })}>
                  <span className="absolute inset-0" aria-hidden />
                  <div className="flex items-baseline">
                    <h3 className="font-semibold">{deck.name}</h3>

                    <span
                      className={classNames(
                        "ml-4 inline-flex items-center rounded-full  px-2.5 py-0.5 text-xs font-medium ",
                        data.quizzes[index].length === 0
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800",
                      )}
                    >
                      {data.quizzes[index].length === 0
                        ? "All done!"
                        : `${data.quizzes[index].length} left to learn`}
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

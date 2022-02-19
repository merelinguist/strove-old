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
                  <h3 className="font-semibold">{deck.name}</h3>
                </Link>
                <div className="prose prose-sm mt-1 text-gray-600">
                  <p>
                    Completely unstyled, fully accessible UI components,
                    designed to integrate beautifully with Tailwind CSS.
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Main>
    </>
  );
}

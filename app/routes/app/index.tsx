import type { User } from "@prisma/client";
import {
  ActionFunction,
  Form,
  json,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
  useLocation,
  useTransition,
} from "remix";
import { matchSorter } from "match-sorter";

import { Header } from "~/components/Header";
import { Main } from "~/components/Main";
import {
  createDeck,
  DeckWithAnswers,
  getDailyQuiz,
  // getDailyQuiz,
  getDecksWithAnswers,
  Quiz,
} from "~/models/deck.server";
import { getUser } from "~/models/user.server";
import { getFormData } from "~/utils/getFormData";
import { route } from "routes-gen";

export const action: ActionFunction = async ({ request }) => {
  const { name } = await getFormData(request, ["name"] as const);

  const user = await getUser(request, "/login");

  await createDeck(name, user.id);

  return redirect("/");
};

type LoaderData = {
  user: User;
  status: "decksFound" | "noDecks" | "emptySearch";
  searchTerm: string;
  decks: DeckWithAnswers[];
  quizzes: Quiz[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request, "/home");

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
        description=" Film your courses and publish them with our easy courses uploded to."
      />
      <Main>
        <Form method="post" reloadDocument action="/actions/logout">
          <button type="submit">Logout</button>
        </Form>

        {data.decks.length === 0 ? (
          <p>No decks yet </p>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {data.decks.map((deck, index) => (
              <li key={deck.id} className="relative rounded-md border p-4">
                <Link to={route('/app/decks/:id', {id: deck.id})}>
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

        {/* <li >
              <Link to={`/decks/${deck.id}`}>
                <h3>{deck.name}</h3>
              </Link>
              <p>
                Created{" "}
                {new Date(deck.createdAt).toLocaleDateString("en", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>{data.quizzes[index].length} to learn</p>
            </li> */}

        {/* <Form method="post" reloadDocument action="/actions/logout">
        <button type="submit">Logout</button>
      </Form>

      <hr />

      <h2>Create Deck</h2>

      <Form replace method="post" key={location.key} className="space-y-6">
        <label className="block">
          <span>Name</span>
          <input
            required
            className="mt-1 block w-full"
            type="text"
            name="name"
          />
        </label>
        {transition.state === "submitting" && <p>Submitting...</p>}
      </Form>

      <hr /> */}
      </Main>
    </>
  );
}

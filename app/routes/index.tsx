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

export const action: ActionFunction = async ({ request }) => {
  const { name } = await getFormData(request, ["name"] as const);

  const user = await getUser(request);

  await createDeck(name, user.id);

  return redirect("/");
};

type LoaderData = {
  user: User;
  decks: DeckWithAnswers[];
  quizzes: Quiz[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  const decks = await getDecksWithAnswers(user.id);

  const quizzes = decks.map((deck) => getDailyQuiz(deck));

  return json<LoaderData>({ user, decks, quizzes });
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
        {data.decks.length === 0 ? (
          <p>No decks yet </p>
        ) : (
          <ul className="mt-10 grid gap-y-10 gap-x-6 sm:grid-cols-2 xl:grid-cols-3">
            {data.decks.map((deck, index) => (
              <li key={deck.id}>
                <h3 className="font-semibold">
                  Completely unstyled, fully accessible UI components
                </h3>
                <div className="prose prose-sm mt-1 text-gray-600">
                  <p>
                    Completely unstyled, fully accessible UI components,
                    designed to integrate beautifully with Tailwind CSS.
                  </p>
                </div>
                <Link
                  className="group mt-6 inline-flex h-9 items-center whitespace-nowrap rounded-full bg-slate-100 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  to={`/decks/${deck.id}`}
                >
                  Learn more
                  <span className="sr-only">
                    , Completely unstyled, fully accessible UI components
                  </span>
                  <svg
                    className="ml-3 overflow-visible text-slate-300 group-hover:text-slate-400"
                    width={3}
                    height={6}
                    viewBox="0 0 3 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M0 0L3 3L0 6" />
                  </svg>
                </Link>
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

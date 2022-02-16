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
} from "remix";

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

  return (
    <div className="prose mx-auto p-8">
      <h1>Welcome to Remix</h1>

      <p>
        You are <strong>{data.user.email}</strong>.
      </p>

      <Form method="post" reloadDocument action="/actions/logout">
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
      </Form>

      <hr />

      <h2>Decks</h2>

      {data.decks.length === 0 ? (
        <p>No decks yet </p>
      ) : (
        <ul>
          {data.decks.map((deck, index) => (
            <li key={deck.id}>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

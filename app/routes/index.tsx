import type { Deck, User } from "@prisma/client";
import type { ActionFunction, HeadersFunction, LoaderFunction } from "remix";
import { Form, json, redirect, useLoaderData, useLocation } from "remix";

import { prisma } from "~/db.server";
import { createDeck } from "~/models/deck.server";
import { getUser } from "~/models/user.server";
import { getFormData } from "~/utils/getFormData";

const action: ActionFunction = async ({ request }) => {
  const { name } = await getFormData(request, ["name"] as const);

  const user = await getUser(request);

  await createDeck(name, user.id);

  return redirect("/");
};


type LoaderData = {
  user: User;
  decks: Deck[];
};

const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  const decks = await prisma.deck.findMany({ where: { userId: user.id } });

  return json<LoaderData>({ user, decks });
};

function IndexPage() {
  const location = useLocation();
  const data = useLoaderData<LoaderData>();

  console.log(data.decks[0]);

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
          {data.decks.map((note) => (
            <li key={note.id}>
              <h3>{note.name}</h3>
              <p>
                Created{" "}
                {new Date(note.createdAt).toLocaleDateString("en", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                Pariatur aliqua do tempor eiusmod. Nulla exercitation minim do
                proident mollit. Dolore exercitation minim ut reprehenderit ad.
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { action, loader };

export default IndexPage;

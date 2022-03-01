import type { Card } from "@prisma/client";
import { useState } from "react";
import {
  ActionFunction,
  HeadersFunction,
  json,
  Link,
  LoaderFunction,
  MetaFunction,
  redirect,
  useCatch,
  useLoaderData,
  useParams,
} from "remix";
import { route } from "routes-gen";
import invariant from "tiny-invariant";

import { Button } from "~/components/Button";
import { Header } from "~/components/Header";
import { Main } from "~/components/Main";
import { prisma } from "~/db.server";
import {
  DeckWithAnswers,
  getDailyQuiz,
  getDeck,
  getDeckWithAnswers,
  Quiz,
  score,
} from "~/models/deck.server";
import { requireUser } from "~/models/user.server";
import { getFormData } from "~/utils/getFormData";

export const action: ActionFunction = async ({ request, params }) => {
  const { _method: method } = await getFormData(request, ["_method"] as const);

  if (method === "delete") {
    const user = await requireUser(request, route("/login"));

    invariant(params.id, "params.id must be a string");

    const deck = await getDeck(params.id);

    if (!deck) {
      throw new Response("Can't delete what does not exist", { status: 404 });
    }

    if (deck.userId !== user.id) {
      throw new Response("Pssh, nice try. That's not your deck", {
        status: 401,
      });
    }

    await prisma.deck.delete({ where: { id: params.id } });

    return redirect("/");
  }

  return {};
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control") ?? "",
    Vary: loaderHeaders.get("Vary") ?? "",
  };
};

type LoaderData = {
  deck: DeckWithAnswers;
  scores: number[];
  isOwner: boolean;
  quiz: Quiz;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const user = await requireUser(request, route("/login"));

  invariant(params.id, "params.id must be a string");

  const deck = await getDeckWithAnswers(params.id);

  if (!deck) {
    throw new Response("What a deck! Not found.", {
      status: 404,
    });
  }

  const scores = deck.cards.map((card) => score(card.answers));

  return json<LoaderData>(
    {
      deck,
      scores,
      isOwner: user.id === deck.userId,
      quiz: getDailyQuiz(deck),
    },
    {
      headers: {
        "Cache-Control": `public, max-age=${60 * 5}, s-maxage=${60 * 60 * 24}`,
        Vary: "Cookie",
      },
    },
  );
};

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined;
}) => {
  if (!data) {
    return {
      title: "No deck",
      description: "No deck found",
    };
  }

  return {
    title: `"${data.deck.name}" deck`,
    description: `Enjoy the "${data.deck.name}" deck and much more`,
  };
};

function CardItem({
  card,
  index,
  scores,
}: {
  card: Card;
  index: number;
  scores: number[];
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <tr key={card.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
      <td className="whitespace-nowrap px-6 py-4 font-medium">
        {isEditing ? <input /> : card.front}
      </td>
      <td className="whitespace-nowrap px-6 py-4">{card.back}</td>
      <td className="whitespace-nowrap px-6 py-4">
        {Math.round(scores[index] * 100) === -100
          ? 0
          : Math.round(scores[index] * 100)}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-600 hover:text-blue-900"
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

export default function ShowDeckPage() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <Header
        title={data.deck.name}
        actions={[
          <Button
            variant="white"
            as={Link}
            to={route("/app/decks/:id/quiz", { id: data.deck.id })}
          >
            Edit
          </Button>,
          <Button
            as={Link}
            to={route("/app/decks/:id/quiz", { id: data.deck.id })}
          >
            Learn
          </Button>,
        ]}
      />

      <Main>
        <h2 className="mb-2 text-2xl font-bold leading-7 tracking-tight">
          Cards
        </h2>

        <div className="mt-10 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-lg border border-b">
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Front
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Back
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Knowledge
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.deck.cards.map((card, index) => (
                      <CardItem
                        card={card}
                        index={index}
                        scores={data.scores}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();

  switch (caught.status) {
    case 404: {
      return (
        <div className="prose mx-auto p-8">
          <h1>Huh? What the heck is {params.id}?</h1>
        </div>
      );
    }
    case 401: {
      return (
        <div className="prose mx-auto p-8">
          <h1> Sorry, but {params.id} is not your deck.</h1>
        </div>
      );
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  const { id } = useParams();

  // eslint-disable-next-line no-console
  console.log(error);

  return <div>{`There was an error loading deck by the id ${id}. Sorry.`}</div>;
}

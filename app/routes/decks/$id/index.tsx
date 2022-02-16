import {
  ActionFunction,
  Form,
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
import invariant from "tiny-invariant";

import { prisma } from "~/db.server";
import {
  DeckWithAnswers,
  getDailyQuiz,
  getDeck,
  getDeckWithAnswers,
  Quiz,
} from "~/models/deck.server";
import { getUser } from "~/models/user.server";
import { getFormData } from "~/utils/getFormData";

export const action: ActionFunction = async ({ request, params }) => {
  const { _method: method } = await getFormData(request, ["_method"]);

  if (method === "delete") {
    const user = await getUser(request);

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
  isOwner: boolean;
  quiz: Quiz;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const user = await getUser(request);

  invariant(params.id, "params.id must be a string");

  const deck = await getDeckWithAnswers(params.id);

  if (!deck) {
    throw new Response("What a deck! Not found.", {
      status: 404,
    });
  }

  return json<LoaderData>(
    {
      deck,
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

export default function ShowDeckPage() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="prose mx-auto p-8">
      <h1>{data.deck.name}</h1>

      <h2>Actions</h2>
      <ul>
        <li>
          {data.isOwner ? (
            <Form method="post">
              <input type="hidden" name="_method" value="delete" />
              <button type="submit" className="button">
                Delete
              </button>
            </Form>
          ) : null}
        </li>
        <li>
          <Link to="quiz">Quiz</Link>
        </li>
      </ul>

      <h2>Daily Quiz</h2>
      <p>Learn today: {data.quiz.length}</p>

      <h2>Cards</h2>
      <ul className="columns-4">
        {data.deck.cards.map((card) => (
          <li>
            {card.front} = {card.back}
          </li>
        ))}
      </ul>
    </div>
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

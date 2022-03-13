import type { Card } from "@prisma/client";
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  useActionData,
  useCatch,
  useLoaderData,
  useTransition,
} from "remix";
import { serverError } from "remix-utils";

import { prisma } from "~/db.server";

async function getLesson(deckId: string) {
  const deck = await prisma.deck.findUnique({
    include: {
      user: true,
      lesson: { include: { cards: true } },
      cards: { include: { answers: true } },
    },
    where: { id: deckId },
  });

  if (!deck) {
    throw serverError("deck not found");
  }

  if (!deck.lesson) {
    return prisma.lesson.create({
      include: { cards: true },
      data: {
        deckId: deck.id,
        cards: {
          connect: deck.cards.map((card) => ({ id: card.id })).slice(0, 10),
        },
      },
    });
  }

  return deck.lesson;
}

type ActionData =
  | {
      status: "ask";
    }
  | {
      status: "validate";
      answer: string;
      isCorrect: boolean;
    };

export const action: ActionFunction = async ({ params, request }) => {
  if (!params.id) {
    throw serverError("params.id is not a string");
  }

  const formData = await request.formData();

  const status = formData.get("status");

  if (typeof status !== "string") {
    throw serverError({ message: "formData.get('status') is not a string" });
  }

  switch (status) {
    case "finish": {
      await prisma.lesson.delete({ where: { deckId: params.id } });

      return redirect(`/decks/${params.id}/learn`);
    }

    case "ask":
    case "validate": {
      const cardId = formData.get("cardId");
      const answer = formData.get("answer");
      if (typeof cardId !== "string") {
        throw serverError({
          message: "formData.get('cardId') is not a string",
        });
      }

      const card = await prisma.card.findUnique({ where: { id: cardId } });

      if (!card) {
        throw serverError({ message: `cannot find card with id ${cardId}` });
      }

      switch (status) {
      }
      if (typeof answer !== "string") {
        throw serverError({
          message: "formData.get('answer') is not a string",
        });
      }

      return json<ActionData>({
        status: "validate",
        answer,
        isCorrect: true,
      });
    }

    case "validate": {
      const lesson = await getLesson(params.id);

      await prisma.lesson.update({
        data: {
          cards: {
            set: lesson.cards
              .map((lessonCard) => ({ id: lessonCard.id }))
              .filter((lessonCard) => lessonCard.id !== card.id),
          },
        },
        where: { id: lesson.id },
      });

      return json<ActionData>({ status: "ask" });
    }
    default: {
      return new Response("invalid status", { status: 400 });
    }
  }
};

type LoaderData = {
  challenge: { type: string; card: Card } | null;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) {
    throw serverError("params.id is not a string");
  }

  const lesson = await getLesson(params.id);

  const challenge = lesson.cards[0]
    ? { type: "simple", card: lesson.cards[0] }
    : null;

  return json<LoaderData>({ challenge });
};

function useState() {
  const actionData = useActionData<ActionData>() ?? { status: "ask" };
  const transition = useTransition();

  const state: "ask" | "loadingValidate" | "validate" | "loadingAsk" =
    transition.state === "submitting" && actionData.status === "ask"
      ? "loadingValidate"
      : (transition.state === "submitting" &&
          actionData.status === "validate") ||
        (transition.state === "loading" && actionData.status === "ask")
      ? "loadingAsk"
      : (transition.state === "idle" && actionData.status === "validate") ||
        (transition.state === "loading" && actionData.status === "validate")
      ? "validate"
      : "ask";

  let buttonText: string;
  let statusText: string;

  switch (state) {
    case "ask":
      buttonText = "Check";
      statusText = "Submit your answer";
      break;
    case "loadingValidate":
      buttonText = "Checking...";
      statusText = "Checking...";
      break;
    case "validate":
      buttonText = "Next Card";
      statusText =
        actionData.status === "validate" && actionData.isCorrect
          ? "🎉 Yay Well Done!"
          : "😭 Oh no!";
      break;
    case "loadingAsk":
      buttonText = "Loading...";
      statusText = "Loading next card...";
      break;
    default:
      buttonText = `Unknown ${state}`;
      statusText = `Unknown ${state}`;
      break;
  }

  return { actionData, state, buttonText, statusText };
}

export default function LearnDeckPage() {
  const data = useLoaderData<LoaderData>();

  const state = useState();

  if (!data.challenge) {
    return (
      <div className="prose mx-auto p-8">
        <h1>All done!</h1>
        <Form method="post" replace>
          <button name="status" type="submit" value="finish">
            Finish
          </button>
        </Form>
      </div>
    );
  }

  return (
    <div className="prose mx-auto p-8">
      <Form method="post" replace>
        <input name="status" type="hidden" value={state.actionData.status} />
        <input name="cardId" type="hidden" value={data.challenge.card.id} />

        <h2>{state.statusText}</h2>

        <label className="block">
          <span className="text-gray-700">Full name</span>
          <input className="mt-1 block w-full" name="answer" type="text" />
        </label>
      </Form>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className="prose">
      <h1>
        {caught.status} {caught.statusText}
      </h1>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <div className="prose">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
    </div>
  );
}

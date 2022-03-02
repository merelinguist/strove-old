import { XIcon } from "@heroicons/react/outline";
import type { Deck } from "@prisma/client";
import { useEffect, useRef } from "react";
import Confetti from "react-confetti";
import {
  ActionFunction,
  Form,
  json,
  Link,
  LoaderFunction,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { route } from "routes-gen";
import invariant from "tiny-invariant";
import { useWindowSize } from "web-api-hooks";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";

import { createAnswer } from "~/models/answer.server";
import { getCard } from "~/models/card.server";
import {
  DeckWithAnswers,
  getDailyQuiz,
  getDeckWithAnswers,
  getQuizLength,
  Quiz,
} from "~/models/deck.server";
import { getFormData } from "~/utils/getFormData";

type ActionData =
  | {
      status: "ask";
    }
  | {
      status: "validate";
      correctness: number;
    };

export const action: ActionFunction = async ({ request }) => {
  const { answer, cardId, status } = await getFormData(request, [
    "answer",
    "cardId",
    "status",
  ] as const);

  const card = await getCard(cardId);

  invariant(card, "card is not defined");

  const correctness = 0.5;

  switch (status) {
    case "ask": {
      return json<ActionData>({ status: "validate", correctness });
    }
    case "validate": {
      await createAnswer(correctness, card.id);

      return json<ActionData>({ status: "ask" });
    }
    default: {
      return new Response("invalid status", { status: 400 });
    }
  }
};

type LoaderData = {
  deck: Deck;
  card: Quiz[number] | null;
  progress: number;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, "params.id must be a string");

  const deck = await getDeckWithAnswers(params.id);

  if (!deck) {
    throw new Response("What a deck! Not found.", {
      status: 404,
    });
  }

  const quiz = getDailyQuiz(deck);

  const progress =
    ((getQuizLength(deck) - quiz.length) / getQuizLength(deck)) * 100;

  return json<LoaderData>({
    deck,
    card: quiz[0],
    progress,
  });
};

export default function QuizPage() {
  const actionData = useActionData<ActionData>();
  const data = useLoaderData<LoaderData>();
  const transition = useTransition();

  const status = actionData ? actionData.status : "ask";

  const buttonText =
    status === "ask"
      ? transition.state === "submitting"
        ? "Checking"
        : "Check"
      : "Continue";

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status === "ask") {
      inputRef.current?.focus();
      formRef.current?.reset();
    }

    if (status === "validate") {
      buttonRef.current?.focus();
    }
  }, [status]);

  if (!data.card) {
    return (
      <div className="prose mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <h1>All done!</h1>
      </div>
    );
  }

  return (
    <Form
      ref={formRef}
      replace
      method="post"
      className="prose mx-auto space-y-6 px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="flex items-center space-x-4">
        <Link
          to={route("/app/decks/:id", { id: data.deck.id })}
          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <span className="sr-only">Close</span>
          <XIcon className="h-6 w-6" aria-hidden />
        </Link>
        <div className="flex-1 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all"
            style={{ width: `${data.progress}%` }}
          />
        </div>
      </div>

      <h1>{data.card.front}</h1>
      <input
        type="hidden"
        name="answer"
        value="blah"
        disabled={status === "ask"}
      />
      <input type="hidden" name="cardId" value={data.card.id} />
      <input name="status" type="hidden" value={status} />
      <Input>
        <Input.Label>Translate into English</Input.Label>
        <Input.Field
          required
          ref={inputRef}
          disabled={status === "validate"}
          type="text"
          name="answer"
        />
      </Input>
      {status === "validate" && (
        <p>
          Wow you were right by{" "}
          {actionData &&
            actionData.status === "validate" &&
            actionData.correctness}{" "}
          this much :)
        </p>
      )}
      <Button ref={buttonRef} type="submit">
        {buttonText}
      </Button>
    </Form>
  );
}

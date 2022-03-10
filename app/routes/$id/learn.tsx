import type { Card } from "@prisma/client";
import { useEffect, useRef } from "react";
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
import { notFound } from "remix-utils";
import invariant from "tiny-invariant";

import { Button } from "~/components/Button";
import { Multi } from "~/components/Multi";
import { Simple } from "~/components/Simple";
import { prisma } from "~/db.server";
import { getCard } from "~/models/card.server";
import { getDeck, Question } from "~/models/deck.server";
import { getFormData } from "~/utils/getFormData";
import { getGrade, practiceCard } from "~/utils/supermemo";

export type ActionData =
  | {
      status: "ask";
    }
  | {
      status: "validate";
      response: string;
      isCorrect: boolean;
    };

export const action: ActionFunction = async ({ request }) => {
  const { answer, cardId, status } = await getFormData(request, [
    "answer",
    "cardId",
    "status",
  ] as const);

  const card = await getCard(cardId);

  invariant(card, "card is not defined");

  const grade = getGrade(card, answer);

  switch (status) {
    case "ask": {
      return json<ActionData>({
        status: "validate",
        response: answer,
        isCorrect: grade > 2,
      });
    }
    case "validate": {
      const { interval, repetition, easiness, dueDate } = practiceCard(
        card,
        grade,
      );

      await prisma.card.update({
        data: { interval, repetition, easiness, dueDate },
        where: { id: card.id },
      });

      return json<ActionData>({ status: "ask" });
    }
    default: {
      return new Response("invalid status", { status: 400 });
    }
  }
};

export type LoaderData = {
  // deck: Deck;
  question: Question | null;
};

export type UIStates = "showcard" | "checking" | "showresult" | "loadingnext";
export const loader: LoaderFunction = async ({ params }) => {
  const deck = await getDeck(params.id as string);

  if (!deck) {
    throw notFound("deck not found");
  }

  const question = deck.quiz[0];

  return json<LoaderData>({ question });
};

export default function LearnDeckPage() {
  const actionData = useActionData<ActionData>();
  const data = useLoaderData<LoaderData>();
  const transition = useTransition();
  const defaultActionData: ActionData = { status: "ask" };
  const status = actionData ?? defaultActionData;

  const state: UIStates =
    transition.state === "submitting" && status.status === "ask"
      ? "checking"
      : (transition.state === "submitting" && status.status === "validate") ||
        (transition.state === "loading" && status.status === "ask")
      ? "loadingnext"
      : (transition.state === "idle" && status.status === "validate") ||
        (transition.state === "loading" && status.status === "validate")
      ? "showresult"
      : "showcard";

  let buttonText: string;
  let statusText: string;
  switch (state) {
    case "showcard":
      buttonText = "Check";
      statusText = "Submit your answer";
      break;
    case "checking":
      buttonText = "Checking...";
      statusText = "Checking...";
      break;
    case "showresult":
      buttonText = "Next Card";
      statusText =
        status.status === "validate" && status.isCorrect
          ? "🎉 Yay Well Done!"
          : "😭 Oh no!";
      break;
    case "loadingnext":
      buttonText = "Loading...";
      statusText = "Loading next card...";
      break;
    default:
      buttonText = `Unknown ${state}`;
      statusText = `Unknown ${state}`;
      break;
  }

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (state === "showcard") {
      inputRef.current?.focus();
      formRef.current?.reset();
    } else if (state === "showresult") {
      buttonRef.current?.focus();
    }
  }, [state]);

  if (!data.question) {
    return (
      <div className="prose mx-auto p-8">
        <h1>All done!</h1>
        <Link to="/">Back home</Link>
      </div>
    );
  }

  return (
    <Form ref={formRef} className="prose mx-auto p-8" method="post" replace>
      <h1>Learn</h1>

      <input
        disabled={status.status === "ask"}
        name="answer"
        type="hidden"
        value="blah"
      />
      <input name="cardId" type="hidden" value={data.question.card.id} />
      <input name="status" type="hidden" value={status.status} />

      <p className="text-lg font-bold">{statusText}</p>

      <Simple inputRef={inputRef} status={status} />
      <Multi inputRef={inputRef} state={state} status={status} />

      <hr />

      <Button
        ref={buttonRef}
        disabled={state === "checking" || state === "loadingnext"}
        type="submit"
      >
        {buttonText}
      </Button>
    </Form>
  );
}

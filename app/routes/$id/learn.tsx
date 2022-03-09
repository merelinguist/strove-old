import type { Card } from "@prisma/client";
import { RefObject, useEffect, useRef } from "react";
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
import { Input } from "~/components/Input";
import { prisma } from "~/db.server";
import { getCard } from "~/models/card.server";
import { getDeck, Question } from "~/models/deck.server";
import { classNames } from "~/utils/classNames";
import { getFormData } from "~/utils/getFormData";
import { getGrade, practiceCard } from "~/utils/supermemo";

function Multi({
  inputRef,
  status,
  state,
}: {
  inputRef: RefObject<HTMLInputElement>;
  status: ActionData;
  state: UIStates;
}) {
  const data = useLoaderData<LoaderData>();
  if (!data.question || data.question.type !== "multi") {
    return null;
  }
  const answer = data.question.card.back;
  const getClassNames = (card: Card) => {
    if (state === "showresult" && status.status === "validate") {
      if (status.isCorrect && card.back === status.response) {
        return "border rounded border-green-300 bg-green-100";
      }
      if (!status.isCorrect) {
        if (card.back === status.response) {
          return "border rounded border-red-300 bg-red-100";
        }
        // highlight the correct answer
        if (card.back === answer) {
          return "border rounded border-green-300 bg-green-100";
        }
      }
    }
    return "";
  };

  return (
    <div>
      <label
        className={`text-base font-medium ${
          state === "loadingnext" ? "text-gray-400" : ""
        }`}
      >
        {data.question.card.front}
      </label>

      <fieldset key={data.question.card.id} className="mt-4">
        <legend className="sr-only">Notification method</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {data.question.cards.map((card, index) => (
            <div
              key={card.id}
              className={`flex items-center p-4 ${getClassNames(card)}`}
            >
              <input
                ref={index === 0 ? inputRef : undefined}
                className={`h-4 w-4 border-gray-300 ${
                  state === "showcard" || state === "showresult"
                    ? "text-sky-600 focus:ring-sky-500"
                    : "text-gray-400 focus:ring-gray-400"
                }`}
                defaultChecked={index === 0}
                disabled={state !== "showcard"}
                id={card.id}
                name="answer"
                required
                type="radio"
                value={card.back}
              />
              <label
                className={`ml-3 block text-sm font-medium ${
                  state !== "showcard" ? "text-gray-400" : "text-gray-700"
                }`}
                htmlFor={card.id}
              >
                {card.back}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function Simple({
  inputRef,
  status,
  state,
}: {
  inputRef: RefObject<HTMLInputElement>;
  status: ActionData;
  state: UIStates;
}) {
  const data = useLoaderData<LoaderData>();

  if (!data.question || data.question.type !== "simple") {
    return null;
  }

  return (
    <Input>
      <Input.Label>{data.question.card.front}</Input.Label>
      <input
        ref={inputRef}
        className={classNames(
          "mt-1 block w-full rounded-md shadow-sm sm:text-sm",
          status.status === "validate"
            ? status.isCorrect
              ? "border-emerald-500 ring-1 ring-emerald-500"
              : "border-rose-500 ring-1 ring-rose-500"
            : "border-gray-300 focus:border-sky-500 focus:ring-sky-500",
        )}
        disabled={status.status === "validate"}
        name="answer"
        type="text"
      />
    </Input>
  );
}

type ActionData =
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

type LoaderData = {
  // deck: Deck;
  question: Question | null;
};

type UIStates = "showcard" | "checking" | "showresult" | "loadingnext";
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

  console.log({
    state,
    transition: transition.state,
    status: status.status,
    buttonText,
    statusText,
    question: data.question?.card.front,
  });

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
      <div className="p-8 mx-auto prose">
        <h1>All done!</h1>
        <Link to="/">Back home</Link>
      </div>
    );
  }

  return (
    <Form ref={formRef} className="p-8 mx-auto prose" method="post" replace>
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

      <Simple inputRef={inputRef} state={state} status={status} />
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

import { RadioGroup } from "@headlessui/react";
import type { Card } from "@prisma/client";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import {
  ActionFunction,
  Form,
  json,
  Link,
  LoaderFunction,
  useActionData,
  useLoaderData,
  useLocation,
  useTransition,
} from "remix";
import { notFound } from "remix-utils";
import invariant from "tiny-invariant";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { prisma } from "~/db.server";
import { getCard } from "~/models/card.server";
import { Deck, getDeck, Question } from "~/models/deck.server";
import { classNames } from "~/utils/classNames";
import { getFormData } from "~/utils/getFormData";
import { getGrade, practiceCard } from "~/utils/supermemo";

function useStatus() {
  const actionData = useActionData<ActionData>();

  const status = useMemo<ActionData>(
    () => actionData || { status: "ask" },
    [actionData],
  );

  return status;
}

function Multi({ inputRef }: { inputRef: RefObject<HTMLInputElement> }) {
  const transition = useTransition();
  const data = useLoaderData<LoaderData>();

  if (!data.question || data.question.type !== "multi") {
    return null;
  }

  return (
    <div>
      <label className="text-base font-medium">
        {transition.state === "loading" ? "..." : data.question.card.front}
      </label>

      <fieldset key={data.question.card.id} className="mt-4">
        <legend className="sr-only">Notification method</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {data.question.cards.map((card, index) => (
            <div key={card.id} className="flex items-center">
              <input
                ref={index === 0 ? inputRef : undefined}
                className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-500"
                defaultChecked={index === 0}
                id={card.id}
                name="answer"
                required
                type="radio"
                value={card.back}
              />
              <label
                className="ml-3 block text-sm font-medium text-gray-700"
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

function Simple({ inputRef }: { inputRef: RefObject<HTMLInputElement> }) {
  const transition = useTransition();
  const status = useStatus();
  const data = useLoaderData<LoaderData>();

  if (!data.question || data.question.type !== "simple") {
    return null;
  }

  return (
    <Input>
      <Input.Label>
        {transition.state === "loading" ? "..." : data.question.card.front}
      </Input.Label>
      <input
        ref={inputRef}
        className={classNames(
          "mt-1 block w-full rounded-md shadow-sm sm:text-sm",
          // eslint-disable-next-line no-nested-ternary
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
      return json<ActionData>({ status: "validate", isCorrect: grade > 2 });
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
  deck: Deck;
  question: Question | null;
};

export const loader: LoaderFunction = async ({ params }) => {
  const deck = await getDeck(params.id as string);

  if (!deck) {
    throw notFound("deck not found");
  }

  const question = deck.quiz[0];

  return json<LoaderData>({ deck, question });
};

export default function LearnDeckPage() {
  const actionData = useActionData<ActionData>();
  const data = useLoaderData<LoaderData>();
  const transition = useTransition();

  console.log(data);

  const status = useStatus();

  let buttonText: string;

  if (status.status === "ask") {
    if (transition.state === "submitting") {
      buttonText = "Checking";
    } else {
      buttonText = "Check";
    }
  } else {
    buttonText = "Continue";
  }

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status.status === "ask") {
      inputRef.current?.focus();
      formRef.current?.reset();
    }

    if (status.status === "validate") {
      buttonRef.current?.focus();
    }
  }, [status, data.question?.card]);

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

      {status.status === "validate" && (
        <p>{status.isCorrect ? "Yay well done!" : "Oh no :("}</p>
      )}

      <Simple inputRef={inputRef} />
      <Multi inputRef={inputRef} />

      <hr />

      {status.status === "validate" && !status.isCorrect && (
        <p>Correct answer: {data.question.card.back}</p>
      )}

      <Button ref={buttonRef} type="submit">
        {buttonText}
      </Button>
    </Form>
  );
}

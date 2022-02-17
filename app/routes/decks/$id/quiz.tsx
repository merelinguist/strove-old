import { useEffect, useRef } from "react";
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  useLoaderData,
  useLocation,
  useTransition,
} from "remix";
import invariant from "tiny-invariant";

import { createAnswer } from "~/models/answer.server";
import { getCard } from "~/models/card.server";
import {
  DeckWithAnswers,
  getDailyQuiz,
  getDeckWithAnswers,
  Quiz,
} from "~/models/deck.server";
import { getFormData } from "~/utils/getFormData";

export const action: ActionFunction = async ({ request }) => {
  const { answer, cardId } = await getFormData(request, ["answer", "cardId"]);

  const card = await getCard(cardId);

  invariant(card, "card is not defined");

  await createAnswer(answer === card.back ? 1 : 0, card.id);

  return {};
};

type LoaderData = {
  deck: DeckWithAnswers;
  quiz: Quiz;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, "params.id must be a string");

  const deck = await getDeckWithAnswers(params.id);

  if (!deck) {
    throw new Response("What a deck! Not found.", {
      status: 404,
    });
  }

  return json<LoaderData>({
    deck,
    quiz: getDailyQuiz(deck),
  });
};

export default function QuizPage() {
  const transition = useTransition();
  const data = useLoaderData<LoaderData>();

  const state: "idle" | "success" | "error" | "submitting" =
    transition.submission ? "submitting" : "idle";

  const card = data.quiz[0];
  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (state === "error") {
      inputRef.current?.focus();
    }

    if (state === "idle" && mounted.current) {
      inputRef.current?.select();
    }

    if (state === "success") {
      successRef.current?.focus();
    }

    mounted.current = true;
  }, [state]);

  if (!card) {
    return (
      <div className="prose mx-auto p-8">
        <h1>Victory!</h1>
      </div>
    );
  }

  return (
    <Form
      replace
      method="post"
      className="mx-auto max-w-3xl space-y-16 px-4 pt-10 sm:px-6 lg:px-8"
    >
      <div aria-hidden className="overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-blue-600"
          style={{ width: `${((20 - data.quiz.length) / 20) * 100}%` }}
        />
      </div>

      <div className="space-y-6">
        <input type="hidden" value={card.id} name="cardId" />
        <label
          htmlFor="name"
          className="text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          {card.front}
        </label>
        <input
          ref={inputRef}
          placeholder="Your answer..."
          id="name"
          required
          className="block w-full border-0 p-0 text-lg focus:outline-none focus:ring-0"
          type="text"
          name="answer"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Check{state === "submitting" && "ing..."}
      </button>
    </Form>
  );
}

import { json, LoaderFunction, useLoaderData } from "remix";

import { getDailyQuiz } from "~/models/deck.server";

function duplicate<T>(item: T, times: number): T[] {
  return Array(times).fill(item);
}

function daysAgo(number: number) {
  return new Date(new Date().setDate(new Date().getDate() - number));
}

type LoaderData = ReturnType<typeof getDailyQuiz>[];

export const loader: LoaderFunction = async () => {
  const deck1 = getDailyQuiz({
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "",
    userId: "",
    cards: [],
  });

  const deck2 = getDailyQuiz({
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "",
    userId: "",
    cards: [
      {
        id: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        front: "",
        back: "",
        deckId: "",
        answers: [
          {
            id: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            correctness: 1,
            cardId: "",
          },
        ],
      },
    ],
  });

  const deck3 = getDailyQuiz({
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "",
    userId: "",
    cards: duplicate(
      {
        id: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        front: "",
        back: "",
        deckId: "",
        answers: [
          {
            id: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            correctness: 1,
            cardId: "",
          },
        ],
      },
      30,
    ),
  });

  const deck4 = getDailyQuiz({
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "",
    userId: "",
    cards: [
      ...duplicate(
        {
          id: "",
          createdAt: daysAgo(5),
          updatedAt: new Date(),
          front: "amo",
          back: "i love",
          deckId: "",
          answers: [
            {
              id: "",
              createdAt: daysAgo(1),
              updatedAt: new Date(),
              correctness: 1,
              cardId: "",
            },
          ],
        },
        10,
      ),
      ...duplicate(
        {
          id: "",
          createdAt: new Date(),
          updatedAt: new Date(),
          front: "",
          back: "",
          deckId: "",
          answers: [
            {
              id: "",
              createdAt: new Date(),
              updatedAt: new Date(),
              correctness: 1,
              cardId: "",
            },
          ],
        },
        10,
      ),
    ],
  });

  return json<LoaderData>([deck1, deck2, deck3, deck4]);
};

export default function QuizPage() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="prose mx-auto p-8">
      <h1>Quiz</h1>
      {data.map((deck) => (
        <pre>{JSON.stringify(deck, null, 2)}</pre>
      ))}
    </div>
  );
}

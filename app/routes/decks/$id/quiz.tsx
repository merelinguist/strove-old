import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  useLoaderData,
  useLocation,
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
  const location = useLocation();
  const data = useLoaderData<LoaderData>();

  const card = data.quiz[0];

  if (!card) {
    return (
      <div className="prose mx-auto p-8">
        <h1>Victory!</h1>
      </div>
    );
  }

  return (
    <div className="prose mx-auto p-8">
      <h1>hewwo</h1>
      <Form replace method="post" key={location.key} className="space-y-6">
        <input type="hidden" value={card.id} name="cardId" />
        <label className="block">
          <span>{card.front}</span>
          <input
            required
            className="mt-1 block w-full"
            type="text"
            name="answer"
          />
        </label>
      </Form>
    </div>
  );
}

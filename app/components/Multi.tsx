import type { Card } from "@prisma/client";
import type { RefObject } from "react";
import { useLoaderData } from "remix";

import type { ActionData, LoaderData, UIStates } from "~/routes/$id/learn";

export function Multi({
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

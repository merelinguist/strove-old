import type { RefObject } from "react";
import { useLoaderData } from "remix";

import { Input } from "~/components/Input";
import type { ActionData, LoaderData } from "~/routes/$id/learn";
import { classNames } from "~/utils/classNames";

export function Simple({
  inputRef,
  status,
}: {
  inputRef: RefObject<HTMLInputElement>;
  status: ActionData;
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

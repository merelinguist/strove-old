import type { RefObject } from "react";
import { useLoaderData } from "remix";

import { Input } from "~/components/Input";
import type { LoaderData } from "~/routes/$id/learn";
import { classNames } from "~/utils/classNames";
import { useLesson } from "~/utils/useLesson";

export function Simple({
  inputRef,
}: {
  inputRef: RefObject<HTMLInputElement>;
}) {
  const data = useLoaderData<LoaderData>();
  const lesson = useLesson();

  if (!data.challenge || data.challenge.type !== "simple") {
    return null;
  }

  return (
    <Input>
      <Input.Label>{data.challenge.card.front}</Input.Label>
      <input
        ref={inputRef}
        className={classNames(
          "mt-1 block w-full rounded-md shadow-sm sm:text-sm",
          lesson.actionData.status === "validate"
            ? lesson.actionData.isCorrect
              ? "border-emerald-500 ring-1 ring-emerald-500"
              : "border-rose-500 ring-1 ring-rose-500"
            : "border-gray-300 focus:border-sky-500 focus:ring-sky-500",
        )}
        disabled={lesson.state === "validate"}
        name="answer"
        type="text"
      />
    </Input>
  );
}

import type { Card } from "@prisma/client";
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  useLoaderData,
} from "remix";
import { serverError } from "remix-utils";

import { Button } from "~/components/Button";
import { Simple } from "~/components/Simple";
import { getLesson } from "~/models/lesson.server";
import { classNames } from "~/utils/classNames";
import { ask, finish, validate } from "~/utils/lessonActions.server";
import { useLesson } from "~/utils/useLesson";
import { useLessonFocusManagement } from "~/utils/useLessonFocusManagement";

export type ActionData =
  | {
      status: "ask";
    }
  | {
      status: "validate";
      answer: string;
      isCorrect: boolean;
    };

export const action: ActionFunction = async ({ params, request }) => {
  if (!params.id) {
    throw serverError("params.id is not a string");
  }

  const formData = await request.formData();

  const status = formData.get("status");
  const cardId = formData.get("cardId");
  const answer = formData.get("answer");

  if (typeof status !== "string") {
    throw serverError({ message: "formData.get('status') is not a string" });
  }

  switch (status) {
    case "ask": {
      return ask({ cardId, answer });
    }

    case "validate": {
      return validate({ id: params.id, cardId, answer });
    }

    case "finish": {
      return finish({ id: params.id });
    }

    default: {
      throw serverError({
        message: `formData.get("status") returned ${status}, which is not a valid status`,
      });
    }
  }
};

export type LoaderData = {
  progress: number;
  challenge: { type: string; card: Card } | null;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) {
    throw serverError("params.id is not a string");
  }

  const lesson = await getLesson(params.id);

  const challenge = lesson.cards[0]
    ? { type: "simple", card: lesson.cards[0] }
    : null;

  return json<LoaderData>({ progress: lesson.cards.length, challenge });
};

export default function LearnDeckPage() {
  const data = useLoaderData<LoaderData>();
  const lesson = useLesson();

  const { formRef, inputRef, buttonRef } = useLessonFocusManagement();

  if (!data.challenge) {
    return (
      <div className="prose mx-auto p-8">
        <h1>All done!</h1>
        <Form method="post" replace>
          <button name="status" type="submit" value="finish">
            Finish
          </button>
        </Form>
      </div>
    );
  }

  return (
    <div className="prose mx-auto p-8">
      <Form ref={formRef} method="post" replace>
        <input name="status" type="hidden" value={lesson.actionData.status} />
        <input name="cardId" type="hidden" value={data.challenge.card.id} />
        <input
          disabled={lesson.state === "ask"}
          name="answer"
          type="hidden"
          value={
            lesson.actionData.status === "validate"
              ? lesson.actionData.answer
              : ""
          }
        />
        <h2>
          {lesson.statusText} - {data.progress} left
        </h2>
        <Simple inputRef={inputRef} />
        <Button
          ref={buttonRef}
          disabled={
            lesson.state === "loadingValidate" || lesson.state === "loadingAsk"
          }
          type="submit"
        >
          {lesson.buttonText}
        </Button>
      </Form>
    </div>
  );
}

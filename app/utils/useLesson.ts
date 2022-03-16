import { useActionData, useTransition } from "remix";

import type { ActionData } from "~/routes/$id/learn";

export function useLesson() {
  const actionData = useActionData<ActionData>() ?? { status: "ask" };
  const transition = useTransition();

  const state: "ask" | "loadingValidate" | "validate" | "loadingAsk" =
    transition.state === "submitting" && actionData.status === "ask"
      ? "loadingValidate"
      : (transition.state === "submitting" &&
          actionData.status === "validate") ||
        (transition.state === "loading" && actionData.status === "ask")
      ? "loadingAsk"
      : (transition.state === "idle" && actionData.status === "validate") ||
        (transition.state === "loading" && actionData.status === "validate")
      ? "validate"
      : "ask";

  let buttonText: string;
  let statusText: string;

  switch (state) {
    case "ask":
      buttonText = "Check";
      statusText = "Submit your answer";
      break;
    case "loadingValidate":
      buttonText = "Checking...";
      statusText = "Checking...";
      break;
    case "validate":
      buttonText = "Continue";
      statusText =
        actionData.status === "validate" && actionData.isCorrect
          ? "🎉 Yay Well Done!"
          : "😭 Oh no!";
      break;
    case "loadingAsk":
      buttonText = "Loading...";
      statusText = "Loading next card...";
      break;
    default:
      buttonText = `Unknown ${state}`;
      statusText = `Unknown ${state}`;
      break;
  }

  return { actionData, state, buttonText, statusText };
}

import { PrismaClient } from "@prisma/client";
import { useEffect, useRef } from "react";
import { ActionFunction, json, LoaderFunction } from "remix";
import { Link, useActionData, useTransition, Form } from "remix";
import invariant from "tiny-invariant";

const prisma = new PrismaClient();

type ActionData = {
  status: "success" | "error";
  feedback: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const answer = formData.get("answer");

  if (Math.random() > 0.5) {
    return json<ActionData>({ status: "error", feedback: "Incorrect" });
  }

  return json<ActionData>({ status: "success", feedback: "Correct" });
};

type LoaderData = {};

export const loader: LoaderFunction = async () => {
  const deck = await prisma.deck.findFirst();

  invariant(deck, "No deck found");

  const;
};

export default function Newsletter() {
  const actionData = useActionData<ActionData>();

  return (
    <main className="max-w-xl mx-auto p-8">
      <Form replace method="post">
        <h1>Quiz!</h1>

        <p>Don't miss any of the action!</p>

        <input required name="answer" className="w-full" type="text" />
        <button type="submit">Submit</button>

        <p>{actionData?.feedback}</p>
      </Form>
    </main>
  );
}

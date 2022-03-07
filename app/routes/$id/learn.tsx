import { XIcon } from "@heroicons/react/outline";
import { Form, json, LoaderFunction, useLoaderData } from "remix";
import { notFound } from "remix-utils";

import { Input } from "~/components/Input";
import { Deck, getDeck } from "~/models/deck.server";

type LoaderData = {
  deck: Deck;
};

export const loader: LoaderFunction = async ({ params }) => {
  const deck = await getDeck(params.id as string);

  if (!deck) {
    throw notFound("deck not found");
  }

  return json<LoaderData>({ deck });
};

export default function LearnDeckPage() {
  const data = useLoaderData<LoaderData>();

  return (
    <Form className="prose mx-auto p-8" method="post" replace>
      <h1>Learn</h1>
      <Input>
        <Input.Label>{data.deck.quiz[0].front}</Input.Label>
        <Input.Field name="answer" type="text" />
      </Input>
    </Form>
  );
}

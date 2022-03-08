import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActionFunction,
  Form,
  json,
  Link,
  LoaderFunction,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { notFound } from "remix-utils";
import invariant from "tiny-invariant";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { prisma } from "~/db.server";
import { getCard } from "~/models/card.server";
import { Deck, getDeck } from "~/models/deck.server";
import { classNames } from "~/utils/classNames";
import { getFormData } from "~/utils/getFormData";
import { getGrade, practiceCard } from "~/utils/supermemo";

const plans = [
  {
    name: "Hobby",
    ram: "8GB",
    cpus: "4 CPUs",
    disk: "160 GB SSD disk",
    price: "$40",
  },
  {
    name: "Startup",
    ram: "12GB",
    cpus: "6 CPUs",
    disk: "256 GB SSD disk",
    price: "$80",
  },
  {
    name: "Business",
    ram: "16GB",
    cpus: "8 CPUs",
    disk: "512 GB SSD disk",
    price: "$160",
  },
  {
    name: "Enterprise",
    ram: "32GB",
    cpus: "12 CPUs",
    disk: "1024 GB SSD disk",
    price: "$240",
  },
];

function Example() {
  const [selected, setSelected] = useState(plans[0]);

  return (
    <RadioGroup onChange={setSelected} value={selected}>
      <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
      <div className="grid grid-cols-2 gap-4">
        {plans.map((plan, index) => (
          <RadioGroup.Option
            key={plan.name}
            className={({ checked, active }) =>
              classNames(
                checked ? "border-transparent" : "border-gray-300",
                active ? "border-sky-500 ring-2 ring-sky-500" : "",
                "relative block cursor-pointer rounded-lg border bg-white px-4 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between",
              )
            }
            value={plan}
          >
            {({ active, checked }) => (
              <>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-800"
                  >
                    {index + 1}
                  </span>
                  <RadioGroup.Label
                    as="p"
                    className="m-0 text-sm font-medium text-gray-900"
                  >
                    {plan.name}
                  </RadioGroup.Label>
                </div>

                <div
                  aria-hidden
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-sky-500" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg",
                  )}
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
type ActionData =
  | {
      status: "ask";
    }
  | {
      status: "validate";
      isCorrect: boolean;
    };

export const action: ActionFunction = async ({ request }) => {
  const { answer, cardId, status } = await getFormData(request, [
    "answer",
    "cardId",
    "status",
  ] as const);

  const card = await getCard(cardId);

  invariant(card, "card is not defined");

  const grade = getGrade(card, answer);

  switch (status) {
    case "ask": {
      return json<ActionData>({ status: "validate", isCorrect: grade > 2 });
    }
    case "validate": {
      const { interval, repetition, easiness, dueDate } = practiceCard(
        card,
        grade,
      );

      await prisma.card.update({
        data: { interval, repetition, easiness, dueDate },
        where: { id: card.id },
      });

      return json<ActionData>({ status: "ask" });
    }
    default: {
      return new Response("invalid status", { status: 400 });
    }
  }
};

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
  const actionData = useActionData<ActionData>();
  const data = useLoaderData<LoaderData>();
  const transition = useTransition();

  const status = useMemo<ActionData>(
    () => actionData || { status: "ask" },
    [actionData],
  );

  let buttonText: string;

  if (status.status === "ask") {
    if (transition.state === "submitting") {
      buttonText = "Checking";
    } else {
      buttonText = "Check";
    }
  } else {
    buttonText = "Continue";
  }

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status.status === "ask") {
      inputRef.current?.focus();
      formRef.current?.reset();
    }

    if (status.status === "validate") {
      buttonRef.current?.focus();
    }
  }, [status]);

  const card = data.deck.quiz[0];

  if (!card) {
    return (
      <div className="prose mx-auto p-8">
        <h1>All done!</h1>
        <Link to="/">Back home</Link>
      </div>
    );
  }

  return (
    <Form ref={formRef} className="prose mx-auto p-8" method="post" replace>
      <h1>Learn</h1>

      <input
        disabled={status.status === "ask"}
        name="answer"
        type="hidden"
        value="blah"
      />
      <input name="cardId" type="hidden" value={card.id} />
      <input name="status" type="hidden" value={status.status} />

      {status.status === "validate" && (
        <p>{status.isCorrect ? "Yay well done!" : "Oh no :("}</p>
      )}

      {/* <Example /> */}
      <Input>
        <Input.Label>
          {transition.state === "loading" ? "..." : card.front}
        </Input.Label>
        <input
          ref={inputRef}
          className={classNames(
            "mt-1 block w-full rounded-md shadow-sm sm:text-sm",
            // eslint-disable-next-line no-nested-ternary
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

      <hr />

      {status.status === "validate" && !status.isCorrect && (
        <p>Correct answer: {card.back} </p>
      )}

      <Button ref={buttonRef} type="submit">
        {buttonText}
      </Button>
    </Form>
  );
}

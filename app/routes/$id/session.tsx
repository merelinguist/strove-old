import faker from "@faker-js/faker";
import { Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  useLoaderData,
  useTransition,
} from "remix";
import { notFound } from "remix-utils";

import { Button } from "~/components/Button";
import { prisma } from "~/db.server";

export const action: ActionFunction = async () => {
  const card = await prisma.card.findFirst();

  if (!card) {
    throw notFound({ card });
  }

  return prisma.answer.create({ data: { correctness: 1, cardId: card.id } });
};

export const loader: LoaderFunction = async () => {
  return prisma.answer.count();
};

export default function SessionPage() {
  const [count, setCount] = useState(useLoaderData<number>());
  const transition = useTransition();

  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (transition.state === "idle") {
      setCount((c) => c * 2);
    }
  }, [transition]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [count]);

  return (
    <Transition
      enter="ease-out duration-300"
      enterFrom="opacity-0 sm:scale-95"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 sm:scale-100"
      leaveTo="opacity-0 sm:scale-95"
      show={transition.state === "idle"}
    >
      <div className="mx-auto max-w-7xl py-10 sm:px-6 lg:px-8">
        <Form
          ref={formRef}
          className="mx-auto max-w-2xl space-y-6 rounded-lg py-6 px-4  sm:px-6 "
          method="post"
          replace
        >
          <div>
            <h3 className="text-lg font-medium leading-6">{count}</h3>

            <div className="mt-2 ">
              <textarea
                ref={textareaRef}
                className="block w-full resize-none rounded-md border-gray-300  shadow-sm focus:border-sky-500 focus:ring-sky-500"
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();

                    document.querySelector("button")?.click();
                  }
                }}
                rows={4}
              />
            </div>
          </div>
          <div className="border-t pt-6">
            <Button size="large" type="submit">
              Check
            </Button>
          </div>
        </Form>
      </div>
    </Transition>
  );
}

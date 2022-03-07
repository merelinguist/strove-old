import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon, XIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/solid";
/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { json, LoaderFunction, useLoaderData } from "remix";
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

export default function QuizPage() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <nav className="border-b">
        <div className="mx-auto grid max-w-7xl grid-cols-3 px-4 py-6 sm:px-6 lg:px-8">
          <div className="col-span-2 sm:col-span-1 sm:col-start-2 sm:text-center">
            <p className="font-semibold">{data.deck.name}</p>
          </div>
          <div className="flex justify-end">
            <button
              className="flex-shrink-0 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              type="button"
            >
              <span className="sr-only">Close panel</span>
              <XIcon aria-hidden className="h-6 w-6 flex-shrink-0" />
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl sm:mt-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid min-h-[24rem] max-w-2xl grid-rows-2 p-4 shadow-sm sm:rounded-lg sm:border sm:p-6 lg:max-w-4xl">
          <div>
            <p className="text-gray-500">Definition</p>
            <h5 className="mt-2 text-lg font-medium">{data.deck.name}</h5>
          </div>
          <div className="flex items-end">
            <div className="flex">
              <Input>
                <Input.Field type="text" />
              </Input>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

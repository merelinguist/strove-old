import { uuidv7 } from "@kripod/uuidv7";
import { useEffect, useState } from "react";
import { Form, Link } from "remix";
import { route } from "routes-gen";

import { Button } from "~/components/Button";
import { Header } from "~/components/Header";
import { Input } from "~/components/Input";
import { Main } from "~/components/Main";

export { action } from "~/containers/NewDeck/NewDeck.server";

export default function NewDeckRoute() {
  const [cards, setCards] = useState([
    "0621fce7-6351-7000-81a0-942005cd6bca",
    "0621fce7-6351-7001-8900-8367587950f5",
    "0621fce7-6351-7002-bd7a-bdaa0d57b6ff",
  ]);

  useEffect(() => {
    function handleFocusIn() {
      function isLastCardFocused() {
        const inputElement = document.activeElement;

        if (!inputElement || inputElement?.nodeName !== "INPUT") {
          return false;
        }

        const parentElement = inputElement.parentElement?.parentElement;

        if (!parentElement) {
          return false;
        }

        const [frontOrBack, ...rest] = inputElement.id.split("-");
        const card = rest.join("-");

        if (frontOrBack !== "back" || card !== cards[cards.length - 1]) {
          return false;
        }

        return true;
      }

      if (isLastCardFocused()) {
        setCards([...cards, uuidv7()]);
      }
    }

    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [cards]);

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <Header
        title="Project Settings"
        description="Let’s get started by filling in the information below to create your new project."
      />
      <Main>
        <Form replace method="post" className="space-y-6">
          <Input>
            <Input.Label>Deck Name</Input.Label>
            <Input.Field type="text" name="name" required />
          </Input>

          <div>
            <h2 className="text-sm font-medium text-gray-700">Cards</h2>
            <div className="mt-2 space-y-4">
              {cards.map((card) => (
                <div
                  id={card}
                  key={card}
                  className="isolate flex -space-x-px rounded-md shadow-sm"
                >
                  <div className="relative w-full rounded-md rounded-r-none border border-gray-300 px-6 py-3 focus-within:z-10 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                    <label
                      htmlFor={`front-${card}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Front
                    </label>
                    <input
                      type="text"
                      name="front"
                      id={`front-${card}`}
                      className="mt-1 block w-full border-0 p-0 focus:ring-0"
                    />
                  </div>
                  <div className="relative w-full rounded-md rounded-l-none border border-gray-300 px-6 py-3 focus-within:z-10 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                    <label
                      htmlFor={`back-${card}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Back
                    </label>
                    <input
                      type="text"
                      name="back"
                      id={`back-${card}`}
                      className="mt-1 block w-full border-0 p-0 focus:ring-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="white" as={Link} to={route("/")}>
              Cancel
            </Button>
            <Button type="submit">Create this project</Button>
          </div>
        </Form>
      </Main>
    </div>
  );
}

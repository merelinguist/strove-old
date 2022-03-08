import type { ActionFunction, MetaFunction } from "remix";
import { Form, redirect } from "remix";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";
import { getFormData } from "~/utils/getFormData";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const { name, cards } = await getFormData(request, [
    "name",
    "cards",
  ] as const);

  const deck = await prisma.deck.create({
    data: {
      name,
      userId,
      cards: {
        createMany: {
          data: cards.split("\n").map((line) => ({
            front: line.split("\t")[0],
            back: line.split("\t")[1],
          })),
        },
      },
    },
  });

  return redirect(deck.id);
};

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function Index() {
  return (
    <div className="prose mx-auto p-8">
      <h1>Notes</h1>

      <Form className="space-y-6" method="post">
        <Input>
          <Input.Label>Name</Input.Label>
          <Input.Field name="name" type="text" />
        </Input>

        <Input>
          <Input.Label>Cards</Input.Label>
          <textarea
            className="mt-1 block w-full font-mono"
            name="cards"
            onKeyDown={(event) => {
              if (event.key === "Tab") {
                const textarea = document.querySelector("textarea");

                if (!textarea) {
                  return;
                }

                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;

                textarea.value = `${textarea.value.substring(
                  0,
                  start,
                )}\t${textarea.value.substring(end)}`;

                textarea.selectionStart = start + 1;
                textarea.selectionEnd = start + 1;

                event.preventDefault();
              }
            }}
            rows={8}
          />
        </Input>

        <Button type="submit">Create</Button>
      </Form>
    </div>
  );
}

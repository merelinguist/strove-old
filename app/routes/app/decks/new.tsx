import { ActionFunction, Form, Link, LoaderFunction, redirect } from "remix";
import { route } from "routes-gen";

import { Button } from "~/components/Button";
import { Header } from "~/components/Header";
import { Input } from "~/components/Input";
import { Main } from "~/components/Main";
import { prisma } from "~/db.server";
import { requireUser } from "~/models/user.server";
import { getFormData } from "~/utils/getFormData";

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request, route("/login"));

  const { name } = await getFormData(request, ["name"] as const);

  const deck = await prisma.deck.create({
    data: { name, userId: user.id },
  });

  return redirect(route("/app/decks/:id", { id: deck.id }));
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request, route("/login"));

  return {};
};

export default function NewDeckRoute() {
  return (
    <div className="mx-auto max-w-lg space-y-10">
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

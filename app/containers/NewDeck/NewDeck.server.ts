import { ActionFunction, LoaderFunction, redirect } from "remix";
import { route } from "routes-gen";

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

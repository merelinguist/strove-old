import { ActionFunction, LoaderFunction, redirect } from "remix";
import { route } from "routes-gen";

import { prisma } from "~/db.server";
import { requireUser } from "~/models/user.server";
import { getFormData } from "~/utils/getFormData";

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request, route("/login"));

  const { name, formData } = await getFormData(request, ["name"] as const);

  const fronts = formData.getAll("front");
  const backs = formData.getAll("back");

  const cards = fronts.flatMap((front, index) => {
    const back = backs[index];

    if (typeof front !== "string" || typeof back !== "string") {
      return [];
    }

    if (front.trim().length === 0 || back.trim().length === 0) {
      return [];
    }

    return { front, back };
  });

  const deck = await prisma.deck.create({
    data: { name, userId: user.id, cards: { createMany: { data: cards } } },
  });

  return redirect(route("/app/decks/:id", { id: deck.id }));
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request, route("/login"));

  return {};
};

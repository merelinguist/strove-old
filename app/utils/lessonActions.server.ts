import { json, redirect } from "remix";
import { serverError } from "remix-utils";
import { compareTwoStrings } from "string-similarity";

import { prisma } from "~/db.server";
import { getLesson } from "~/models/lesson.server";
import type { ActionData } from "~/routes/$id/learn";

export async function ask({
  cardId,
  answer,
}: {
  cardId: FormDataEntryValue | null;
  answer: FormDataEntryValue | null;
}) {
  if (typeof cardId !== "string") {
    throw serverError({
      message: "formData.get('cardId') is not a string",
    });
  }

  if (typeof answer !== "string") {
    throw serverError({
      message: "formData.get('answer') is not a string",
    });
  }

  const card = await prisma.card.findUnique({ where: { id: cardId } });

  if (!card) {
    throw serverError({ message: `cannot find card with id ${cardId}` });
  }

  const isCorrect = compareTwoStrings(answer, card.back) > 0.6;

  return json<ActionData>({
    status: "validate",
    answer,
    isCorrect,
  });
}

export async function validate({
  id,
  cardId,
  answer,
}: {
  id: string;
  cardId: FormDataEntryValue | null;
  answer: FormDataEntryValue | null;
}) {
  if (typeof cardId !== "string") {
    throw serverError({
      message: "formData.get('cardId') is not a string",
    });
  }

  if (typeof answer !== "string") {
    throw serverError({
      message: "formData.get('answer') is not a string",
    });
  }

  const card = await prisma.card.findUnique({ where: { id: cardId } });

  if (!card) {
    throw serverError({ message: `cannot find card with id ${cardId}` });
  }

  const lesson = await getLesson(id);

  const isCorrect = compareTwoStrings(answer, card.back) > 0.6;

  if (isCorrect) {
    await Promise.all([
      prisma.answer.create({
        data: {
          correctness: 0.5,
          cardId: card.id,
        },
      }),
      prisma.lesson.update({
        data: {
          cards: {
            set: lesson.cards
              .map((lessonCard) => ({ id: lessonCard.id }))
              .filter((lessonCard) => lessonCard.id !== card.id),
          },
        },
        where: { id: lesson.id },
      }),
    ]);
  } else {
    const cards = lesson.cards.map((lessonCard) => ({
      id: lessonCard.id,
    }));

    await Promise.all([
      prisma.answer.create({
        data: {
          correctness: 0.5,
          cardId: card.id,
        },
      }),
      prisma.lesson.update({
        data: {
          cards: {
            set: cards
              .filter((lessonCard) => lessonCard.id !== card.id)
              .concat(cards.filter((lessonCard) => lessonCard.id === card.id)),
          },
        },
        where: { id: lesson.id },
      }),
    ]);
  }

  return json<ActionData>({ status: "ask" });
}

export async function finish({ id }: { id: string }) {
  await prisma.lesson.delete({ where: { deckId: id } });

  return redirect(id);
}

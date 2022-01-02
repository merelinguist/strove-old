import type { Card, Response } from "~/utils/prisma.server";
import { score } from "~/utils/score";

export const getDailyLesson = (cards: (Card & { responses: Response[] })[]) => {
	const sortedCards = [...cards].sort(
		(cardA, cardB) => score(cardA.responses) - score(cardB.responses),
	);

	const newCards = sortedCards.filter((card) => card.responses.length === 0);
	const review = sortedCards.filter((card) => card.responses.length > 0);

	return { new: newCards, review, all: [...newCards, ...review] };
};

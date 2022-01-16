import { score } from "~/utils/deck/score";
import type { Answer, Card } from "~/utils/server/db.server";

export const getDailyLesson = (cards: (Card & { answers: Answer[] })[]) => {
	const sortedCards = [...cards].sort(
		(cardA, cardB) => score(cardA.answers) - score(cardB.answers),
	);

	const newCards = sortedCards.filter((card) => card.answers.length === 0);
	const review = sortedCards.filter((card) => card.answers.length > 0);

	return { new: newCards, review, all: [...newCards, ...review] };
};

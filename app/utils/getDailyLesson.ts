import { Card, Response } from "~/utils/prisma.server";
import { score } from "~/utils/score";

export const getDailyLesson = (cards: (Card & { responses: Response[] })[]) => {
	const newToday = cards.filter(
		(card) =>
			card.responses.length === 1 &&
			new Date(card.responses[0].createdAt).getDate() === new Date().getDate(),
	).length;

	const reviewedToday = cards.filter(
		(card) =>
			card.responses.length > 1 &&
			new Date(card.responses[0].createdAt).getDate() === new Date().getDate(),
	).length;

	const newCards = cards
		.filter((card) => card.responses.length === 0)
		.slice(0, 10 - newToday);

	const review = cards
		.filter((card) => card.responses.length > 0)
		.filter((card) =>
			card.responses
				.map((response) => new Date(response.createdAt).getTime())
				.includes(new Date().getTime()),
		)
		.sort((cardA, cardB) => score(cardA.responses) - score(cardB.responses))
		.slice(0, 10 - reviewedToday);

	return { new: newCards, review, all: [...newCards, ...review] };
};

import type { Answer } from "~/utils/server/db.server";

const TAO = 1000 * 60 * 60 * 24;

export const score = (answers: Answer[]) => {
	if (answers.length === 0) {
		return -1;
	}

	const weightedSum = answers
		.map(
			(answer) =>
				answer.correctness *
				Math.exp(
					(new Date(answer.createdAt).getTime() - new Date().getTime()) / TAO,
				),
		)
		.reduce((previousAnswer, currentAnswer) => previousAnswer + currentAnswer);

	return weightedSum / answers.length;
};

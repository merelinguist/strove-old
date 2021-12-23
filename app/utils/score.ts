import { Response } from "~/utils/prisma.server";

const TAO = 1000 * 60 * 60 * 24;

export const score = (responses: Response[]) => {
	if (responses.length === 0) {
		return -1;
	}

	const now = Date.now();

	const weightedSum = responses
		.map(
			(response) =>
				response.correctness *
				Math.exp((new Date(response.createdAt).getTime() - now) / TAO),
		)
		.reduce(
			(previousResponse, currentResponse) => previousResponse + currentResponse,
		);

	return weightedSum / responses.length;
};

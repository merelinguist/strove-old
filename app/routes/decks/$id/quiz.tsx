import { Card } from "@prisma/client";
import { useEffect, useRef } from "react";
import {
	ActionFunction,
	Form,
	json,
	LoaderFunction,
	redirect,
	useActionData,
	useLoaderData,
	useTransition,
} from "remix";
import { z } from "zod";

import { compareTwoStrings } from "~/utils/compareTwoStrings";
import { prisma } from "~/utils/prisma.server";
import { score } from "~/utils/score";

const getCurrentCard = async (deckId: string | undefined) => {
	const deck = await prisma.deck.findUnique({
		where: { id: deckId },
		include: { cards: { include: { responses: true } } },
	});

	if (!deck) {
		throw new Error("Deck not found");
	}

	deck.cards.sort(
		(cardA, cardB) => score(cardA.responses) - score(cardB.responses),
	);

	return deck.cards[0];
};

export const action: ActionFunction = async ({ request, params }) => {
	const formData = await request.formData();

	const card = await getCurrentCard(params.id);

	if (!card) {
		throw Error("No card found");
	}

	const result = z.string().min(1).safeParse(formData.get("response"));

	if (!result.success) {
		return json(result.error.issues.map((issue) => issue.message).join(". "), {
			status: 400,
		});
	}

	const correctness = compareTwoStrings(result.data, card.back);

	await prisma.response.create({
		data: {
			correctness,
			cardId: card.id,
		},
	});

	return redirect(request.url);
};

export const loader: LoaderFunction = async ({ params }) => {
	const card = await getCurrentCard(params.id);

	if (!card) {
		throw new Error("Card not found");
	}

	return json({ card });
};

export default function QuizRoute() {
	const actionMessage = useActionData<string>();
	const data = useLoaderData<{ card: Card }>();
	const transition = useTransition();

	const answerRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (answerRef.current) {
			answerRef.current.value = "";
			answerRef.current.select();
		}
	}, [transition.state]);

	return (
		<>
			<h1>Translate this word:</h1>
			<Form method="post" replace>
				{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
				<label className="block">
					<span className="text-gray-700">{data.card.front}</span>
					<input
						ref={answerRef}
						className="block mt-1 w-full"
						name="response"
						type="text"
					/>
				</label>
				{actionMessage && <p>{actionMessage}</p>}
				{transition.state === "submitting" && <p>Submitting...</p>}
			</Form>
		</>
	);
}

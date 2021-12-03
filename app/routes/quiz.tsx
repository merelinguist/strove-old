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
} from "remix";
import { z } from "zod";

import { compareTwoStrings } from "~/utils/compareTwoStrings";
import { db } from "~/utils/db.server";
import { storage } from "~/utils/session.server";

const getCardId = async (request: Request) => {
	const session = await storage.getSession(request.headers.get("Cookie"));

	const cardId = session.get("cardId");

	if (!cardId || typeof cardId !== "string") {
		return null;
	}

	return cardId;
};

const Response = (back: Card["back"]) =>
	z
		.string()
		.min(1)
		.refine(
			(response) =>
				compareTwoStrings(response, back) > 0.5 || response.length === 0,
			(response) => ({ message: `Sorry, ${response} is not right` }),
		);

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	const cardId = await getCardId(request);

	if (!cardId) {
		throw Error("No cardId found");
	}

	const card = await db.card.findUnique({ where: { id: cardId } });

	if (!card) {
		throw Error("No card found");
	}

	const result = Response(card.back).safeParse(formData.get("response"));

	if (!result.success) {
		return json(result.error.issues.map((issue) => issue.message).join(". "), {
			status: 400,
		});
	}

	await db.response.create({
		data: {
			correctness: compareTwoStrings(result.data, card.back),
			cardId: card.id,
		},
	});

	return redirect("/quiz");
};

export const loader: LoaderFunction = async ({ request }) => {
	const cards = await db.card.findMany({ include: { responses: true } });

	const card = cards.sort(
		(cardA, cardB) => cardA.responses.length - cardB.responses.length,
	)[0];

	const session = await storage.getSession(request.headers.get("Cookie"));

	session.set("cardId", card.id);

	return json(card, {
		headers: {
			"Set-Cookie": await storage.commitSession(session),
		},
	});
};

export default function QuizRoute() {
	const actionMessage = useActionData<string>();
	const card = useLoaderData<Card>();

	const answerRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (actionMessage && answerRef.current) {
			answerRef.current.select();
		}
	}, [actionMessage]);

	return (
		<>
			<h1>What is more useful when it is broken?</h1>
			<pre>{JSON.stringify(card, null, 2)}</pre>
			<pre>{JSON.stringify(actionMessage, null, 2)}</pre>
			<Form method="post">
				{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
				<label className="block">
					<span className="text-gray-700">{card.front}</span>
					<input className="block mt-1 w-full" name="response" type="text" />
				</label>
			</Form>
		</>
	);
}

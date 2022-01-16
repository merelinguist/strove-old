import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import {
	ActionFunction,
	Link,
	LoaderFunction,
	redirect,
	useCatch,
} from "remix";
import { z } from "zod";

import { CardEditor } from "~/components/CardEditor";
import { auth } from "~/utils/server/auth.server";
import { db } from "~/utils/server/db.server";

export const loader: LoaderFunction = async ({ request }) =>
	auth.isAuthenticated(request, { failureRedirect: "/login" });

const Cards = z.array(z.object({ front: z.string(), back: z.string() }));

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	const fields = Array.from(formData).map(([key, value]) => ({ [key]: value }));

	const halfLength = Math.floor(fields.length / 2);

	const front = fields.slice(0, halfLength);
	const back = fields.slice(halfLength, fields.length);

	const result = Cards.safeParse(
		front.map((child, index) => ({ ...child, ...back[index] })),
	);

	if (!result.success) {
		throw new Error(
			'cards must be an array of objects with "front" and "back" keys',
		);
	}

	const user = await auth.isAuthenticated(request, {
		failureRedirect: "/login",
	});

	const cards = result.data.filter(
		(card) => card.front.length > 0 && card.back.length > 0,
	);

	const deck = await db.deck.create({
		data: {
			name: "Basics",
			userId: user.id,
			cards: { createMany: { data: cards } },
		},
	});

	return redirect(`/decks/${deck.id}`);
};

export default function NewDeckRoute() {
	const cardsRef = useRef<HTMLDivElement>(null);

	const [cards, setCards] = useState([
		{ id: nanoid(), front: "puer", back: "puer" },
		{ id: nanoid(), front: "puella", back: "girl" },
	]);

	return (
		<form className="bg-gray-50 max-w-3xl space-y-10 mx-auto p-8" method="post">
			<div ref={cardsRef} className="space-y-10">
				{cards.map((card, index) => (
					<CardEditor
						key={card.id}
						card={card}
						cards={cards}
						cardsRef={cardsRef}
						index={index}
						setCards={setCards}
					/>
				))}
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}

export function CatchBoundary() {
	const caught = useCatch();

	if (caught.status === 401) {
		return (
			<div className="error-container">
				<p>You must be logged in to create a deck.</p>
				<Link to="/login?redirectTo=/jokes/new">Login</Link>
			</div>
		);
	}

	throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

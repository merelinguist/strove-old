import {
	ActionFunction,
	Form,
	LoaderFunction,
	useActionData,
	useLoaderData,
} from "remix";

import { storage } from "~/utils/session.server";

const getCardSession = (request: Request) =>
	storage.getSession(request.headers.get("Cookie"));

const getCardId = async (request: Request) => {
	const session = await getCardSession(request);

	const cardId = session.get("cardId");

	if (!cardId || typeof cardId !== "string") {
		return null;
	}

	return cardId;
};

export const action: ActionFunction = async ({ request }) => {
	const cardId = await getCardId(request);

	return cardId;
};

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getCardSession(request);

	session.set("cardId", "cardId");

	return session.get("cardId");
};

export default function QuizRoute() {
	const actionMessage = useActionData<string>();
	const card = useLoaderData<string>();

	return (
		<>
			<h1>What is more useful when it is broken?</h1>
			<pre>{JSON.stringify(card, null, 2)}</pre>
			<pre>{JSON.stringify(actionMessage, null, 2)}</pre>
			<Form method="post">
				<button type="submit">Submit</button>
			</Form>
		</>
	);
}

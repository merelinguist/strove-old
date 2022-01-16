import {
	ActionFunction,
	Form,
	json,
	LoaderFunction,
	useLoaderData,
} from "remix";

import { Input } from "~/components/Input";
import { useLoginModal } from "~/components/LoginModal";
import { auth, sessionStorage } from "~/utils/server/auth.server";

export const action: ActionFunction = async ({ request }) => {
	await auth.authenticate("form", request, {
		successRedirect: "/decks",
		failureRedirect: "/login",
	});
};

type LoaderData = {
	error: { message: string } | null;
};

export const loader: LoaderFunction = async ({ request }) => {
	const session = await sessionStorage.getSession(
		request.headers.get("Cookie"),
	);

	const error = session.get(auth.sessionErrorKey) as LoaderData["error"];

	return json<LoaderData>({ error });
};

export default function LoginRoute() {
	const { error } = useLoaderData<LoaderData>();
	const { toggle } = useLoginModal();

	return (
		<Form className="max-w-lg mx-auto p-8 space-y-6" method="post">
			<p>{JSON.stringify(error)}</p>
			<Input>
				<Input.Field name="email" type="email" />
			</Input>

			<Input>
				<Input.Field name="password" type="password" />
			</Input>

			<button onClick={toggle} type="submit">
				Sign In
			</button>
		</Form>
	);
}

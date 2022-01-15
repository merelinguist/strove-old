import { XCircleIcon } from "@heroicons/react/solid";
import {
	ActionFunction,
	Form,
	json,
	LoaderFunction,
	useLoaderData,
} from "remix";

import { Input } from "~/components/Input";
import { useLoginModal } from "~/components/LoginModal";
import { auth, sessionStorage } from "~/utils/auth.server";

export const action: ActionFunction = async ({ request }) => {
	return auth.authenticate("form", request, {
		successRedirect: "/dashboard",
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

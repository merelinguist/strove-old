import bcrypt from "bcryptjs";
import { ActionFunction, Form } from "remix";
import invariant from "tiny-invariant";

import { Input } from "~/components/Input";
import { auth } from "~/utils/server/auth.server";
import { db } from "~/utils/server/db.server";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	const email = formData.get("email");
	const password = formData.get("password");

	invariant(typeof email === "string");
	invariant(typeof password === "string");

	const hashedPassword = await bcrypt.hash(password, 10);

	await db.user.create({ data: { email, hashedPassword } });

	await auth.authenticate(
		"form",
		new Request("", {
			method: "POST",
			body: new URLSearchParams({
				email,
				password,
			}),
		}),
		{
			successRedirect: "/decks",
			failureRedirect: "/login",
		},
	);
};

export default function RegisterRoute() {
	return (
		<Form className="max-w-lg mx-auto p-8 space-y-6" method="post" replace>
			<h1 className="text-xl font-medium">Register</h1>
			<Input>
				<Input.Label>Email</Input.Label>
				<Input.Field name="email" type="email" />
			</Input>
			<Input>
				<Input.Label>Password</Input.Label>
				<Input.Field name="password" type="password" />
			</Input>
			<button type="submit">Register</button>
		</Form>
	);
}

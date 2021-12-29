import { ActionFunction, Form } from "remix";
import invariant from "tiny-invariant";

import { Input } from "~/components/Input";
import { prisma } from "~/utils/prisma.server";
import { createUserSession } from "~/utils/session.server";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	const email = formData.get("email");
	const password = formData.get("password");

	invariant(typeof email === "string");
	invariant(typeof password === "string");

	const hashedPassword = password;

	const user = await prisma.user.create({ data: { email, hashedPassword } });

	return createUserSession(user.id, "/");
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

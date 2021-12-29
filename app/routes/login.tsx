import { ActionFunction, Form, Link } from "remix";
import invariant from "tiny-invariant";

import { Input } from "~/components/Input";
import { prisma } from "~/utils/prisma.server";
import { routes } from "~/utils/routes";
import { createUserSession } from "~/utils/session.server";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	const email = formData.get("email");
	const password = formData.get("password");

	invariant(typeof email === "string", "Email must be a string");
	invariant(typeof password === "string", "Password must be a string");

	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) {
		throw new Error("User not found");
	}

	console.log(password, user.hashedPassword);

	const isCorrectPassword = password === user.hashedPassword;

	if (!isCorrectPassword) {
		throw new Error("Incorrect password");
	}

	return createUserSession(user.id, "/");
};

export default function RegisterRoute() {
	return (
		<Form className="max-w-lg mx-auto p-8 space-y-6" method="post" replace>
			<h1 className="text-xl font-medium">Login</h1>
			<Input>
				<Input.Label>Email</Input.Label>
				<Input.Field name="email" type="email" />
			</Input>
			<Input>
				<Input.Label>Password</Input.Label>
				<Input.Field name="password" type="password" />
			</Input>
			<button type="submit">Login</button>

			<Link className="block underline" to={routes.forgotPassword}>
				Forgot password?
			</Link>
		</Form>
	);
}

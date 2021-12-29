import { nanoid } from "nanoid";
import { ActionFunction, Form } from "remix";
import invariant from "tiny-invariant";

import { Input } from "~/components/Input";
import { prisma, TokenType } from "~/utils/prisma.server";
import { sha256 } from "~/utils/sha256.server";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	const email = formData.get("email");

	invariant(typeof email === "string", "Email must be a string");

	const user = await prisma.user.findUnique({
		where: { email },
	});

	const token = nanoid(32);
	const hashedToken = sha256(token);
	const expiresAt = new Date();

	expiresAt.setHours(expiresAt.getHours() + 4);

	if (user) {
		await prisma.token.deleteMany({
			where: { type: TokenType.RESET_PASSWORD, userId: user.id },
		});

		await prisma.token.create({
			data: {
				hashedToken,
				type: TokenType.RESET_PASSWORD,
				expiresAt,
				sentTo: user.email,
				user: { connect: { id: user.id } },
			},
		});

		// eslint-disable-next-line no-console
		console.log(
			`Hey ${user.email}, you can reset your password by visiting: http://localhost:3000/reset-password?token=${token}`,
		);
	} else {
		// eslint-disable-next-line no-promise-executor-return
		await new Promise((resolve) => setTimeout(resolve, 750));
	}

	return null;
};

export default function ForgotPasswordRoute() {
	return (
		<Form className="max-w-lg mx-auto p-8 space-y-6" method="post" replace>
			<h1 className="text-xl font-medium">Forgot Password</h1>
			<Input>
				<Input.Label>Email</Input.Label>
				<Input.Field name="email" type="email" />
			</Input>
			<button type="submit">Submit</button>
		</Form>
	);
}

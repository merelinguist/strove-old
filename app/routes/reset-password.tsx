import bcrypt from "bcryptjs";
import {
	ActionFunction,
	Form,
	json,
	LoaderFunction,
	useLoaderData,
} from "remix";
import invariant from "tiny-invariant";

import { Input } from "~/components/Input";
import { prisma, TokenType } from "~/utils/prisma.server";
import { createUserSession } from "~/utils/session.server";
import { sha256 } from "~/utils/sha256.server";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	const token = formData.get("token");
	const password = formData.get("password");

	invariant(typeof token === "string", "Token must be a string");
	invariant(typeof password === "string", "Password must be a string");

	const hashedToken = sha256(token);

	const possibleToken = await prisma.token.findFirst({
		where: { hashedToken, type: TokenType.RESET_PASSWORD },
		include: { user: true },
	});

	if (!possibleToken) {
		throw new Error("Reset password link is invalid or it has expired.");
	}

	const savedToken = possibleToken;

	await prisma.token.delete({ where: { id: savedToken.id } });

	if (savedToken.expiresAt < new Date()) {
		throw new Error("Reset password link is invalid or it has expired.");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.update({
		where: { id: savedToken.userId },
		data: { hashedPassword },
	});

	return createUserSession(user.id, "/");
};

type LoaderData = {
	token: string;
};

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const token = url.searchParams.get("token");

	invariant(token, "Token must be a string");

	return json<LoaderData>({ token });
};

export default function ForgotPasswordRoute() {
	const data = useLoaderData<LoaderData>();

	return (
		<Form className="max-w-lg mx-auto p-8 space-y-6" method="post" replace>
			<h1 className="text-xl font-medium">Reset Password</h1>
			<input name="token" type="hidden" value={data.token} />
			<Input>
				<Input.Label>Password</Input.Label>
				<Input.Field name="password" type="password" />
			</Input>
			<button type="submit">Submit</button>
		</Form>
	);
}

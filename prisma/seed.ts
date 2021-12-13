import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();

const getTitleAndBody = (text: string) => {
	const titleMatch = /^#+(.*)$/;

	const lines = text.split("\n");

	const notEmptyLines = lines.filter((line) => line.length > 0);

	if (notEmptyLines.length === 0) {
		throw new Error("no content");
	}

	const firstLine = notEmptyLines[0];

	const match = firstLine.match(titleMatch);

	if (match === null) {
		throw new Error("no title found");
	}

	const title = match?.[1];

	const body = lines.slice(2).join("\n");

	return { title: title.trim(), body };
};

const getEntries = (): Promise<{
	title: string;
	body: string;
}>[] =>
	Array(10)
		.fill({})
		.map(async () => {
			const res = await fetch(
				"https://jaspervdj.be/lorem-markdownum/markdown.txt",
			);

			const text = await res.text();

			const { title, body } = getTitleAndBody(text);

			return { title, body };
		});

const seed = async () => {
	await prisma.response.deleteMany();
	await prisma.card.deleteMany();
	await prisma.deck.deleteMany();
	await prisma.entry.deleteMany();
	await prisma.task.deleteMany();

	const me = await prisma.user.upsert({
		where: { email: "me@here.com" },
		update: {},
		create: {
			name: "Me Here",
			email: "me@here.com",
			hashedPassword:
				"$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
		},
	});

	const entries = await Promise.all(getEntries());

	await Promise.all(
		entries.map((entry, index) => {
			return prisma.entry.create({
				data: {
					...entry,
					createdAt: new Date(index),
					userId: me.id,
				},
			});
		}),
	);

	// eslint-disable-next-line no-console
	console.log(`Database has been seeded. 🌱`);
};

seed();

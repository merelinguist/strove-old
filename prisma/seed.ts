import { PrismaClient } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();

const getDecks: () => { name: string }[] = () =>
	Array(10)
		.fill({})
		.map(() => ({ name: faker.animal.type() }));

const getCards: () => { front: string; back: string }[] = () =>
	Array(15)
		.fill({})
		.map(() => {
			const animal = faker.animal.type();

			return { front: animal, back: animal };
		});

const seed = async () => {
	await prisma.card.deleteMany();
	await prisma.deck.deleteMany();

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

	await Promise.all(
		getDecks().map((deck) => {
			return prisma.deck.create({
				data: {
					...deck,
					userId: me.id,
					cards: { createMany: { data: getCards() } },
				},
			});
		}),
	);

	// eslint-disable-next-line no-console
	console.log(`Database has been seeded. 🌱`);
};

seed();

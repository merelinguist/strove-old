import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCards = () => {
	return [
		{ front: "ut", back: "as" },
		{ front: "sum", back: "I" },
		{ front: "eius", back: "his" },
		{ front: "quod", back: "that" },
		{ front: "ipse", back: "he" },
		{ front: "fuit", back: "was" },
		{ front: "nam", back: "for" },
		{ front: "in", back: "on" },
		{ front: "sunt,", back: "are" },
		{ front: "cum", back: "with" },
		{ front: "illi", back: "they" },
		{ front: "esse", back: "be" },
		{ front: "at", back: "at" },
		{ front: "unum", back: "one" },
		{ front: "habent", back: "have" },
		{ front: "hoc", back: "this" },
		{ front: "de", back: "from" },
		{ front: "by", back: "by" },
		{ front: "calidum", back: "hot" },
		{ front: "verbo,", back: "word" },
		{ front: "sed", back: "but" },
		{ front: "quod", back: "what" },
		{ front: "aliqua", back: "some" },
		{ front: "est", back: "is" },
		{ front: "quod", back: "it" },
		{ front: "vos,", back: "you" },
		{ front: "vel", back: "or" },
		{ front: "quod", back: "had" },
		{ front: "in", back: "the" },
		{ front: "de", back: "of" },
		{ front: "ut", back: "to" },
		{ front: "et", back: "and" },
		{ front: "a", back: "a" },
		{ front: "in", back: "in" },
		{ front: "nos", back: "we" },
		{ front: "potest", back: "can" },
		{ front: "ex", back: "out" },
		{ front: "alia", back: "other" },
		{ front: "erant", back: "were" },
		{ front: "quibus", back: "which" },
		{ front: "facite", back: "do" },
		{ front: "eorum", back: "their" },
		{ front: "tempore", back: "time" },
		{ front: "si", back: "if" },
		{ front: "voluntas", back: "will" },
		{ front: "quam", back: "how" },
		{ front: "Dixitque", back: "said" },
		{ front: "an", back: "an" },
		{ front: "quisque", back: "each" },
		{ front: "indica", back: "tell" },
	];
};

const seed = async () => {
	await prisma.response.deleteMany();
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

	await prisma.deck.create({
		data: {
			name: "Basics",
			userId: me.id,
			cards: { createMany: { data: getCards() } },
		},
	});

	await prisma.deck.create({
		data: {
			name: "Phrases",
			userId: me.id,
			cards: { createMany: { data: getCards() } },
		},
	});

	// eslint-disable-next-line no-console
	console.log(`Database has been seeded. 🌱`);
};

seed();

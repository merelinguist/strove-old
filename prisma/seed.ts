import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCards = () => {
  return [
    { front: "familia", back: "household" },
    { front: "est", back: "is" },
    { front: "pater", back: "father" },
    { front: "mater", back: "mother" },
    { front: "filius", back: "son" },
    { front: "filia", back: "daughter" },
    { front: "servus", back: "slate" },
    { front: "coquus", back: "cook" },
    { front: "canis", back: "dog" },
    { front: "in tablino", back: "in the study" },
  ];
};

const seed = async () => {
  await prisma.answer.deleteMany();
  await prisma.card.deleteMany();
  await prisma.deck.deleteMany();
  await prisma.user.deleteMany();

  const me = await prisma.user.create({
    data: {
      name: "Me Here",
      email: "me@here.com",
      hashedPassword:
        "$2a$10$bZ6jmws4iINdyl6m7rDZ3OxdO6fTje8/y9fF5NRaOsvonHLkkrWem",
    },
  });

  await prisma.deck.create({
    data: {
      name: "Basics",
      userId: me.id,
      cards: { createMany: { data: getCards() } },
    },
    include: { cards: true },
  });

  await prisma.deck.create({
    data: {
      name: "Phrases",
      userId: me.id,
      cards: { createMany: { data: getCards() } },
    },
  });

  await prisma.deck.create({
    data: {
      name: "French",
      userId: me.id,
      cards: { createMany: { data: getCards() } },
    },
  });
};

seed();

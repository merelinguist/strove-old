import { Card, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.answer.deleteMany();
  await prisma.card.deleteMany();
  await prisma.deck.deleteMany();

  const email = "me@here.com";

  const me = await prisma.user.upsert({
    create: {
      email,
      password: "$2b$12$VSy8oq0VOcSiNCiH1oBfIuLBoS6LaAywIl2XfAOiWKI5MaqAzZoy.",
    },
    update: {},
    where: { email },
  });

  const deck = await prisma.deck.create({
    data: { name: "Basics", user: { connect: { id: me.id } } },
  });

  const cards: Prisma.Prisma__CardClient<Card>[] = [];

  for (let index = 0; index < 100; index += 1) {
    const first = Math.floor(Math.random() * 5 + 1);
    const second = Math.floor(Math.random() * 5 + 1);

    const front = `${first} + ${second}`;
    const back = `${first + second}`;

    cards.push(
      prisma.card.create({
        data: { front, back, deck: { connect: { id: deck.id } } },
      }),
    );
  }

  await Promise.all(cards);
};

seed();

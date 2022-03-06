import { faker } from "@faker-js/faker";
import { Card, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
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
    data: { name: "Basics", userId: me.id },
  });

  const cards: Prisma.Prisma__CardClient<Card>[] = [];

  for (let index = 0; index < 100; index += 1) {
    const animal = faker.animal.type();

    cards.push(
      prisma.card.create({
        data: { front: animal, back: animal, deckId: deck.id },
      }),
    );
  }

  await Promise.all(cards);
};

seed();

import { faker } from "@faker-js/faker";
import bcrypt from "@node-rs/bcrypt";
import { Card, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const email = "me@here.com";
  const hash = await bcrypt.hash("mysupergoodpassword", 10);

  const me = await prisma.user.upsert({
    create: {
      email,
      password: {
        create: {
          hash,
        },
      },
    },
    update: {},
    where: { email },
  });

  const deck = await prisma.deck.create({
    data: { name: "Basics", userId: me.id },
  });

  const cards: Prisma.Prisma__CardClient<Card>[] = [];

  for (let index = 0; index < 20; index += 1) {
    const animal = faker.animal.type();

    cards.push(
      prisma.card.create({
        data: { front: animal, back: animal, deckId: deck.id },
      }),
    );
  }

  await Promise.all(cards);
}

try {
  seed().then(() => {
    process.exit(0);
  });
} catch (error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
}

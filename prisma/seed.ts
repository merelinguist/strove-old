import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.answer.deleteMany();
  await prisma.card.deleteMany();
  await prisma.deck.deleteMany();
  // await prisma.user.deleteMany()

  // const deck = await prisma.deck.create({ data: { name: "Basics" } });

  // for (let index = 0; index < 100; index++) {
  //   const first = Math.floor(Math.random() * 10 + 1);
  //   const second = Math.floor(Math.random() * 10 + 1);

  //   const front = `${first} + ${second}`;
  //   const back = `${first + second}`;

  //   await prisma.card.create({
  //     data: { front, back, deck: { connect: { id: deck.id } } },
  //   });
  // }
};

seed();

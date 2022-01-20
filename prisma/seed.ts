import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.note.deleteMany();
  await prisma.text.deleteMany();
  await prisma.user.deleteMany();

  const me = await prisma.user.create({
    data: {
      name: "Me Here",
      email: "me@here.com",
      hashedPassword:
        "$2a$10$bZ6jmws4iINdyl6m7rDZ3OxdO6fTje8/y9fF5NRaOsvonHLkkrWem",
    },
  });

  const text = await prisma.text.create({
    data: {
      name: "Medea",
      body: `Jack and Jill went up the hill.

To fetch a pail of water.

Some other sentence???·`,
      notes: {
        createMany: {
          data: [
            { start: 0, end: 5, body: "inchresting", userId: me.id },
            { start: 3, end: 10, body: "inchresting", userId: me.id },
            { start: 20, end: 30, body: "inchresting", userId: me.id },
            { start: 100, end: 200, body: "inchresting", userId: me.id },
          ],
        },
      },
    },
  });
};

seed();

type Merge<T, U> = Omit<T, keyof U> & U;

type PropsWithAs<P, T extends React.ElementType> = P & { as?: T };

export type Props<P, T extends React.ElementType> = Merge<
  T extends keyof JSX.IntrinsicElements
    ? React.PropsWithoutRef<JSX.IntrinsicElements[T]>
    : React.ComponentPropsWithoutRef<T>,
  PropsWithAs<P, T>
>;

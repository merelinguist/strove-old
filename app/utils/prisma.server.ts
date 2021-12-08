import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

const logThreshold = 50;

type Color = "red" | "green" | "blue" | "yellow" | "redBright";

const generatePrismaClient = () => {
	const client = new PrismaClient({
		log: [
			{ level: "query", emit: "event" },
			{ level: "error", emit: "stdout" },
			{ level: "info", emit: "stdout" },
			{ level: "warn", emit: "stdout" },
		],
	});

	client.$on("query", (event) => {
		if (event.duration < logThreshold) {
			return;
		}

		let color: Color = "red";

		if (event.duration < 100) {
			color = "redBright";
		}

		if (event.duration < 80) {
			color = "yellow";
		}

		if (event.duration < 50) {
			color = "blue";
		}

		if (event.duration < 30) {
			color = "green";
		}

		const duration = chalk[color](`${event.duration}ms`);

		// eslint-disable-next-line no-console
		console.log(`prisma:query - ${duration} - ${event.query}`);
	});

	// eslint-disable-next-line no-void
	void client.$connect();

	return client;
};

const prismaClientPropertyName = `__prevent-name-collision__prisma`;

type GlobalThisWithPrismaClient = typeof globalThis & {
	[prismaClientPropertyName]: PrismaClient;
};

const getPrismaClient = () => {
	if (process.env.NODE_ENV === "production") {
		return generatePrismaClient();
	}

	const newGlobalThis = globalThis as GlobalThisWithPrismaClient;

	if (!newGlobalThis[prismaClientPropertyName]) {
		newGlobalThis[prismaClientPropertyName] = generatePrismaClient();
	}

	return newGlobalThis[prismaClientPropertyName];
};

export * from "@prisma/client";

export const prisma = getPrismaClient();

import { getMap } from "~/utils/getMap";

export const compareTwoStrings = (aString: string, bString: string): number => {
	const a = aString.replace(/\s+/g, "");
	const b = bString.replace(/\s+/g, "");

	if (!(a.length || b.length)) {
		return 1;
	}

	if (!(a.length && b.length)) {
		return 0;
	}

	if (a === b) {
		return 1;
	}

	if (a.length === 1 && b.length === 1) {
		return 0;
	}

	if (a.length < 2 || b.length < 2) {
		return 0;
	}

	const firstBigrams: Map<string, number> = new Map();

	for (let i = 0; i < a.length - 1; i += 1) {
		const bigram = a.substring(i, i + 2);

		const count = firstBigrams.has(bigram)
			? getMap(firstBigrams, bigram) + 1
			: 1;

		if (count === undefined) {
			throw new Error("Already used has() above");
		}

		firstBigrams.set(bigram, count);
	}

	let intersectionSize = 0;

	for (let i = 0; i < b.length - 1; i += 1) {
		const bigram = b.substring(i, i + 2);

		const count = getMap(firstBigrams, bigram, 0);

		if (count === undefined) {
			throw new Error("Already used has() above");
		}

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize += 1;
		}
	}

	return (2 * intersectionSize) / (a.length + b.length - 2);
};

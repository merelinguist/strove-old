const getMap = <Key, Value>(
	map: Map<Key, NonNullable<Value>>,
	key: Key,
	defaultValue?: NonNullable<Value>,
) => {
	const existing = map.get(key);

	if (existing === undefined) {
		if (defaultValue === undefined) {
			throw new Error("Key didn't exist and no defaultValue passed");
		}

		map.set(key, defaultValue);

		return defaultValue;
	}

	return existing;
};

export const compareTwoStrings = (aString: string, bString: string) => {
	// eslint-disable-next-line id-length
	const stringA = aString.replace(/\s+/g, "");
	// eslint-disable-next-line id-length
	const stringB = bString.replace(/\s+/g, "");

	if (!(stringA.length || stringB.length)) {
		return 1;
	}

	if (!(stringA.length && stringB.length)) {
		return 0;
	}

	if (stringA === stringB) {
		return 1;
	}

	// Both are 1-letter strings
	if (stringA.length === 1 && stringB.length === 1) {
		return 0;
	}

	// If either is a 1-letter string
	if (stringA.length < 2 || stringB.length < 2) {
		return 0;
	}

	const firstBigrams: Map<string, number> = new Map();

	for (let index = 0; index < stringA.length - 1; index += 1) {
		const bigram = stringA.substring(index, index + 2);

		const count = firstBigrams.has(bigram)
			? getMap(firstBigrams, bigram) + 1
			: 1;

		if (count === undefined) {
			throw new Error("Already used has() above");
		}

		firstBigrams.set(bigram, count);
	}

	let intersectionSize = 0;

	for (let index = 0; index < stringB.length - 1; index += 1) {
		const bigram = stringB.substring(index, index + 2);

		const count = getMap(firstBigrams, bigram, 0);

		if (count === undefined) {
			throw new Error("Already used has() above");
		}

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize += 1;
		}
	}

	return (2 * intersectionSize) / (stringA.length + stringB.length - 2);
};

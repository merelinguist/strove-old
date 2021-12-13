export const genericSearch = <T>(
	object: T,
	properties: Array<keyof T>,
	query: string,
): boolean => {
	if (query === "") {
		return true;
	}

	return properties.some((property) => {
		const value = object[property];

		if (typeof value === "string" || typeof value === "number") {
			return value.toString().toLowerCase().includes(query.toLowerCase());
		}

		return false;
	});
};

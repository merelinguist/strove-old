export type GenericSortOptions<T> = {
	property: Extract<keyof T, string | number | Date>;
	isDescending: boolean;
};

export const genericSort = <T>(
	objectA: T,
	objectB: T,
	sorter: GenericSortOptions<T>,
) => {
	const result = () => {
		if (objectA[sorter.property] > objectB[sorter.property]) {
			return 1;
		}

		if (objectA[sorter.property] < objectB[sorter.property]) {
			return -1;
		}

		return 0;
	};

	return sorter.isDescending ? result() * -1 : result();
};

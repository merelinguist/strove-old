export const routes = {
	index: "/",
	journal: {
		index: "/journal",
		show: (id: string) => `/journal/${id}`,
	},
};

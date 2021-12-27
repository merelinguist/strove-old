export const routes = {
	index: "/",
	decks: {
		index: "/decks",
		lesson: (id: string) => `/decks/${id}/lesson`,
	},
};

export const routes = {
	index: "/",
	decks: {
		index: "/decks",
		show: (id: string) => `/decks/${id}`,
		quiz: (id: string) => `/decks/${id}/quiz`,
	},
};

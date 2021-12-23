export const routes = {
	index: "/",
	decks: {
		index: "/",
		learn: (id: string) => `/decks/${id}/learn`,
	},
};

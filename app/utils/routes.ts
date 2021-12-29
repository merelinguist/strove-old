export const routes = {
	decks: {
		lesson: (id: string) => `/decks/${id}/lesson`,
		index: "/decks",
	},
	components: "/components",
	forgotPassword: "/forgot-password",
	index: "/",
	login: "/login",
	logout: "/logout",
	me: "/me",
	register: "/register",
	resetPassword: "/reset-password",
};

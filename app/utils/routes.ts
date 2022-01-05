export const routes = {
	decks: {
		id: {
			lesson: (id: string) => `/decks/${id}/lesson`,
		},
		index: "/decks",
		new: "/decks/new",
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

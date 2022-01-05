import { useEffect } from "react";

import { useRevalidate } from "~/utils/hooks/useRevalidate";

export const useRevalidateOnFocus = () => {
	const revalidate = useRevalidate();

	useEffect(() => {
		const onFocus = () => {
			revalidate();
		};

		window.addEventListener("focus", onFocus);

		return () => window.removeEventListener("focus", onFocus);
	}, [revalidate]);

	useEffect(
		function revalidateOnVisibilityChange() {
			const onVisibilityChange = () => {
				revalidate();
			};

			window.addEventListener("visibilitychange", onVisibilityChange);

			return () =>
				window.removeEventListener("visibilitychange", onVisibilityChange);
		},
		[revalidate],
	);
};

import { SSRProvider } from "@react-aria/ssr";
import Inspect from "inspx";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import { useEffect } from "react";
import { LinksFunction, Outlet, useTransition } from "remix";

import { Document } from "~/components/Document";
import styles from "~/styles.css";

export const links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: styles },
		{ rel: "stylesheet", href: nProgressStyles },
	];
};

export default function App() {
	const transition = useTransition();

	useEffect(() => {
		if (transition.state === "idle") {
			NProgress.done();
		} else {
			NProgress.start();
		}
	}, [transition.state]);

	return (
		<Document>
			<SSRProvider>
				<Inspect>
					<Outlet />
				</Inspect>
			</SSRProvider>
		</Document>
	);
}

import { SSRProvider } from "@react-aria/ssr";
import Inspect from "inspx";
import { LinksFunction, Outlet } from "remix";

import { Document } from "~/components/Document";
import styles from "~/styles.css";
import { useNProgress } from "~/utils/useNProgress";
import { useSplitbee } from "~/utils/useSplitbee";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: styles }];
};

export default function App() {
	useNProgress();
	useSplitbee();

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

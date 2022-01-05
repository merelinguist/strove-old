import { SSRProvider } from "@react-aria/ssr";
import Inspect from "inspx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LinksFunction, Outlet } from "remix";

import { Document } from "~/components/Document";
import styles from "~/styles.css";
import { useNProgress } from "~/utils/hooks/useNProgress";
import { useSplitbee } from "~/utils/hooks/useSplitbee";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: styles }];
};

export default function App() {
	useNProgress();

	useSplitbee();

	return (
		<Document>
			<SSRProvider>
				<DndProvider backend={HTML5Backend}>
					<Inspect>
						<Outlet />
					</Inspect>
				</DndProvider>
			</SSRProvider>
		</Document>
	);
}

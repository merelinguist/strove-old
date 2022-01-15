import { SSRProvider } from "@react-aria/ssr";
import Inspect from "inspx";
import { LinksFunction, Outlet } from "remix";

import { Document } from "~/components/Document";
import { LoginModal, LoginModalProvider } from "~/components/LoginModal";
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
				<LoginModalProvider>
					<Inspect>
						<Outlet />
						{/* <LoginModal /> */}
					</Inspect>
				</LoginModalProvider>
			</SSRProvider>
		</Document>
	);
}

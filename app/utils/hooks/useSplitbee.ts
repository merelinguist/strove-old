import splitbee from "@splitbee/web";
import { useEffect } from "react";

export const useSplitbee = () => {
	useEffect(() => {
		if (process.env.NODE_ENV === "production") {
			splitbee.init();
		}
	}, []);
};

import splitbee from "@splitbee/web";
import { useEffect } from "react";

export const useSplitbee = () => {
	useEffect(() => {
		splitbee.init();
	}, []);
};

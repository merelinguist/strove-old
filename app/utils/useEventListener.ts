import { useEffect } from "react";

import { EventMap } from "~/types";
import { managedEventListener } from "~/utils/managedEventListener";
import { useEventCallback } from "~/utils/useEventCallback";

export const useEventListener = <
	T extends EventTarget,
	K extends keyof EventMap<T> & string,
>(
	target: T,
	type: K,
	callback: (event: EventMap<T>[K]) => void,
	options?: AddEventListenerOptions,
): void => {
	const savedCallback = useEventCallback(callback);

	useEffect(
		() => managedEventListener(target, type, savedCallback, options),
		[options, savedCallback, target, type],
	);
};

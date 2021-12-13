import { useCallback, useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export const useEventCallback = <T extends Function>(
	callback: T,
): ((...args: unknown[]) => T) => {
	const ref = useRef<T>();

	useEffect(() => {
		ref.current = callback;
	}, [callback]);

	return useCallback((...args): T => ref.current?.(...args), [ref]);
};

const __BROWSER__ = typeof document !== "undefined";

const __APPLE_OS__ =
	__BROWSER__ && /^(Mac|iPhone|iPad|iPod)/.test(navigator.platform);

type ModifierKey = "CmdOrCtrl" | "Ctrl" | "Meta" | "Alt" | "Shift";

type KeyboardEventBase = Pick<
	KeyboardEvent,
	| "key"
	| "keyCode"
	| "ctrlKey"
	| "metaKey"
	| "altKey"
	| "shiftKey"
	| "preventDefault"
>;

export const captureKeys = (
	...keys: [
		modifierKey: ModifierKey,
		...restKeys: Array<string & (ModifierKey | {})>
	]
): ((event: KeyboardEventBase) => boolean) => {
	const setOfKeys = new Set(keys);

	const expectsCtrlKey =
		setOfKeys.delete("Ctrl") ||
		(!__APPLE_OS__ && setOfKeys.delete("CmdOrCtrl"));

	const expectsMetaKey =
		setOfKeys.delete("Meta") || (__APPLE_OS__ && setOfKeys.delete("CmdOrCtrl"));

	const expectsShiftKey = setOfKeys.delete("Shift");
	const expectsAltKey = setOfKeys.delete("Alt");

	const expectedKey =
		setOfKeys.size === 1 ? setOfKeys.values().next().value.toUpperCase() : null;

	return (event) => {
		if (
			event.ctrlKey !== expectsCtrlKey ||
			event.metaKey !== expectsMetaKey ||
			event.shiftKey !== expectsShiftKey ||
			event.altKey !== expectsAltKey ||
			(event.key.length > 1
				? event.key
				: String.fromCharCode(event.keyCode).toUpperCase()) !== expectedKey
		) {
			return false;
		}

		event.preventDefault();

		return true;
	};
};

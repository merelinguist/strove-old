import { json as remixJson } from "remix";

import { JSONValue } from "~/types";

export const json = <Data extends JSONValue>(
	data: Data,
	init?: number | ResponseInit,
) => remixJson(data, init);

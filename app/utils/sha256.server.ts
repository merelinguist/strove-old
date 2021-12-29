import { createHash } from "crypto";

export const sha256 = (string: string) =>
	createHash("sha256").update(string).digest("hex");

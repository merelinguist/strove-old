const defaultAvatarSize = 128;
import md5 from "md5-hash";

export const getAvatar = (
	email: string,
	{ size = defaultAvatarSize }: { size?: number } = {},
) => {
	const hash = md5(email);
	const url = new URL(`https://www.gravatar.com/avatar/${hash}`);

	url.searchParams.set("size", String(size));

	return url.toString();
};

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// eslint-disable-next-line import/prefer-default-export
export const loader = async () => {
	await sleep(2000);

	return null;
};

export default function IndexRoute() {
	return null;
}

// import { LoaderFunction, useLoaderData } from "remix";
// import { Pre } from "~/components/Pre";
// import { className } from "~/utils/className";
// import { User, Log, prisma } from "~/utils/prisma.server";

// type LoaderData = { user: User & { logs: Log[] } };

// export const loader: LoaderFunction = async () => {
// 	let user = await prisma.user.findUnique({
// 		where: { email: "me@here.com" },
// 		include: { logs: true },
// 	});

// 	if (!user) {
// 		throw new Error("User not found");
// 	}

// 	return { user };
// };

// const JournalRoute = () => {
// 	const { user } = useLoaderData<LoaderData>();

// 	const months = [
// 		"January",
// 		"February",
// 		"March",
// 		"April",
// 		"May",
// 		"June",
// 		"July",
// 		"August",
// 		"September",
// 		"October",
// 		"November",
// 		"December",
// 	];

// 	const sortedLogs: Array<{ name: string; logs: Array<Log> }> = [];

// 	user.logs.map((log) => {
// 		const month = months[new Date(log.createdAt).getMonth()];

// 		const monthObject = sortedLogs.find(
// 			(logsByMonth) => logsByMonth.name === month,
// 		);

// 		if (monthObject === undefined) {
// 			sortedLogs.push({
// 				name: month,
// 				logs: [log],
// 			});

// 			return;
// 		}

// 		monthObject.logs.push(log);
// 	});

// 	return (
// 		<div className={className("flex flex-col")}>
// 	);
// };

// export default JournalRoute;

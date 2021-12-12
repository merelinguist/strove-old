import {
	LoaderFunction,
	useLoaderData,
	Link,
	Outlet,
	NavLink,
	useParams,
} from "remix";
import { classNames } from "~/utils/classNames";
import { genericSort } from "~/utils/genericSort";
import { User, Entry, prisma } from "~/utils/prisma.server";
import { stripMarkdown } from "~/utils/stripMarkdown";

type LoaderData = { user: User & { entries: Entry[] } };

export const loader: LoaderFunction = async () => {
	const user = await prisma.user.findUnique({
		where: { email: "me@here.com" },
		include: { entries: true },
	});

	if (!user) {
		throw new Error("User not found");
	}

	return { user };
};
// "block py-3 lg:py-2 px-3.5 space-y-1 rounded-lg hover:bg-gray-200"

const IndexRoute = () => {
	const { user } = useLoaderData<LoaderData>();
	const { id } = useParams();

	const isActive = (entry: Entry) => entry.id === id;

	return (
		<div className="flex h-screen">
			<div className="w-72 border-r">Hello</div>
			<div className="flex-1 flex">
				<div className="w-80 border-r p-3 space-y-1 overflow-y-auto">
					{user.entries
						.sort((entryA, entryB) =>
							genericSort<Entry>(entryA, entryB, {
								property: "createdAt",
								isDescending: true,
							}),
						)
						.map((entry) => (
							<NavLink
								key={entry.id}
								className={({ isActive }) =>
									classNames(
										isActive ? "bg-black" : "bg-white hover:bg-gray-200",
										"block py-3 lg:py-2 px-3.5 space-y-1 rounded-lg",
									)
								}
								to={`/journal/${entry.id}`}
							>
								<p
									className={classNames(
										isActive(entry) ? "text-white" : "",
										"text-sm font-medium",
									)}
								>
									{entry.title}
								</p>
								<p
									className={classNames(
										isActive(entry) ? "text-gray-400" : "text-gray-500",
										"text-sm",
									)}
								>
									{stripMarkdown(entry.body).split("\n")[0]}...
								</p>
								<p
									className={classNames(
										isActive(entry) ? "text-gray-500" : "text-gray-400",
										"text-sm",
									)}
								>
									<time dateTime={new Date(entry.createdAt).toISOString()}>
										{new Date(entry.createdAt).toLocaleDateString("en", {
											day: "numeric",
											month: "short",
											year: "numeric",
										})}
									</time>
								</p>
							</NavLink>
						))}
				</div>
				<div className="flex-1 overflow-y-auto">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default IndexRoute;

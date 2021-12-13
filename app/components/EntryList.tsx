import { NavLink, useParams } from "remix";

import { classNames } from "~/utils/classNames";
import { Entry } from "~/utils/prisma.server";
import { stripMarkdown } from "~/utils/stripMarkdown";

export function EntryList({ entries }: { entries: Entry[] }) {
	const { id } = useParams();

	const isActive = (entry: Entry) => entry.id === id;

	return (
		<>
			{entries.map((entry) => (
				<NavLink
					key={entry.id}
					className={classNames(
						isActive(entry) ? "bg-black" : "bg-white hover:bg-gray-200",
						"block py-3 lg:py-2 px-3.5 space-y-1 rounded-lg",
					)}
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
		</>
	);
}

import { PlusIcon } from "@heroicons/react/solid";
import { useRef } from "react";
import { LoaderFunction, Outlet, useLoaderData } from "remix";

import { EntryList } from "~/components/EntryList";
import { TitleBar } from "~/components/TitleBar";
import { Entry, prisma, User } from "~/utils/prisma.server";

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

function IndexRoute() {
	const { user } = useLoaderData<LoaderData>();

	const scrollContainerRef = useRef<HTMLDivElement>(null);

	return (
		<div className="flex h-screen">
			<div className="w-72 border-r">Hello</div>
			<div className="flex-1 flex">
				<div className="w-80 border-r overflow-y-auto" ref={scrollContainerRef}>
					<TitleBar scrollContainerRef={scrollContainerRef} />
					<div className="p-3 space-y-1">
						<EntryList entries={user.entries} />
					</div>
				</div>
				<div className="flex-1 overflow-y-auto">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default IndexRoute;

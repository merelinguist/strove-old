import {
	BellIcon,
	CogIcon,
	CollectionIcon,
	UserIcon,
} from "@heroicons/react/outline";
import { Outlet } from "remix";

import { classNames } from "~/utils/classNames";
import { useNavigation } from "~/utils/hooks/useNavigation";
import { routes } from "~/utils/routes";

const navigation = [
	{ name: "Activity", icon: BellIcon, href: "#", current: false },
	{
		name: "My decks",
		icon: CollectionIcon,
		href: routes.decks.index,
		current: false,
	},
	{ name: "Profile", icon: UserIcon, href: "#", current: false },
	{ name: "Settings", icon: CogIcon, href: "#", current: false },
];

export default function Example() {
	useNavigation(navigation);

	return (
		<>
			<div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
				<div className="flex flex-col flex-grow pt-5 pb-4 border-r overflow-y-auto">
					<div className="flex items-center flex-shrink-0 px-4 space-y-5">
						<img
							alt="Workflow"
							className="h-7 w-auto"
							src="/img/logos/wordmark.svg"
						/>
					</div>
					<div className="mt-5 flex-grow flex flex-col">
						<nav aria-label="Sidebar" className="flex-1 space-y-1">
							{navigation.map((item) => (
								<a
									key={item.name}
									className={classNames(
										item.current
											? "bg-blue-50 border-blue-600 text-blue-600"
											: "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
										"group flex items-center px-3 py-2 text-sm font-medium border-l-4",
									)}
									href={item.href}
								>
									<item.icon
										aria-hidden
										className={classNames(
											item.current
												? "text-blue-500"
												: "text-gray-400 group-hover:text-gray-500",
											"mr-3 flex-shrink-0 h-5 w-5",
										)}
									/>
									{item.name}
								</a>
							))}
						</nav>
					</div>
				</div>
			</div>
			<div className="md:pl-64 flex flex-col flex-1">
				<main className="flex-1">
					<div className="max-w-7xl py-8 mx-auto px-4 sm:px-6 md:px-8">
						<Outlet />
					</div>
				</main>
			</div>
		</>
	);
}

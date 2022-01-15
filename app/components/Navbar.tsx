import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { Form, NavLink, useLocation } from "remix";

import { classNames } from "~/utils/classNames";
import { useNavigation } from "~/utils/hooks/useNavigation";
import { routes } from "~/utils/routes";

import { Avatar } from "./Avatar";

const user = {
	name: "Tom Cook",
	email: "tom@example.com",
	imageUrl:
		"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [
	{ name: "Dashboard", href: routes.index, current: false },
	{ name: "Me", href: routes.me, current: false },
];

const userNavigation = [
	{ name: "Your Profile", href: "#", current: false },
	{ name: "Settings", href: "#", current: false },
];

export function Navbar() {
	const location = useLocation();

	useNavigation(navigation);
	useNavigation(userNavigation);

	return (
		<Disclosure as="nav" className="bg-blue-600">
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between h-16">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<img
										alt="Strove"
										className="h-8 w-auto"
										src="/img/logos/strove-mark-blue-300.svg"
									/>
								</div>
								<div className="hidden md:block">
									<div className="ml-10 flex items-baseline space-x-4">
										{navigation.map((item) => (
											<NavLink
												key={item.name}
												aria-current={item.current ? "page" : undefined}
												className={classNames(
													item.current
														? "bg-blue-700 text-white"
														: "text-white hover:bg-blue-500 hover:bg-opacity-75",
													"px-3 py-2 rounded-md text-sm font-medium",
												)}
												to={item.href}
											>
												{item.name}
											</NavLink>
										))}
									</div>
								</div>
							</div>
							<div className="hidden md:block">
								<div className="ml-4 flex items-center md:ml-6">
									<button
										className="p-1 bg-blue-600 rounded-full text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
										type="button"
									>
										<span className="sr-only">View notifications</span>
										<BellIcon aria-hidden="true" className="h-6 w-6" />
									</button>

									{/* Profile dropdown */}
									<Menu as="div" className="ml-3 relative">
										<div>
											<Menu.Button className="max-w-xs bg-blue-600 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
												<span className="sr-only">Open user menu</span>
												<Avatar size="small" src={user.imageUrl} />
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
												{userNavigation.map((item) => (
													<Menu.Item key={item.name}>
														{({ active }) => (
															<a
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700",
																)}
																href={item.href}
															>
																{item.name}
															</a>
														)}
													</Menu.Item>
												))}
												<Menu.Item>
													{({ active }) => (
														<Form action={routes.logout} method="post">
															<button
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block w-full text-left px-4 py-2 text-sm text-gray-700",
																)}
																type="submit"
															>
																Logout
															</button>
														</Form>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							</div>
							<div className="-mr-2 flex md:hidden">
								{/* Mobile menu button */}
								<Disclosure.Button className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon aria-hidden="true" className="block h-6 w-6" />
									) : (
										<MenuIcon aria-hidden="true" className="block h-6 w-6" />
									)}
								</Disclosure.Button>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									aria-current={item.current ? "page" : undefined}
									as="a"
									className={classNames(
										item.current
											? "bg-blue-700 text-white"
											: "text-white hover:bg-blue-500 hover:bg-opacity-75",
										"block px-3 py-2 rounded-md text-base font-medium",
									)}
									href={item.href}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
						<div className="pt-4 pb-3 border-t border-blue-700">
							<div className="flex items-center px-5">
								<div className="flex-shrink-0">
									<Avatar src={user.imageUrl} />
								</div>
								<div className="ml-3">
									<div className="text-base font-medium text-white">
										{user.name}
									</div>
									<div className="text-sm font-medium text-blue-300">
										{user.email}
									</div>
								</div>
								<button
									className="ml-auto bg-blue-600 flex-shrink-0 p-1 rounded-full text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
									type="button"
								>
									<span className="sr-only">View notifications</span>
									<BellIcon aria-hidden="true" className="h-6 w-6" />
								</button>
							</div>
							<div className="mt-3 px-2 space-y-1">
								{userNavigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as="a"
										className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-500 hover:bg-opacity-75"
										href={item.href}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}

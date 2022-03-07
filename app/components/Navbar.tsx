import { Menu, Popover, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Link } from "remix";

import { Button } from "~/components/Button";
import { classNames } from "~/utils/classNames";

const user = {
  name: "Chelsea Hagon",
  email: "chelseahagon@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export function Navbar() {
  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <header className="fixed inset-x-0 top-0 z-10 border bg-white/70 lg:overflow-y-visible">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
            <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
              <div className="flex flex-shrink-0 items-center">
                <a href="#">
                  <img
                    alt="Workflow"
                    className="block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=blue&shade=500"
                  />
                </a>
              </div>
            </div>
            <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
              <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                <div className="w-full">
                  <label className="sr-only" htmlFor="search">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <SearchIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-400"
                      />
                    </div>
                    <input
                      className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-sky-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      id="search"
                      name="search"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
              {/* Mobile menu button */}
              <button
                className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
                type="button"
              >
                <span className="sr-only">Open menu</span>

                <MenuIcon aria-hidden="true" className="block h-6 w-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
              <a
                className="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                href="#"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </a>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-5 flex-shrink-0">
                <div>
                  <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      className="h-8 w-8 rounded-full"
                      src={user.imageUrl}
                    />
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block py-2 px-4 text-sm text-gray-700",
                            )}
                            href={item.href}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>

              <div className="ml-6">
                <Button as={Link} to=".">
                  New Deck
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

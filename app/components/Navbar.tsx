import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { FireIcon, SearchIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Form, NavLink } from "remix";

import { classNames } from "~/utils/classNames";

function Logo() {
  return (
    <div className="flex flex-shrink-0 items-center">
      <img
        className="block h-8 w-auto lg:hidden"
        src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
        alt="Strove"
      />
      <img
        className="hidden h-8 w-auto lg:block"
        src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
        alt="Strove"
      />
    </div>
  );
}

function Links() {
  return (
    <div className="hidden sm:-my-px lg:ml-6 lg:flex lg:space-x-8">
      <NavLink
        to="/"
        className={({ isActive }) =>
          classNames(
            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
            isActive
              ? "border-blue-500"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
          )
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          classNames(
            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
            isActive
              ? "border-blue-500"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
          )
        }
      >
        Login
      </NavLink>
    </div>
  );
}

function Search() {
  return (
    <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
      <Form method="get" className="w-full max-w-lg lg:max-w-xs">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            placeholder="Search"
            type="search"
          />
        </div>
      </Form>
    </div>
  );
}

function MenuButton({ open }: { open: boolean }) {
  return (
    <div className="flex items-center lg:hidden">
      <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
        <span className="sr-only">Open main menu</span>
        {open ? (
          <XIcon className="block h-6 w-6" aria-hidden />
        ) : (
          <MenuIcon className="block h-6 w-6" aria-hidden />
        )}
      </Disclosure.Button>
    </div>
  );
}

function NotificationButton() {
  return (
    <button
      type="button"
      className="flex flex-shrink-0 rounded-full bg-white p-1 text-orange-400 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <span className="sr-only">View notifications</span>
      <span>8</span>
      <FireIcon className="h-6 w-6" aria-hidden />
    </button>
  );
}

function ProfileDropdown() {
  return (
    <Menu as="div" className="relative ml-4 flex-shrink-0">
      <div>
        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
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
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700",
                )}
              >
                Your Profile
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700",
                )}
              >
                Settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Form method="post" action="/actions/logout">
                <button
                  type="submit"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block w-full px-4 py-2 text-left text-sm text-gray-700",
                  )}
                >
                  Sign out
                </button>
              </Form>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function MobilePanel() {
  return (
    <Disclosure.Panel className="lg:hidden">
      <div className="space-y-1 pt-2 pb-3">
        {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
        <Disclosure.Button
          as="a"
          href="#"
          className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
        >
          Dashboard
        </Disclosure.Button>
        <Disclosure.Button
          as="a"
          href="#"
          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
        >
          Team
        </Disclosure.Button>
        <Disclosure.Button
          as="a"
          href="#"
          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
        >
          Projects
        </Disclosure.Button>
        <Disclosure.Button
          as="a"
          href="#"
          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
        >
          Calendar
        </Disclosure.Button>
      </div>
      <div className="border-t pt-4 pb-3">
        <div className="flex items-center px-4">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-gray-800">Tom Cook</div>
            <div className="text-sm font-medium text-gray-500">
              tom@example.com
            </div>
          </div>
          <button
            type="button"
            className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 space-y-1">
          <Disclosure.Button
            as="a"
            href="#"
            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          >
            Your Profile
          </Disclosure.Button>
          <Disclosure.Button
            as="a"
            href="#"
            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          >
            Settings
          </Disclosure.Button>
          <Disclosure.Button
            as="a"
            href="#"
            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          >
            Sign out
          </Disclosure.Button>
        </div>
      </div>
    </Disclosure.Panel>
  );
}

export function Navbar() {
  return (
    <Disclosure as="nav" className="border-b">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex px-2 lg:px-0">
                <Logo />
                <Links />
              </div>
              <Search />
              <MenuButton open={open} />
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                <NotificationButton />
                <ProfileDropdown />
              </div>
            </div>
          </div>
          <MobilePanel />
        </>
      )}
    </Disclosure>
  );
}

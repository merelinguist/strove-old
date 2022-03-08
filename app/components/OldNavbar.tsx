import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { FireIcon, SearchIcon } from "@heroicons/react/solid";
import type { User } from "@prisma/client";
import { Fragment } from "react";
import { Form, Link, NavLink } from "remix";
import { route } from "routes-gen";

import { classNames } from "~/utils/classNames";

function Logo() {
  return (
    <div className="flex flex-shrink-0 items-center">
      <img
        alt="Strove"
        className="block h-8 w-auto lg:hidden"
        src="/img/logos/logo.svg"
      />
      <img
        alt="Strove"
        className="hidden h-8 w-auto lg:block"
        src="/img/logos/wordmark.svg"
      />
    </div>
  );
}

function Links() {
  return (
    <div className="hidden sm:-my-px lg:ml-6 lg:flex lg:space-x-8">
      <NavLink
        className={({ isActive }) =>
          classNames(
            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
            isActive
              ? "border-blue-500"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
          )
        }
        to={route("/app")}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          classNames(
            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
            isActive
              ? "border-blue-500"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
          )
        }
        to={route("/login")}
      >
        Login
      </NavLink>
    </div>
  );
}

function Search() {
  return (
    <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
      <Form className="w-full max-w-lg lg:max-w-xs" method="get">
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon aria-hidden className="h-5 w-5 text-gray-400" />
          </div>
          <input
            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            id="search"
            name="search"
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
          <XIcon aria-hidden className="block h-6 w-6" />
        ) : (
          <MenuIcon aria-hidden className="block h-6 w-6" />
        )}
      </Disclosure.Button>
    </div>
  );
}

function NotificationButton() {
  return (
    <button
      className="flex flex-shrink-0 rounded-full bg-white p-1 text-orange-400 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      type="button"
    >
      <span className="sr-only">View notifications</span>
      <span>8</span>
      <FireIcon aria-hidden className="h-6 w-6" />
    </button>
  );
}

function ProfileDropdown({ user }: { user: User }) {
  return (
    <Menu as="div" className="relative ml-4 flex-shrink-0">
      <div>
        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
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
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700",
                )}
                href="#"
              >
                Your Profile ({user.email})
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700",
                )}
                href="#"
              >
                Settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Form
                action={route("/actions/logout")}
                method="post"
                reloadDocument
              >
                <button
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block w-full px-4 py-2 text-left text-sm text-gray-700",
                  )}
                  type="submit"
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

function MobilePanel({ user }: { user: User }) {
  return (
    <Disclosure.Panel className="lg:hidden">
      <div className="space-y-1 pt-2 pb-3">
        {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
        <Disclosure.Button
          as={Link}
          className="block border-l-4 border-blue-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-blue-700"
          to={route("/app")}
        >
          Dashboard
        </Disclosure.Button>
        <Disclosure.Button
          as={Link}
          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          to={route("/app")}
        >
          Team
        </Disclosure.Button>
      </div>
      <div className="border-t pt-4 pb-3">
        <div className="flex items-center px-4">
          <div className="flex-shrink-0">
            <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-gray-800">User</div>
            <div className="text-sm font-medium text-gray-500">
              {user.email}
            </div>
          </div>
          <button
            className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="button"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-3 space-y-1">
          <Disclosure.Button
            as="a"
            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            href="#"
          >
            Your Profile
          </Disclosure.Button>
          <Disclosure.Button
            as="a"
            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            href="#"
          >
            Settings
          </Disclosure.Button>
          <Form action={route("/actions/logout")} method="post" reloadDocument>
            <button
              className="block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              type="submit"
            >
              Sign out
            </button>
          </Form>
        </div>
      </div>
    </Disclosure.Panel>
  );
}

export function Navbar({ user }: { user: User }) {
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
                <ProfileDropdown user={user} />
              </div>
            </div>
          </div>
          <MobilePanel user={user} />
        </>
      )}
    </Disclosure>
  );
}

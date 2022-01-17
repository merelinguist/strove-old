import {
  BellIcon,
  CogIcon,
  CollectionIcon,
  FireIcon,
  LoginIcon,
  LogoutIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { Form, Link } from "remix";

import { classNames } from "~/utils/classNames";
import { useNavigation } from "~/utils/hooks/useNavigation";
import { routes } from "~/utils/routes";
import type { User } from "~/utils/server/db.server";

const getNavigation = (user: User | null) =>
  user
    ? [
        { name: "Activity", icon: BellIcon, href: "#", current: false },
        {
          name: "My decks",
          icon: CollectionIcon,
          href: routes.decks.index,
          current: false,
        },
        {
          name: `Profile (${user.email})`,
          icon: UserIcon,
          href: routes.me,
          current: false,
        },
        { name: "Settings", icon: CogIcon, href: "#", current: false },
        { name: "Streak", icon: FireIcon, href: "#", current: false },
      ]
    : [{ name: "Login", icon: LoginIcon, href: routes.login, current: false }];

export function Sidebar({ user }: { user: User | null }) {
  const navigation = getNavigation(user);

  useNavigation(navigation);

  return (
    <div className="hidden md:flex md:fixed md:inset-y-0 md:flex-col md:w-64">
      <div className="flex overflow-y-auto flex-col grow pt-5 pb-4 border-r">
        <div className="flex shrink-0 items-center px-4 space-y-5">
          <img
            alt="Workflow"
            className="w-auto h-7"
            src="/img/logos/wordmark.svg"
          />
        </div>
        <div className="flex flex-col grow mt-5">
          <nav aria-label="Sidebar" className="flex-1 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                className={classNames(
                  item.current
                    ? "bg-blue-50 border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center px-3 py-2 text-sm font-medium border-l-4",
                )}
                to={item.href}
              >
                <item.icon
                  aria-hidden
                  className={classNames(
                    item.current
                      ? "text-blue-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    item.name === "Streak" ? "text-orange-400" : "",
                    "mr-3 flex-shrink-0 h-5 w-5",
                  )}
                />
                {item.name}
              </Link>
            ))}
            {user && (
              <Form action="/logout" method="post">
                <button
                  className={classNames(
                    "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-3 py-2 text-sm font-medium border-l-4",
                    "w-full",
                  )}
                  type="submit"
                >
                  <LogoutIcon
                    aria-hidden
                    className={classNames(
                      "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-5 w-5",
                    )}
                  />
                  Logout
                </button>
              </Form>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

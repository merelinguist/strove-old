import { ReactNode, useState } from "react";
import { createContainer } from "unstated-next";

import { classNames } from "~/utils/classNames";
import { createMaps } from "~/utils/createMaps";

export const avatarSizeMaps = createMaps({
  extraSmall: "h-6 w-6",
  small: "h-8 w-8",
  default: "h-10 w-10",
  large: "h-12 w-12",
  extraLarge: "h-14 w-14",
  extraExtraLarge: "h-16 w-16",
});

export const statusSizeMaps = createMaps({
  extraSmall: "h-1.5 w-1.5",
  small: "h-2 w-2",
  default: "h-2.5 w-2.5",
  large: "h-3 w-3",
  extraLarge: "h-3.5 w-3.5",
  extraExtraLarge: "h-4 w-4",
});

export const statusStatusMaps = createMaps({
  online: "bg-green-400",
  offline: "bg-gray-300",
  busy: "bg-red-400",
});

const { Provider: AvatarProvider, useContainer: useAvatar } = createContainer(
  (
    initialState: {
      size: keyof typeof avatarSizeMaps;
    } = { size: "default" },
  ) => {
    const [state] = useState(initialState);

    return { state };
  },
);

export function Avatar({
  size = "default",
  src,
  children,
}: {
  size?: keyof typeof avatarSizeMaps;
  src?: string;
  children?: ReactNode;
}) {
  const getAvatar = () => {
    if (src) {
      return (
        <span className="inline-block relative">
          <img
            alt=""
            className={classNames("rounded-full", avatarSizeMaps[size])}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
          {children}
        </span>
      );
    }

    return (
      <span className="relative">
        <span
          className={classNames(
            "inline-block rounded-full overflow-hidden bg-gray-100",
            avatarSizeMaps[size],
          )}
        >
          <svg
            className="w-full h-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
        {children}
      </span>
    );
  };

  return <AvatarProvider initialState={{ size }}>{getAvatar()}</AvatarProvider>;
}

function Status({ status }: { status: keyof typeof statusStatusMaps }) {
  const { state } = useAvatar();

  return (
    <span
      className={classNames(
        "absolute top-0 right-0 block rounded-full ring-2 ring-white",
        statusSizeMaps[state.size],
        statusStatusMaps[status],
      )}
    />
  );
}

Avatar.Status = Status;

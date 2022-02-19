import { XCircleIcon } from "@heroicons/react/solid";

import type { Flash } from "~/session.server";

export function Flasher({ flash }: { flash: Flash | null }) {
  if (!flash) {
    return null;
  }

  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            There were 2 errors with your submission
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc space-y-1 pl-5">
              <li>{flash.message}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

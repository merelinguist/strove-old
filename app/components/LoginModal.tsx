import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  DotsCircleHorizontalIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { createContainer } from "unstated-next";

export const { Provider: LoginModalProvider, useContainer: useLoginModal } =
  createContainer(
    (
      // eslint-disable-next-line @typescript-eslint/no-inferrable-types
      initialState: boolean = true,
    ) => {
      const [isOpen, setIsOpen] = useState(initialState);

      const toggle = () => setIsOpen(!isOpen);

      return { isOpen, toggle };
    },
  );

const features = [
  { icon: ExclamationIcon, title: "Secure" },
  { icon: DotsCircleHorizontalIcon, title: "More soon" },
  { icon: ExclamationIcon, title: "Secure" },
  { icon: ExclamationIcon, title: "Secure" },
];

export function LoginModal() {
  const { isOpen, toggle } = useLoginModal();

  return (
    <Dialog
      className="overflow-y-auto fixed inset-0 z-10"
      onClose={toggle}
      open={isOpen}
    >
      <div className="flex justify-center items-end min-h-screen text-center sm:block">
        <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
        <span
          aria-hidden
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
        >
          &#8203;
        </span>
        <div className="inline-block overflow-hidden w-full text-left align-bottom bg-white rounded-lg divide-y shadow-xl transition-all sm:my-8 sm:max-w-lg sm:align-middle">
          <div className="py-5 px-4 sm:px-6">
            <div className="flex flex-wrap justify-between items-center -mt-2 -ml-4 sm:flex-nowrap">
              <div className="mt-2 ml-4">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                  Deactivate account
                </Dialog.Title>
              </div>
              <div className="shrink-0 mt-2 ml-4">
                <button
                  className="text-gray-400 hover:text-gray-500 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={toggle}
                  type="button"
                >
                  <span className="sr-only">Close</span>
                  <XIcon aria-hidden className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="py-5 px-4 sm:p-6">
            <ul className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <li className="flex flex-col items-center p-2 space-y-2 rounded-lg border">
                  <feature.icon aria-hidden className="w-6 h-6 text-gray-400" />
                  <p className="font-medium">{feature.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

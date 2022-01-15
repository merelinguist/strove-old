import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
	DotsCircleHorizontalIcon,
	ExclamationIcon,
} from "@heroicons/react/solid";
import { Fragment, useState } from "react";
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
			className="fixed z-10 inset-0 overflow-y-auto"
			onClose={toggle}
			open={isOpen}
		>
			<div className="flex items-end justify-center min-h-screen text-center sm:block">
				<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75" />
				<span
					aria-hidden
					className="hidden sm:inline-block sm:align-middle sm:h-screen"
				>
					&#8203;
				</span>
				<div className="inline-block align-bottom divide-y bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
					<div className="px-4 py-5 sm:px-6">
						<div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
							<div className="ml-4 mt-2">
								<Dialog.Title className="text-lg leading-6 font-medium text-gray-900">
									Deactivate account
								</Dialog.Title>
							</div>
							<div className="ml-4 mt-2 flex-shrink-0">
								<button
									className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									onClick={toggle}
									type="button"
								>
									<span className="sr-only">Close</span>
									<XIcon aria-hidden className="h-6 w-6" />
								</button>
							</div>
						</div>
					</div>
					<div className="px-4 py-5 sm:p-6">
						<ul className="grid grid-cols-2 gap-4">
							{features.map((feature) => (
								<li className="border rounded-lg flex flex-col p-2 space-y-2 items-center">
									<feature.icon aria-hidden className="h-6 w-6 text-gray-400" />
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

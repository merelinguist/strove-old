import {
	ActionFunction,
	Form,
	json,
	LoaderFunction,
	useLoaderData,
} from "remix";
import invariant from "tiny-invariant";

import { Input } from "~/components/Input";
import { auth } from "~/utils/server/auth.server";
import { db, User } from "~/utils/server/db.server";

type LoaderData = { user: User };

export const loader: LoaderFunction = async ({ request }) => {
	const user = await auth.isAuthenticated(request, {
		failureRedirect: "/login",
	});

	return json<LoaderData>({ user });
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	const name = formData.get("name");
	const email = formData.get("email");

	invariant(typeof name === "string", "inavariant name");
	invariant(typeof email === "string", "inavariant email");

	const user = await auth.isAuthenticated(request, {
		failureRedirect: "/login",
	});

	await db.user.update({ where: { id: user.id }, data: { name, email } });
};

export default function MeRoute() {
	const data = useLoaderData<LoaderData>();

	return (
		<Form className="mt-6 space-y-8 divide-y" method="post">
			<div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
				<div className="sm:col-span-6">
					<h2 className="text-xl font-medium">Profile</h2>
					<p className="mt-1 text-sm text-gray-500">
						This information will be displayed publicly so be careful what you
						share.
					</p>
				</div>

				<div className="sm:col-span-3">
					<Input>
						<Input.Label>Name</Input.Label>
						<Input.Field
							autoComplete="given-name"
							defaultValue={data.user.name || ""}
							name="name"
							type="text"
						/>
					</Input>
				</div>

				<div className="sm:col-span-6">
					<label className="block text-sm font-medium" htmlFor="photo">
						Photo
					</label>
					<div className="mt-1 flex items-center">
						<img
							alt=""
							className="inline-block h-12 w-12 rounded-full"
							src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
						/>
						<div className="ml-4 flex">
							<div className="relative bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-50 focus-within:ring-blue-500">
								<label
									className="relative text-sm font-medium text-gray-900 pointer-events-none"
									htmlFor="user-photo"
								>
									<span>Change</span>
									<span className="sr-only"> user photo</span>
								</label>
								<input
									className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
									id="user-photo"
									name="user-photo"
									type="file"
								/>
							</div>
							<button
								className="ml-3 bg-transparent py-2 px-3 border border-transparent rounded-md text-sm font-medium text-gray-900 hover:text-gray-700 focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
								type="button"
							>
								Remove
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="pt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
				<div className="sm:col-span-6">
					<h2 className="text-xl font-medium text-gray-900">
						Personal Information
					</h2>
					<p className="mt-1 text-sm text-gray-500">
						This information will be displayed publicly so be careful what you
						share.
					</p>
				</div>

				<div className="sm:col-span-3">
					<Input>
						<Input.Label>Email</Input.Label>
						<Input.Field
							autoComplete="email"
							defaultValue={data.user.email}
							name="email"
							type="email"
						/>
					</Input>
				</div>

				<p className="text-sm text-gray-500 sm:col-span-6">
					This account was created on{" "}
					<time dateTime={new Date(data.user.createdAt).toISOString()}>
						{new Date(data.user.createdAt).toDateString()}
					</time>
					.
				</p>
			</div>

			<div className="pt-8 flex justify-end">
				<button
					className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					type="button"
				>
					Cancel
				</button>
				<button
					className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					type="submit"
				>
					Save
				</button>
			</div>
		</Form>
	);
}

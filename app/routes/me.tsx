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
          <div className="flex items-center mt-1">
            <img
              alt=""
              className="inline-block w-12 h-12 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
            />
            <div className="flex ml-4">
              <div className="flex relative items-center py-2 px-3 bg-white hover:bg-gray-50 rounded-md border border-gray-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-50 shadow-sm cursor-pointer">
                <label
                  className="relative text-sm font-medium text-gray-900 pointer-events-none"
                  htmlFor="user-photo"
                >
                  <span>Change</span>
                  <span className="sr-only"> user photo</span>
                </label>
                <input
                  className="absolute inset-0 w-full h-full rounded-md border-gray-300 opacity-0 cursor-pointer"
                  id="user-photo"
                  name="user-photo"
                  type="file"
                />
              </div>
              <button
                className="py-2 px-3 ml-3 text-sm font-medium text-gray-900 hover:text-gray-700 bg-transparent rounded-md border border-transparent focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                type="button"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
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

      <div className="flex justify-end pt-8">
        <button
          className="py-2 px-4 text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
          type="button"
        >
          Cancel
        </button>
        <button
          className="inline-flex justify-center py-2 px-4 ml-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  );
}

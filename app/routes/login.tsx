import {
  ActionFunction,
  HeadersFunction,
  json,
  Link,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { route } from "routes-gen";

import { Button } from "~/components/Button";
import { login, verifyLogin } from "~/models/user.server";
import { Flash, flash, getSession, sessionStorage } from "~/session.server";
import { getFormData } from "~/utils/getFormData";

export const action: ActionFunction = async ({ request }) => {
  const { email, password } = await getFormData(request, [
    "email",
    "password",
  ] as const);

  const user = await verifyLogin(email, password);

  if (!user) {
    return flash(request, route("/login"), {
      type: "error",
      message: "problem :(",
    });
  }

  return login(request, user.id);
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${
      60 * 60 * 24 * 30
    }`,
  };
};

type LoaderData = {
  flash: Flash | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const { session, flash } = await getSession(request);

  return json<LoaderData>(
    { flash },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
};

export const meta: MetaFunction = () => ({
  title: "Login",
});

export default function LoginPage() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              className="h-12 w-auto"
              src="/img/logos/logo.svg"
              alt="Strove"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <Link
                to={route("/join")}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                create a free account now
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <form method="post" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <Button shape="stretch" type="submit">
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1600195077077-7c815f540a3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2189&q=80"
          alt=""
        />
      </div>
    </div>
  );
}

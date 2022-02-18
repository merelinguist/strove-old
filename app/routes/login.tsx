import { XCircleIcon } from "@heroicons/react/outline";
import {
  ActionFunction,
  HeadersFunction,
  json,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { Form, Link, redirect } from "remix";

import { Header } from "~/components/Header";
import { Main } from "~/components/Main";
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
    return flash(request, "/login", { type: "error", message: "problem :(" });
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
        // only necessary with cookieSessionStorage
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
    <>
      <Header title="Sign in to your account" />

      <p>{JSON.stringify(flash, null, 2)}</p>
      <Main>
        {data.flash?.type === "error" && (
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
                  <ul role="list" className="list-disc space-y-1 pl-5">
                    <li>Your password must be at least 8 characters</li>
                    <li>
                      Your password must include at least one pro wrestling
                      finishing move
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <Form replace method="post" className="space-y-6">
          <label className="block">
            <span>Email address</span>
            <input
              className="block w-full"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </label>

          <label className="block">
            <span>Password</span>
            <input
              required
              className="block w-full"
              name="password"
              type="password"
              autoComplete="current-password"
            />
          </label>

          <button type="submit">Sign in</button>
        </Form>
        <p>
          <Link to="/join">Don’t have an account?</Link>
        </p>
      </Main>
    </>
  );
}

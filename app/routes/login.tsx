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
import { route } from "routes-gen";
import { Flasher } from "~/components/Flasher";

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
    <div className="space-y-10 py-10">
      <Header title="Sign in to your account" />
      <Main>
        <Form replace method="post" className="space-y-6">
          <Flasher flash={data.flash} />

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
          <Link to={route("/join")}>Don’t have an account?</Link>
        </p>
      </Main>
    </div>
  );
}

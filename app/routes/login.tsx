import { useEffect, useRef } from "react";
import {
  ActionFunction,
  Form,
  json,
  Link,
  LoaderFunction,
  MetaFunction,
  redirect,
  useActionData,
  useSearchParams,
} from "remix";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";

type ActionData = {
  errors?: {
    email?: string;
    password?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  const returnTo = formData.get("returnTo");

  if (typeof email !== "string" || email.length === 0) {
    return json<ActionData>(
      { errors: { email: "Email is required" } },
      { status: 400 },
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json<ActionData>(
      { errors: { password: "Password is required" } },
      { status: 400 },
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json<ActionData>(
      { errors: { email: "Invalid email or password" } },
      { status: 400 },
    );
  }

  return createUserSession(
    request,
    user.id,
    typeof returnTo === "string" ? returnTo : "/",
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);

  if (userId) {
    return redirect("/");
  }

  return {};
};

export const meta: MetaFunction = () => ({
  title: "Login",
});

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("redirectTo") ?? undefined;

  const actionData = useActionData<ActionData>();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-8">
      <div>
        <h2 className="text-lg font-medium">Sign in to your account</h2>
      </div>

      <p>{JSON.stringify(actionData, null, 2)}</p>

      <Form className="space-y-6" method="post">
        <input name="redirectTo" type="hidden" value={returnTo} />

        <Input>
          <Input.Label>Email address</Input.Label>
          <Input.Field
            ref={emailRef}
            autoComplete="email"
            name="email"
            type="email"
          />
        </Input>

        <Input>
          <Input.Label>Password</Input.Label>
          <Input.Field
            ref={passwordRef}
            autoComplete="current-password"
            name="password"
            type="password"
          />
        </Input>

        <Button type="submit">Sign in</Button>
      </Form>

      <p>
        <Link
          to={{
            pathname: "/join",
            search: returnTo ? `?returnTo=${returnTo}` : undefined,
          }}
        >
          Don’t have an account?
        </Link>
      </p>
    </div>
  );
}

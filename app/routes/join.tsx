import { useRef } from "react";
import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import { Form, Link, redirect, useSearchParams } from "remix";
import invariant from "tiny-invariant";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { createUser } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  invariant(typeof email === "string", "email must be a string");
  invariant(typeof password === "string", "password must be a string");

  const user = await createUser(email, password);

  if (!user) {
    return redirect("/login");
  }

  return createUserSession(request, user.id, "/");
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);

  if (userId) {
    return redirect("/");
  }

  return {};
};

export const meta: MetaFunction = () => ({
  title: "Join",
});

export default function JoinPage() {
  const [searchParams] = useSearchParams();

  const returnTo = searchParams.get("redirectTo") ?? undefined;

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-8">
      <div>
        <h2 className="text-lg font-medium">Join</h2>
      </div>

      <Form className="space-y-6" method="post">
        <input name="redirectTo" type="hidden" value={returnTo} />

        <Input>
          <Input.Label>Email address</Input.Label>
          <Input.Field autoComplete="email" name="email" type="email" />
        </Input>

        <Input>
          <Input.Label>Password</Input.Label>
          <Input.Field
            autoComplete="new-password"
            name="password"
            type="password"
          />
        </Input>

        <Button type="submit">Sign in</Button>
      </Form>

      <p>
        <Link
          to={{
            pathname: "/login",
            search: returnTo ? `?returnTo=${returnTo}` : undefined,
          }}
        >
          Already have an account?
        </Link>
      </p>
    </div>
  );
}

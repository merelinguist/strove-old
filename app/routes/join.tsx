import type { ActionFunction, HeadersFunction, MetaFunction } from "remix";
import { Form, Link } from "remix";
import { route } from "routes-gen";
import { analytics } from "~/analytics.server";

import { createUser, login } from "~/models/user.server";
import { getFormData } from "~/utils/getFormData";

const action: ActionFunction = async ({ request }) => {
  const { email, password } = await getFormData(request, [
    "email",
    "password",
  ] as const);

  const user = await createUser(email, password);

  analytics?.user.set({ userId: user.id, userData: { email: user.email } });

  return login(request, user.id);
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${
      60 * 60 * 24 * 30
    }`,
  };
};

const meta: MetaFunction = () => ({
  title: "Join",
});

function JoinPage() {
  return (
    <div className="prose mx-auto p-8">
      <h1>Join</h1>

      <Form
        method="post"
        className="space-y-6"
      >
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
            className="block w-full"
            name="password"
            required
            type="password"
            autoComplete="current-password"
          />
        </label>

        <button type="submit">Sign in</button>
      </Form>

      <p>
        <Link to={route("/login")}>Already have an account?</Link>
      </p>
    </div>
  );
}

export { action, meta };

export default JoinPage;

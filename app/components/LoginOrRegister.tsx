import bcrypt from "bcryptjs";
import { ActionFunction, json, useActionData } from "remix";

import { Alert } from "~/components/Alert";
import { Form } from "~/components/Form";
import { Input } from "~/components/Input";
import type { ActionData } from "~/types";
import { db } from "~/utils/server/db.server";
import { createUserSession } from "~/utils/server/session.server";

const badRequest = (data: ActionData) => json(data, 400);

export const loginOrRegisterAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const loginType = formData.get("loginType");
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof loginType !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return badRequest({ errors: ["Form not submitted correctly."] });
  }

  switch (loginType) {
    case "login": {
      const user = await db.user.findUnique({ where: { email } });

      if (!user) {
        return badRequest({
          errors: ["Username/Password combination is incorrect"],
        });
      }

      const isCorrectPassword = await bcrypt.compare(
        password,
        user.hashedPassword,
      );

      if (!isCorrectPassword) {
        return badRequest({
          errors: ["Username/Password combination is incorrect"],
        });
      }

      return createUserSession(user.id, "/");
    }

    case "register": {
      const existingUser = await db.user.findFirst({ where: { email } });

      if (existingUser) {
        return badRequest({
          errors: [`User with email **${email}** already exists`],
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await db.user.create({
        data: { email, hashedPassword },
        include: { workspaces: true },
      });

      if (!user) {
        return badRequest({
          errors: ["Something went wrong trying to create a new user."],
        });
      }

      if (user.workspaces.length === 0) {
        await db.workspace.create({
          data: {
            name: "Personal",
            users: {
              connect: {
                id: user.id,
              },
            },
          },
        });
      }

      return createUserSession(user.id, "/");
    }

    default: {
      return badRequest({ errors: ["Login type invalid"] });
    }
  }
};

export const LoginOrRegister = ({ type }: { type: "login" | "register" }) => {
  const data = useActionData<ActionData>();

  const title = {
    login: "Sign in to your account",
    register: "Sign up for an account",
  }[type];

  return (
    <div className="flex justify-center items-center py-12 px-4 min-h-full sm:px-6 lg:px-8">
      <div className="space-y-8 w-full max-w-md">
        <div>
          <img
            alt="Workflow"
            className="mx-auto w-auto h-12"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          />
          <h1 className="mt-6 text-3xl font-extrabold text-center">{title}</h1>
          <p className="mt-2 text-sm text-center text-gray-600">
            Or{" "}
            <a
              className="font-medium text-indigo-600 hover:text-indigo-500"
              href="#"
            >
              start your 14-day free trial
            </a>
          </p>
        </div>
        <Form className="mt-8 space-y-6" method="post" replace>
          <Alert errors={data?.errors} />

          <input name="loginType" type="hidden" value={type} />

          <Input>
            <Input.Label>Email</Input.Label>
            <Input.Field
              autoComplete="off"
              name="email"
              placeholder="me@example.com"
              required
              type="email"
            />
          </Input>

          <Input>
            <Input.Label>Password</Input.Label>
            <Input.Field
              minLength={8}
              name="password"
              placeholder="••••••••"
              required
              type="password"
            />
          </Input>

          <div className="float-right">
            <button
              className="py-2.5 px-5 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              type="submit"
            >
              Save changes
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

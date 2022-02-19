import type { User } from "@prisma/client";
import { LoaderFunction, Outlet, useLoaderData } from "remix";
import { route } from "routes-gen";
import { Navbar } from "~/components/Navbar";
import { requireUser } from "~/models/user.server";

type LoaderData = {
  user: User;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request, route("/login"));

  return { user };
};

export default function AppRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <Navbar user={data.user} />
      <Outlet />
    </>
  );
}

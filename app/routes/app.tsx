import { Outlet } from "remix";
import { Navbar } from "~/components/Navbar";

export default function AppRoute() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

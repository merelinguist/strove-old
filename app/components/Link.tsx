import type { ReactNode } from "react";
import { Link as RemixLink, LinkProps } from "remix";

export const Link = ({
  to,
  children,
  style,
  ...props
}: Omit<LinkProps, "to" | "children"> & {
  to: string;
  children?: ReactNode;
}) => {
  return (
    <RemixLink to={to} {...props}>
      {children ?? to}
    </RemixLink>
  );
};

Link.to = {
  Index: "/",
  EditDeck: (id: string) => `/decks/${id}/edit`,
  ShowDeck: (id: string) => `/decks/${id}`,
  Decks: "/decks",
  NewDeck: "/decks/new",
};

const Demo = () => (
  <>
    <Link to={Link.to.Index}>Home</Link>
    <Link to={Link.to.NewDeck}>Home</Link>
    <Link to={Link.to.ShowDeck("abc")}>Home</Link>
  </>
);

import type { HtmlMetaDescriptor } from "@remix-run/react";

const makeTitle = (title: string, name: string) =>
  title === name ? title : `${title} – ${name}`;

export const seo = ({
  title = "Strove",
  name = "Strove",
  description,
}: {
  title?: string;
  name?: string;
  description?: string;
}): HtmlMetaDescriptor => ({
  title: makeTitle(title, name),

  "og:title": makeTitle(title, name),
  ...(description && { "og:description": description }),
});

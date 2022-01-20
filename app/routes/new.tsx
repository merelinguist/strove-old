import { json, LoaderFunction, useLoaderData } from "remix";

import { db, Note, Text } from "~/utils/server/db.server";

type LoaderData = {
  text: Text & { notes: Note[] };
};

export const loader: LoaderFunction = async ({ request }) => {
  console.log(request.headers.get("x-forwarded-for"));
  const text = await db.text.findFirst({
    include: { notes: true },
  });

  if (!text) {
    throw new Error("No text found");
  }

  return json<LoaderData>({ text });
};

const NewRoute = () => {
  const data = useLoaderData<LoaderData>();

  console.log(JSON.stringify(data.text.body.split("\n\n"), null, 2));

  return <div className="p-8 mx-auto prose">hewwo</div>;
};

export default NewRoute;

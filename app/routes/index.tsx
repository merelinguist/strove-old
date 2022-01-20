import { PlusSmIcon } from "@heroicons/react/solid";
import {
  ActionFunction,
  json,
  Link,
  LoaderFunction,
  useLoaderData,
} from "remix";

import { Input } from "~/components/Input";
import { usePrevious } from "~/utils/hooks/usePrevious";
import { useSelection } from "~/utils/hooks/useSelection";
import { useSelectionCoords } from "~/utils/hooks/useSelectionCoords";
import { useBody, useNotes } from "~/utils/notes";
import { db, Note, Text, Vote } from "~/utils/server/db.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  return null;
};

type LoaderData = {
  text: Text & {
    notes: (Note & { votes: Vote[] })[];
  };
};

export const loader: LoaderFunction = async () => {
  const text = await db.text.findFirst({
    include: { notes: true },
  });

  if (!text) {
    throw new Error("No text found");
  }

  return json<LoaderData>({ text });
};

const IndexRoute = () => {
  const data = useLoaderData<LoaderData>();
  const selection = useSelection();
  const previousSelection = usePrevious(selection);
  const selectionCoords = useSelectionCoords();

  const body = useBody(data.text);
  const notes = useNotes(data.text);

  return (
    <div className="flex overflow-hidden h-full">
      <main className="overflow-y-auto flex-1">
        <div className="p-6 mx-auto whitespace-pre-wrap prose">
          {selection && selectionCoords && (
            <button
              className="hidden absolute items-center p-2 text-gray-500 hover:bg-gray-50 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm lg:inline-flex"
              style={{
                top: selectionCoords.y - 38 / 2,
                left: selectionCoords.x,
              }}
              type="button"
            >
              <PlusSmIcon aria-hidden className="w-5 h-5" />
            </button>
          )}
          <h1>Medea</h1>
          <p className="lead">By Euripides :)</p>
          {body.map((paragraph) => (
            <p>
              {paragraph.map((part) => {
                if (typeof part === "string") {
                  return <span key={part}>{part}</span>;
                }

                return (
                  <Link
                    key={part.text}
                    className="font-medium text-blue-800 no-underline bg-blue-100"
                    replace
                    to={`/?start=${part.start}&end=${part.end}`}
                  >
                    {part.text}
                  </Link>
                );
              })}
            </p>
          ))}
        </div>
      </main>
      <aside className="hidden overflow-y-auto w-96 border-l lg:block">
        <div className="p-6 mx-auto prose">
          {notes.map((note) => (
            <ul>
              <li key={note.id}>
                <h4>
                  {data.text.body.slice(note.start, note.end).slice(0, 42)}...
                </h4>
                <p>{note.body}</p>
              </li>
            </ul>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default IndexRoute;

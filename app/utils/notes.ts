import { useSearchParams } from "remix";

import type { Note, Text, Vote } from "~/utils/server/db.server";

export const useBody = (
  text: Text & {
    notes: Note[];
  },
) => {
  const getParagraph = (paragraph: string, shift: number) => {
    const ranges = text.notes.map((note) => [note.start, note.end]);

    const uniqueRanges = ranges.map(([start, end], index) => {
      const previousEnd = index > 0 ? ranges[index - 1][1] : 0;

      return [(start > previousEnd ? start : previousEnd) + shift, end + shift];
    });

    if (uniqueRanges[-1] === 0) {
      return paragraph;
    }

    return uniqueRanges
      .map(([start, end], index) => [
        { start, end, text: paragraph.slice(start, end) },
        paragraph.slice(end, uniqueRanges[index + 1]?.[0] ?? undefined),
      ])
      .flat()
      .filter((part) => !(typeof part === "string" && part.length === 0));
  };

  const paragraphs = text.body.split("\n\n");

  return paragraphs.map((paragraph, index) =>
    getParagraph(
      paragraph,
      paragraphs[index - 1] ? paragraphs[index - 1].length : 0,
    ),
  );
};

export const useNotes = (
  text: Text & {
    notes: (Note & { votes: Vote })[];
  },
) => {
  const [searchParams] = useSearchParams();

  return text.notes.filter((note) => {
    const startParam = searchParams.get("start");
    const endParam = searchParams.get("end");

    if (startParam === null || endParam === null) {
      return false;
    }

    const start = parseInt(startParam, 10);
    const end = parseInt(endParam, 10);

    const range = [...Array(end - start).keys()].map((index) => index + start);

    return range.includes(note.start) || range.includes(note.end);
  });
};

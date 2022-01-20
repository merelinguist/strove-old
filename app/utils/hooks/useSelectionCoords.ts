import { useEffect, useState } from "react";

import { managedEventListener } from "~/utils/managedEventListener";

const getSelectionCoords = (): { x: number; y: number } | null => {
  const selection = document.getSelection();

  if (!selection) {
    return null;
  }

  let parent = selection.getRangeAt(0).commonAncestorContainer;

  for (let index = 0; index < 10; index += 1) {
    if (parent.nodeName === "P" || !parent.parentNode) {
      break;
    }

    parent = parent.parentNode;
  }

  if (parent.nodeType !== 1) {
    return null;
  }

  const prose = document.querySelector("div.prose");

  if (!prose || !prose.contains(parent)) {
    return null;
  }

  const rect = (parent as HTMLElement).getBoundingClientRect();

  return { x: rect.left + rect.width + 16, y: rect.y + rect.height / 2 };
};

export const useSelectionCoords = () => {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  useEffect(
    () =>
      managedEventListener(document, "selectionchange", () => {
        setCoords(getSelectionCoords());
      }),
    [],
  );

  return coords;
};

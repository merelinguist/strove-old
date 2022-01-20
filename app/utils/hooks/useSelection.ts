import { useEffect, useState } from "react";

import { managedEventListener } from "~/utils/managedEventListener";

export const useSelection = () => {
  const [selection, setSelection] = useState<string | null>(null);

  useEffect(
    () =>
      managedEventListener(document, "selectionchange", () => {
        const getSelection = document.getSelection();

        if (getSelection) {
          setSelection(getSelection.toString());
        }
      }),
    [],
  );

  return selection;
};

import { useEffect, useRef } from "react";

import { useLesson } from "~/utils/useLesson";

export function useLessonFocusManagement() {
  const lesson = useLesson();

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (lesson.state === "loadingAsk") {
      inputRef.current?.focus();
      formRef.current?.reset();
    } else if (lesson.state === "validate") {
      buttonRef.current?.focus();
    }
  }, [lesson]);

  return { formRef, inputRef, buttonRef };
}

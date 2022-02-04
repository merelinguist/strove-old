import { useEffect, useRef } from "react";
import {
  Form as RemixForm,
  FormProps,
  useSearchParams,
  useTransition,
} from "remix";

const useValidation = () => {
  useEffect(() => {
    const inputs = document.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      input.addEventListener(
        "invalid",
        () => {
          input.classList.add(
            "invalid:text-pink-600",
            "invalid:border-pink-500",
            "focus:invalid:border-pink-500",
            "focus:invalid:ring-pink-500",
          );
        },
        false,
      );
    });
  }, []);
};

const useReset = () => {
  const transition = useTransition();
  const ref = useRef<HTMLFormElement>(null);

  // useEffect(() => {
  //   if (transition.type === "idle" && ref.current) {
  //     ref.current.reset();
  //   }
  // }, [transition]);

  return ref;
};

const useAction = (action: FormProps["action"]) => {
  const [searchParams] = useSearchParams();

  const querySymbol = action?.includes("?") ? "&" : "?";

  return `${action}${querySymbol}${searchParams.toString()}`.replace(
    "&index=",
    "",
  );
};

export const Form = (props: FormProps & { preserveParams?: boolean }) => {
  const { action: remixAction, preserveParams, ...rest } = props;

  useValidation();
  const ref = useReset();
  const action = useAction(remixAction);

  if (!preserveParams) {
    return <RemixForm {...rest} action={remixAction} />;
  }

  return <RemixForm ref={ref} {...props} action={action} />;
};

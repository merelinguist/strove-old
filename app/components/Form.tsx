import { Form as RemixForm, FormProps, useSearchParams } from "remix";

export const Form = (props: FormProps & { preserveParams?: boolean }) => {
  const [searchParams] = useSearchParams();

  const { action, preserveParams, ...rest } = props;

  if (!preserveParams) {
    return <RemixForm {...rest} action={action} />;
  }

  const querySymbol = action?.includes("?") ? "&" : "?";

  console.log(`${action}${querySymbol}${searchParams.toString()}`);

  return (
    <RemixForm
      {...props}
      action={`${action}${querySymbol}${searchParams.toString()}`.replace(
        "&index=",
        "",
      )}
    />
  );
};

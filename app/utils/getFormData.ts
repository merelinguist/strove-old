import invariant from "tiny-invariant";

type TFields = readonly string[];

type TFormData<Fields extends TFields> = {
  [Key in Fields extends readonly (infer U)[] ? U : never]: string;
};

export const getFormData = async <Fields extends TFields>(
  request: Request,
  fields: Fields,
) => {
  const formData = await request.formData();

  return Object.assign(
    fields.reduce(
      (entries, field) => {
        const value = formData.get(field);

        invariant(typeof value === "string", `${field} must be a string`);

        return {
          ...entries,
          [field]: value,
        };
      },
      { formData },
    ),
    {} as TFormData<Fields> & { formData: FormData },
  );
};

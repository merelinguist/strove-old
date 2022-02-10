import invariant from "tiny-invariant";

type TFields = readonly string[];

type FormData<Fields extends TFields> = {
  [Key in Fields extends readonly (infer U)[] ? U : never]: string;
};

export const getFormData = async <Fields extends TFields>(
  request: Request,
  fields: Fields,
): Promise<FormData<Fields>> => {
  const formData = await request.formData();

  const result: FormData<Fields> = fields.reduce(
    (previousField, currentField) => {
      const value = formData.get(currentField);

      invariant(typeof value === "string", `${currentField} must be a string`);

      return {
        ...previousField,
        [currentField]: value,
      };
    },
    {} as FormData<Fields>,
  );

  return result;
};

import invariant from "tiny-invariant";

type TFields = readonly string[];

type FormData<Fields extends TFields> = {
  [Key in Fields extends readonly (infer U)[] ? U : never]: string;
};

export const getFormData = async <Fields extends TFields>(
  request: Request,
  fields: Fields,
) => {
  const formData = await request.formData();

  return fields.reduce((entries, field) => {
    const value = formData.get(field);

    invariant(typeof value === "string", `${field} must be a string`);

    return {
      ...entries,
      [field]: value,
    };
  }, {} as FormData<Fields>);
};

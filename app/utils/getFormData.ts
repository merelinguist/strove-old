import invariant from "tiny-invariant";

// Critical code, please don't change without checking or every action will break!
type GetFormData<Keys extends readonly string[]> = {
  [Key in Keys[number]]: string;
} & { formData: FormData };

export const getFormData = async <Keys extends readonly string[]>(
  request: Request,
  keys: Keys,
) => {
  const formData = await request.formData();

  return Object.assign(
    { formData },
    ...keys.map((key) => {
      const value = formData.get(key);

      invariant(typeof value === "string", `${key} must be a string`);

      return { [key]: value };
    }),
  ) as GetFormData<Keys>;
};

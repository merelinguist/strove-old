import invariant from "tiny-invariant";

type GetFormData<Keys extends readonly string[]> = Record<
  Keys[number],
  string
> & { formData: FormData };

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

      return { key, value };
    }),
  ) as GetFormData<Keys>;
};

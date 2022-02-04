import { useLoaderData as useRemixLoaderData } from "remix";

// Very proud of this 😇
type Deserialized<Data> = {
  [Key in keyof Data]: Data[Key] extends { [key: string]: unknown } | null
    ? Deserialized<Data[Key]>
    : Data[Key] extends Date
    ? string
    : Data[Key];
};

export const useLoaderData = <Data>(): Deserialized<Data> =>
  useRemixLoaderData<Deserialized<Data>>();

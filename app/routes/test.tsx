import type { AppData, DataFunctionArgs } from "@remix-run/server-runtime";
import type { LoaderFunction } from "remix";

const builder = async (
	args: DataFunctionArgs,
	{
		input,
	}: {
		input: (
			input: unknown,
		) => Promise<Response> | Response | Promise<AppData> | AppData;
	},
) => {
	console.log(args.request.formData, input);

	const formData = await args.request.formData();

	return input("formData");
};

// eslint-disable-next-line import/prefer-default-export
export const loader: LoaderFunction = (args) =>
	builder(args, {
		async input() {
			return "hewwo";
		},
	});

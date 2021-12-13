import { LoaderFunction, redirect } from "remix";

// eslint-disable-next-line import/prefer-default-export
export const loader: LoaderFunction = async () => {
	return redirect("journal");
};

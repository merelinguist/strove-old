import { Tab } from "@headlessui/react";
import { marked } from "marked";
import { useRef } from "react";
import {
	ActionFunction,
	Form,
	LoaderFunction,
	MetaFunction,
	redirect,
	useLoaderData,
	useSubmit,
} from "remix";

import { captureKeys } from "~/utils/captureKeys";
import { Entry, prisma } from "~/utils/prisma.server";

export const meta: MetaFunction = ({
	data,
}: {
	data: LoaderData | undefined;
}) => {
	if (!data) {
		return {
			title: "No entry",
			description: "No entry found",
		};
	}

	return {
		title: `"${data.entry.title}" entry`,
		description: `Enjoy the "${data.entry.title}" joke and much more`,
	};
};

type LoaderData = { entry: Entry } & { html: string };

export const loader: LoaderFunction = async ({ params }) => {
	const entry = await prisma.entry.findUnique({ where: { id: params.id } });

	if (!entry) {
		return redirect("/journal");
	}

	const data: LoaderData = { entry, html: marked(entry.body) };

	return data;
};

export const action: ActionFunction = async ({ params, request }) => {
	const data = Object.fromEntries(await request.formData());

	if (typeof data.body !== "string") {
		return new Response("Invalid entry body", { status: 400 });
	}

	return prisma.entry.update({
		where: { id: params.id },
		data: { body: data.body },
	});
};

function ShowEntryRoute() {
	const { entry, html } = useLoaderData<LoaderData>();
	const formRef = useRef<HTMLFormElement>(null);
	const submit = useSubmit();

	return (
		<div className="prose py-10 prose-sm mx-auto prose-blue">
			<h1>{entry.title}</h1>
			<Tab.Group key={entry.id}>
				<Tab.List>
					<Tab>Preview</Tab>
					<Tab>Edit</Tab>
				</Tab.List>
				<Tab.Panels>
					<Tab.Panel>
						{/* eslint-disable-next-line react/no-danger */}
						<div dangerouslySetInnerHTML={{ __html: html }} />
					</Tab.Panel>
					<Tab.Panel>
						<Form method="post" replace ref={formRef}>
							<textarea
								onKeyDown={(event) => {
									const saveCommand = captureKeys("CmdOrCtrl", "S");

									if (saveCommand(event)) {
										submit(formRef.current, { replace: true });
									}
								}}
								key={entry.id}
								name="body"
								className="mt-1 block w-full"
								rows={20}
								defaultValue={entry.body}
							/>

							<button type="submit">Save</button>
						</Form>
					</Tab.Panel>
					<Tab.Panel>Content 3</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}

export default ShowEntryRoute;

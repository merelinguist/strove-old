import { useEffect, useRef } from "react";
import {
	ActionFunction,
	Form,
	LoaderFunction,
	useActionData,
	useFetcher,
	useLoaderData,
	useTransition,
} from "remix";
import invariant from "tiny-invariant";

import { prisma, Task } from "~/utils/prisma.server";

type LoaderData = {
	tasks: Task[];
};

export const loader: LoaderFunction = async () => {
	const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });

	tasks.sort((taskA, taskB) => Number(taskA.complete) - Number(taskB.complete));

	return { tasks };
};

enum Action {
	CREATE_TASK = "CREATE_TASK",
	UPDATE_TASK_NAME = "UPDATE_TASK_NAME",
	MOVE_TASK_TO_DAY = "MOVE_TASK_TO_DAY",
	MOVE_TASK_TO_BACKLOG = "MOVE_TASK_TO_BACKLOG",
	MARK_COMPLETE = "MARK_COMPLETE",
	MARK_INCOMPLETE = "MARK_INCOMPLETE",
	DELETE_TASK = "DELETE_TASK",
}

export const action: ActionFunction = async ({ request }) => {
	const me = await prisma.user.findUnique({ where: { email: "me@here.com" } });

	invariant(me, "user not found");

	const data = Object.fromEntries(await request.formData());

	// eslint-disable-next-line no-underscore-dangle
	invariant(typeof data._action === "string", "action should be string");

	// eslint-disable-next-line no-underscore-dangle
	switch (data._action) {
		case Action.CREATE_TASK: {
			invariant(typeof data.title === "string", "expected name");

			return prisma.task.create({
				data: {
					title: data.title,
					userId: me.id,
				},
			});
		}

		case Action.MARK_COMPLETE: {
			invariant(typeof data.id === "string", "expected task id");

			return prisma.task.update({
				where: { id: data.id },
				data: { complete: true },
			});
		}

		case Action.MARK_INCOMPLETE: {
			invariant(typeof data.id === "string", "expected task id");

			return prisma.task.update({
				where: { id: data.id },
				data: { complete: false },
			});
		}

		case Action.DELETE_TASK: {
			invariant(typeof data.id === "string", "expected taskId");

			return prisma.task.delete({ where: { id: data.id } });
		}

		default: {
			throw new Response("Bad Request", { status: 400 });
		}
	}
};

type AsyncReturnType<T> = T extends Promise<infer UnwrappedPromise>
	? UnwrappedPromise
	: T extends (...args: any[]) => Promise<infer UnwrappedFunction>
	? UnwrappedFunction
	: T;

type A = AsyncReturnType<typeof loader>;
type B = ReturnType<typeof loader>;

export default function IndexRoute() {
	const data = useLoaderData<LoaderData>();

	const transition = useTransition();
	const fetcher = useFetcher();

	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (transition.type === "idle" && formRef.current) {
			formRef.current.reset();
		}
	}, [transition]);

	return (
		<>
			<div className="prose mx-auto p-8">
				<h1>Tasks</h1>
			</div>
			<fieldset className="max-w-prose mx mx-auto px-8">
				<legend className="text-lg font-medium text-gray-900">Members</legend>
				<div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
					<Form ref={formRef} method="post" replace>
						<input name="_action" type="hidden" value={Action.CREATE_TASK} />
						<input
							className="w-full border-0 bg-transparent px-0 py-4 font-medium text-gray-700 text-sm focus:ring-0"
							name="title"
							placeholder="Add a task"
							type="text"
						/>
					</Form>
					{data.tasks.map((task) => (
						<div key={task.id} className="relative flex items-start py-4">
							<div className="min-w-0 flex-1 text-sm">
								{task.title.length > 0 ? (
									<label
										className="font-medium text-gray-700 select-none"
										htmlFor={`task-${task.id}`}
									>
										{task.title}
									</label>
								) : (
									<label
										className="font-medium text-gray-500 select-none"
										htmlFor={`task-${task.id}`}
									>
										Untitled
									</label>
								)}
							</div>
							<div className="ml-3 flex items-center h-5">
								<input
									key={task.id}
									className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
									defaultChecked={task.complete}
									id={`task-${task.id}`}
									name={`task-${task.id}`}
									onChange={() =>
										fetcher.submit(
											{
												_action: task.complete
													? Action.MARK_INCOMPLETE
													: Action.MARK_COMPLETE,
												id: task.id,
											},
											{ action: "tasks", method: "post" },
										)
									}
									type="checkbox"
								/>
							</div>
						</div>
					))}
				</div>
			</fieldset>
		</>
	);
}

IndexRoute();

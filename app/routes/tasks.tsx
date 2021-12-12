import { useRef, useState } from "react";
import {
	ActionFunction,
	LoaderFunction,
	useFetcher,
	useLoaderData,
} from "remix";
import { prisma, Task } from "~/utils/prisma.server";

type LoaderData = { tasks: Task[] };

export const loader: LoaderFunction = async () => {
	const user = await prisma.user.findUnique({
		where: { email: "me@here.com" },
	});
	const tasks = await prisma.task.findMany();

	return { tasks };
};

function CalendarDay({ datestring }: { datestring: string }) {
	return (
		<div className="p-4 flex justify-center items-center w-[14.2%] h-full font-semibold">
			{new Date(datestring).getDate()}
		</div>
	);
}

function Calendar() {
	const weeks = [
		[
			"2021-01-01",
			"2021-01-02",
			"2021-01-03",
			"2021-01-04",
			"2021-01-05",
			"2021-01-06",
			"2021-01-07",
		],
		[
			"2021-01-08",
			"2021-01-09",
			"2021-01-10",
			"2021-01-11",
			"2021-01-12",
			"2021-01-13",
			"2021-01-14",
		],
	];

	return (
		<div className="h-full">
			{weeks.map((week, index) => (
				<div key={index} className="flex justify-between">
					{week.map((day) => (
						<CalendarDay key={day} datestring={day} />
					))}
				</div>
			))}
		</div>
	);
}

function Day() {
	return <div>Day</div>;
}

function TaskView({ task }: { task: Task }) {
	return (
		<div className="flex items-center p-2 border-t text-gray-700 focus-within:bg-gray-50">
			<input disabled type="checkbox" className="mr-2" />
			<div
				className="flex-1 outline-none"
				contentEditable
				onKeyDown={(event) => {
					if (event.key === "Enter" || event.key === "Escape") {
						event.currentTarget.blur();
					}
				}}
				onBlur={(event) => {
					const value = event.currentTarget.innerHTML.trim();

					if (value !== task.name) {
						alert("submit" + JSON.stringify(task, null, 2));
					}
				}}
				dangerouslySetInnerHTML={{ __html: "" }}
			/>
		</div>
	);
}

function Backlog() {
	const tasks: Task[] = [
		{
			id: "a",
			createdAt: new Date(),
			updatedAt: new Date(),
			name: "Omg jake",
			complete: false,
			userId: "",
		},
	];

	return (
		<div className="h-full relative">
			<div className="h-full overflow-auto pb-16">
				{tasks.map((task) => (
					<TaskView key={task.id} task={task} />
				))}
			</div>
			<div className="px-2 py-4 absolute left-0 bottom-0 w-full">
				<button
					type="button"
					className="shadow flex items-center justify-between gap-1 w-full bg-green-500 text-gray-50 px-4 py-2 rounded text-sm font-bold uppercase"
				>
					New Task +
				</button>
			</div>
		</div>
	);
}

export default function TasksRoute() {
	return (
		<div className="h-full flex flex-col">
			<div>
				<Calendar />
			</div>
			<div className="flex-1 flex overflow-x-scroll">
				<div className="h-full flex-shrink-0 w-full order-2">
					<div className="overflow-auto h-full">
						<Day />
					</div>
				</div>
				<div className="flex-shrink-0 h-full w-full order-1">
					<Backlog />
				</div>
			</div>
		</div>
	);
}

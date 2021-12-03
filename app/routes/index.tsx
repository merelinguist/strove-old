import type { LoaderFunction } from "remix";
import { json, Link, useLoaderData } from "remix";

type IndexData = {
	resources: { name: string; url: string }[];
	demos: { name: string; to: string }[];
};

export const loader: LoaderFunction = () => {
	const data: IndexData = {
		resources: [
			{
				name: "Remix Docs",
				url: "https://remix.run/docs",
			},
			{
				name: "React Router Docs",
				url: "https://reactrouter.com/docs",
			},
			{
				name: "Remix Discord",
				url: "https://discord.gg/VBePs6d",
			},
		],
		demos: [
			{
				to: "demos/actions",
				name: "Actions",
			},
			{
				to: "demos/about",
				name: "Nested Routes, CSS loading/unloading",
			},
			{
				to: "demos/params",
				name: "URL Params and Error Boundaries",
			},
		],
	};

	return json(data);
};

export default function IndexRoute() {
	const data = useLoaderData<IndexData>();

	return (
		<>
			<main>
				<h1>Welcome to Remix!</h1>
				<p>We’re stoked that you’re here. 🥳</p>
				<p>
					Feel free to take a look around the code to see how Remix does things,
					it might be a bit different than what you’re used to. When you’re
					ready to dive deeper, we’ve got plenty of resources to get you
					up-and-running quickly.
				</p>
				<p>
					Check out all the demos in this starter, and then just delete the{" "}
					<code>app/routes/demos</code> and <code>app/styles/demos</code>{" "}
					folders when you’re ready to turn this into your next project.
				</p>
			</main>
			<aside>
				<h2>Demos In This App</h2>
				<ul>
					{data.demos.map((demo) => (
						<li key={demo.to}>
							<Link prefetch="intent" to={demo.to}>
								{demo.name}
							</Link>
						</li>
					))}
				</ul>
				<h2>Resources</h2>
				<ul>
					{data.resources.map((resource) => (
						<li key={resource.url}>
							<a href={resource.url}>{resource.name}</a>
						</li>
					))}
				</ul>
			</aside>
		</>
	);
}

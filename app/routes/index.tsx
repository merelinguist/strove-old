import { Link } from "remix";

export default function IndexRoute() {
	return (
		<div className="prose mx-auto p-8">
			<h1>Index</h1>
			<p>
				Labore ipsum non velit fugiat voluptate ad id. Exercitation ut et sit
				ipsum ut magna duis aute culpa Lorem eu culpa qui. Laboris tempor qui
				qui mollit do esse duis voluptate reprehenderit velit. Non cillum ea
				Lorem ullamco. Commodo irure veniam voluptate ea magna. Nisi consectetur
				Lorem aliqua nulla elit mollit sunt deserunt fugiat esse.
			</p>
			<ul>
				<li>
					<Link to="/components">Components</Link>
				</li>
			</ul>
		</div>
	);
}

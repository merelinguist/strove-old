import { Link } from "remix";

import { routes } from "~/utils/routes";

export default function IndexPage() {
  return (
    <div className="prose">
      <ul>
        <li>
          <Link to={routes.index}>Home</Link>
        </li>
        <li>
          <Link to={routes.decks.index}>Dashboard</Link>
        </li>
        <li>
          <Link to={routes.register}>Register</Link>
        </li>
      </ul>
    </div>
  );
}

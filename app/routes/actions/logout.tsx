import type { ActionFunction } from "remix";
import { route } from "routes-gen";

import { destroySession } from "~/session.server";

export const action: ActionFunction = async ({ request }) =>
  destroySession(request, route('/');

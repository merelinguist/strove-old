import type { ActionFunction } from "remix";

import { destroySession } from "~/session.server";

export const action: ActionFunction = async ({ request }) =>
  destroySession(request, "/");

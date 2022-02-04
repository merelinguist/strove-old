import Stripe from "stripe";

import { env } from "./env.server";

export const stripe = new Stripe(env.STRIPE_SECRET_API_KEY, {
  // @ts-expect-error null apiVersion defaults to latest
  apiVersion: null,
  appInfo: {
    name: "Bedrock",
    // NOTE: Do not change this
    partner_id: "pp_partner_IsY1mtoxV00gSQ",
  },
});

import { SplitbeeAnalytics } from "@splitbee/node";

// TODO: analytics client that just logs the data instead of sending it
export const analytics =
  process.env.NODE_ENV === "production"
    ? new SplitbeeAnalytics("5XCSDN0SQD3S")
    : null;

import { useEffect } from "react";
import { LinksFunction, MetaFunction, Outlet } from "remix";
import { getCLS, getFCP, getFID, getLCP, getTTFB, Metric } from "web-vitals";

import { App } from "~/components/App";
import styles from "~/styles.css";
import { seo } from "~/utils/seo";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => {
  return {
    ...seo({}),
  };
};

type Options = {
  debug?: boolean;
};

const sendToAnalytics = (
  metric: Metric,
  options: Options = { debug: false },
) => {
  const body = {
    id: metric.id,
    href: location.href, // eslint-disable-line no-restricted-globals
    event_name: metric.name,
    value: metric.value.toString(),
    speed:
      "connection" in navigator &&
      navigator.connection &&
      "effectiveType" in navigator.connection
        ? navigator.connection.effectiveType
        : "",
  };

  console.log(body);
};

const options: Options = {};

const Root = () => {
  useEffect(() => {
    try {
      getFID((metric) => sendToAnalytics(metric, options));
      getTTFB((metric) => sendToAnalytics(metric, options));
      getLCP((metric) => sendToAnalytics(metric, options));
      getCLS((metric) => sendToAnalytics(metric, options));
      getFCP((metric) => sendToAnalytics(metric, options));
    } catch (error) {}
  }, []);

  return (
    <App>
      <Outlet />
    </App>
  );
};

export default Root;

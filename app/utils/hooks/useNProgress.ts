import NProgress from "nprogress";
import { useEffect } from "react";
import { useTransition } from "remix";

export const useNProgress = () => {
  const transition = useTransition();

  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    if (transition.state === "idle") {
      NProgress.done();
    } else {
      NProgress.start();
    }
  }, [transition.state]);
};

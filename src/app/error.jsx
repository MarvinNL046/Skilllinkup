"use client";

import { useEffect } from "react";
import AppErrorState from "@/components/error/AppErrorState";
import { reportClientError } from "@/lib/reportClientError.mjs";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("[Skilllinkup route error]", error);
    reportClientError(error, { source: "route-boundary" });
  }, [error]);

  return <AppErrorState reset={reset} />;
}

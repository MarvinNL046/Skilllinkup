"use client";

import { useEffect } from "react";
import AppErrorState from "@/components/error/AppErrorState";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("[Skilllinkup route error]", error);
  }, [error]);

  return <AppErrorState reset={reset} />;
}

"use client";

import { useEffect } from "react";
import AppErrorState from "@/components/error/AppErrorState";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("[Skilllinkup global error]", error);
  }, [error]);

  return (
    <html lang="en" data-theme="light">
      <body><AppErrorState title="Skilllinkup needs a fresh start." reset={reset} /></body>
    </html>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./RouteProgress.module.css";

export default function RouteProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState("idle");
  const mounted = useRef(false);
  const finishTimer = useRef(null);

  useEffect(() => {
    const start = () => {
      if (finishTimer.current) clearTimeout(finishTimer.current);
      setPhase("loading");
    };

    const onClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download"))
        return;
      const target = new URL(link.href, window.location.href);
      if (
        target.origin !== window.location.origin ||
        target.pathname === window.location.pathname
      )
        return;
      start();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", start);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", start);
      if (finishTimer.current) clearTimeout(finishTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setPhase("complete");
    finishTimer.current = setTimeout(() => setPhase("idle"), 280);
  }, [pathname]);

  return (
    <div className={`${styles.track} ${styles[phase]}`} aria-hidden="true">
      <span />
    </div>
  );
}

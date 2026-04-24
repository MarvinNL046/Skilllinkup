"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Light/dark theme toggle. Reads/writes [data-theme] on <html> and
 * persists the choice in localStorage. Respects `prefers-color-scheme`
 * for the initial render when no explicit choice is stored.
 *
 * Paired with tokens.css which flips all surface/text/border variables
 * when [data-theme="dark"] is set.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  // Pick up saved preference / system preference on mount.
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("skl-theme") : null;
    const systemDark = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial = saved || (systemDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("skl-theme", next);
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  }

  // Render a stable placeholder on the server to avoid hydration
  // mismatch; swap to the real icon once mounted.
  if (theme === null) {
    return (
      <button
        type="button"
        aria-hidden="true"
        className="btn btn--ghost btn--icon btn--sm"
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        <Sun size={16} />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="btn btn--ghost btn--icon btn--sm"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

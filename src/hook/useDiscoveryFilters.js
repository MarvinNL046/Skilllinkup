"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function useDiscoveryFilters() {
  const params = useSearchParams();
  const pathname = usePathname();
  const queryString = params.toString();
  const current = useRef(queryString);
  const [filters, setFilters] = useState(() => Object.fromEntries(params.entries()));
  useEffect(() => {
    const next = new URLSearchParams(window.location.search);
    current.current = next.toString();
    setFilters(Object.fromEntries(next));
  }, [queryString]);
  function navigate(next) {
    current.current = next.toString();
    setFilters(Object.fromEntries(next));
    // Next.js observes native history updates. Updating synchronously keeps
    // consecutive filter edits together before the next router render arrives.
    window.history.replaceState(null, "", `${pathname}${next.size ? `?${next}` : ""}`);
  }
  function update(changes) {
    const next = new URLSearchParams(current.current);
    for (const [key, value] of Object.entries(changes)) {
      if (value === "" || value == null) next.delete(key);
      else next.set(key, String(value));
    }
    if (!("page" in changes)) next.delete("page");
    navigate(next);
  }
  const reset = () => navigate(new URLSearchParams());
  return { filters, update, reset };
}

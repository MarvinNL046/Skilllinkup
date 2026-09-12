"use client";
import { useEffect, useMemo, useState } from "react";
import { useQueries } from "convex/react";
import { api } from "../../convex/_generated/api";
import useConvexUser from "./useConvexUser";

export default function useDashboardMetrics(enabled) {
  const { convexUser } = useConvexUser();
  const contextKey = convexUser
    ? [convexUser._id, convexUser.activeRole, convexUser.preferredWorld].join(
        ":",
      )
    : "";
  const [loaded, setLoaded] = useState({ contextKey: "", cursors: [null] });
  const cursors = useMemo(
    () => (loaded.contextKey === contextKey ? loaded.cursors : [null]),
    [loaded, contextKey],
  );
  const queries = useMemo(
    () =>
      enabled && contextKey
        ? Object.fromEntries(
            cursors.map((cursor, index) => [
              String(index),
              {
                query: api.marketplace.dashboardMetrics.chunk,
                args: { cursor, contextKey },
              },
            ]),
          )
        : {},
    [enabled, contextKey, cursors],
  );
  const results = useQueries(queries);
  const pages = cursors.map((_, index) => results[String(index)]);
  // Validate the chain from its beginning. A trailing query may now fail or
  // still load after an earlier reactive page moved its boundary; that suffix
  // is obsolete and must not prevent the valid prefix from rebuilding it.
  let ready = Boolean(enabled && contextKey);
  let mismatch = -1;
  let error;
  for (let index = 0; ready && index < pages.length; index++) {
    const page = pages[index];
    if (!page) ready = false;
    else if (page instanceof Error) {
      error = page;
      ready = false;
    } else if (
      index + 1 < cursors.length &&
      page.nextCursor !== cursors[index + 1]
    ) {
      mismatch = index;
      ready = false;
    }
  }
  const repairCursor = mismatch >= 0 ? pages[mismatch].nextCursor : undefined;
  const nextCursor = ready ? pages.at(-1)?.nextCursor : undefined;
  useEffect(() => {
    if (!enabled || !contextKey) return;
    if (mismatch >= 0) {
      setLoaded({
        contextKey,
        cursors: [
          ...cursors.slice(0, mismatch + 1),
          ...(repairCursor ? [repairCursor] : []),
        ],
      });
    } else if (nextCursor && !cursors.includes(nextCursor)) {
      setLoaded({ contextKey, cursors: [...cursors, nextCursor] });
    }
  }, [enabled, contextKey, mismatch, repairCursor, nextCursor, cursors]);
  if (error) throw error;
  if (!ready || nextCursor !== null || mismatch >= 0) return undefined;
  return pages.reduce(
    (totals, page) =>
      Object.fromEntries(
        Object.keys(totals).map((key) => [key, totals[key] + page.counts[key]]),
      ),
    { activeProjects: 0, newProposals: 0, unreadMessages: 0 },
  );
}

"use client";
import { useEffect } from "react";
import { useQuery, usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DISCOVERY_LIMIT, numberFilter, mapProject } from "@/lib/marketplaceDiscovery.mjs";
export default function useConvexProjects() {
  const projects = useQuery(api.marketplace.projects.list, { locale: "en", limit: DISCOVERY_LIMIT });
  return projects?.map(mapProject);
}

export function useProjectDiscovery(filters = {}) {
  const query = usePaginatedQuery(api.marketplace.discovery.projects, {
    locale: "en", query: filters.q || undefined, location: filters.location || undefined,
    category: filters.category || undefined, verifiedOnly: filters.verified === "1",
    currency: filters.currency || undefined, budgetMin: numberFilter(filters.minBudget) ?? undefined,
    budgetMax: numberFilter(filters.maxBudget) ?? undefined, deadlineDays: numberFilter(filters.deadlineDays) ?? undefined,
    sort: filters.sort === "budget" ? "budget" : "newest",
  }, { initialNumItems: 24 });
  const { status, results, loadMore } = query;
  useEffect(() => { if (status === "CanLoadMore" && results.length === 0) loadMore(24); }, [status, results.length, loadMore]);
  return { ...query, items: query.results.map(mapProject) };
}

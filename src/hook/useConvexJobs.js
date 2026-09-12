"use client";
import { useEffect } from "react";
import { useQuery, usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DISCOVERY_LIMIT, numberFilter, mapJob } from "@/lib/marketplaceDiscovery.mjs";
export default function useConvexJobs() {
  const jobs = useQuery(api.marketplace.jobs.list, { locale: "en", limit: DISCOVERY_LIMIT });
  return jobs?.map(mapJob);
}

export function useJobDiscovery(filters = {}) {
  const query = usePaginatedQuery(api.marketplace.discovery.jobs, {
    locale: "en", query: filters.q || undefined, location: filters.location || undefined,
    category: filters.category || undefined, jobType: filters.jobType || undefined,
    experienceLevel: filters.level || undefined, workType: filters.workType || undefined,
    currency: filters.currency || undefined, salaryMin: numberFilter(filters.minSalary) ?? undefined,
    salaryMax: numberFilter(filters.maxSalary) ?? undefined, sort: filters.sort === "salary" ? "salary" : "newest",
  }, { initialNumItems: 24 });
  const { status, results, loadMore } = query;
  useEffect(() => { if (status === "CanLoadMore" && results.length === 0) loadMore(24); }, [status, results.length, loadMore]);
  return { ...query, items: query.results.map(mapJob) };
}

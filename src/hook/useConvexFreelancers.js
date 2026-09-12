"use client";
import { useEffect } from "react";
import { useQuery, usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DISCOVERY_LIMIT, numberFilter, mapProfessional } from "@/lib/marketplaceDiscovery.mjs";
export default function useConvexFreelancers({ world = "online", query = "", location = "" } = {}) {
  const profiles = useQuery(world === "local" ? api.marketplace.freelancers.listLocal : api.marketplace.freelancers.list,
    world === "local" ? { locale: "en", limit: DISCOVERY_LIMIT, query, location } : { locale: "en", limit: DISCOVERY_LIMIT });
  return profiles?.map(mapProfessional);
}

export function useLocalDiscovery(filters = {}) {
  const query = usePaginatedQuery(api.marketplace.discovery.localProfessionals, {
    locale: "en", query: filters.q || undefined, location: filters.location || undefined,
    skill: filters.skill || undefined, language: filters.language || undefined,
    maxRate: numberFilter(filters.maxRate) ?? undefined, availableOnly: filters.available === "1", verifiedOnly: filters.verified === "1",
    sort: ["rate", "newest"].includes(filters.sort) ? filters.sort : "rating",
  }, { initialNumItems: 24 });
  const { status, results, loadMore } = query;
  useEffect(() => { if (status === "CanLoadMore" && results.length === 0) loadMore(24); }, [status, results.length, loadMore]);
  return { ...query, items: query.results.map(mapProfessional) };
}

export function useOnlineDiscovery(filters = {}) {
  const query = usePaginatedQuery(api.marketplace.discovery.onlineProfessionals, {
    locale: "en", query: filters.q || undefined, location: filters.location || undefined,
    skill: filters.skill || undefined, language: filters.language || undefined,
    maxRate: numberFilter(filters.maxRate) ?? undefined, minRating: numberFilter(filters.minRating) ?? undefined,
    level: filters.level || undefined, availableOnly: filters.available === "1", verifiedOnly: filters.verified === "1",
    sort: ["rating", "rate", "newest"].includes(filters.sort) ? filters.sort : "rating",
  }, { initialNumItems: 24 });
  const { status, results, loadMore } = query;
  useEffect(() => { if (status === "CanLoadMore" && results.length === 0) loadMore(24); }, [status, results.length, loadMore]);
  return { ...query, items: query.results.map(mapProfessional) };
}

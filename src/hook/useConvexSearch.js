"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { mapGigToProduct } from "./useConvexGigs";

export default function useConvexSearch(query) {
  const isSearching = query?.trim().length >= 2;

  const searchResults = useQuery(
    api.marketplace.gigs.search,
    isSearching ? { query: query.trim(), locale: "en" } : "skip"
  );

  const listResults = useQuery(
    api.marketplace.gigs.list,
    isSearching ? "skip" : { locale: "en" }
  );

  const raw = isSearching ? searchResults : listResults;
  if (raw === undefined) return undefined;
  return raw.map(mapGigToProduct);
}

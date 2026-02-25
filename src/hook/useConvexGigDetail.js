"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function useConvexGigDetail(slug) {
  return useQuery(
    api.marketplace.gigs.getBySlug,
    slug ? { slug, locale: "en" } : "skip"
  );
}

"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function useConvexJobDetail(slug) {
  return useQuery(
    api.marketplace.jobs.getBySlug,
    slug ? { slug, locale: "en" } : "skip"
  );
}

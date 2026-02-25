"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function useConvexProjectDetail(slug) {
  return useQuery(
    api.marketplace.projects.getBySlug,
    slug ? { slug, locale: "en" } : "skip"
  );
}

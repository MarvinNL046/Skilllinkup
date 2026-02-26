"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function useConvexPlatform(slug, locale = "en") {
  const data = useQuery(
    api.platforms.getBySlug,
    slug ? { slug, locale } : "skip"
  );
  if (data === undefined) return undefined; // loading
  return data; // platform object or null (not found)
}

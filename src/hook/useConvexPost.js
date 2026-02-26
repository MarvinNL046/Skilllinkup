"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function useConvexPost(slug, locale = "en") {
  const data = useQuery(
    api.posts.getBySlug,
    slug ? { slug, locale } : "skip"
  );
  if (data === undefined) return undefined; // loading
  return data; // post object or null (not found)
}

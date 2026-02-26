"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function useConvexPlatforms(locale = "en") {
  const data = useQuery(api.platforms.list, { locale });
  if (data === undefined) return undefined; // loading
  return data ?? [];
}

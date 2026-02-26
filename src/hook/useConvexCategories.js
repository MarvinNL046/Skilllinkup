"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function useConvexCategories(locale = "en") {
  return useQuery(api.marketplace.categories.list, { locale });
}

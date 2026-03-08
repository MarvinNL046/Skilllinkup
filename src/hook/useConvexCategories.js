"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function useConvexCategories(locale = "en", serviceType) {
  const args = { locale };
  if (serviceType) args.serviceType = serviceType;
  return useQuery(api.marketplace.categories.list, args);
}

"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Convex IDs are long base-32 strings, not plain numbers
function isConvexId(id) {
  return id && typeof id === "string" && id.length > 10 && !/^\d+$/.test(id);
}

export default function useConvexFreelancerDetail(profileId) {
  return useQuery(
    api.marketplace.freelancers.getById,
    isConvexId(profileId) ? { profileId } : "skip"
  );
}

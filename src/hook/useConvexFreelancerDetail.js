"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Convex IDs are alphanumeric strings (no hyphens, underscores, or special chars)
function isConvexId(id) {
  return id && typeof id === "string" && id.length > 10 && /^[a-zA-Z0-9]+$/.test(id);
}

export default function useConvexFreelancerDetail(profileId) {
  return useQuery(
    api.marketplace.freelancers.getById,
    isConvexId(profileId) ? { profileId } : "skip"
  );
}

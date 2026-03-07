"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Convex IDs are alphanumeric strings (no hyphens, underscores, or special chars)
function isConvexId(id) {
  return id && typeof id === "string" && id.length > 10 && /^[a-zA-Z0-9]+$/.test(id);
}

export default function useConvexFreelancerDetail(idOrSlug) {
  // If it looks like a Convex ID, query by ID; otherwise query by slug
  const isId = isConvexId(idOrSlug);

  const byId = useQuery(
    api.marketplace.freelancers.getById,
    isId ? { profileId: idOrSlug } : "skip"
  );

  const bySlug = useQuery(
    api.marketplace.freelancers.getBySlug,
    !isId && idOrSlug ? { slug: idOrSlug } : "skip"
  );

  return isId ? byId : bySlug;
}

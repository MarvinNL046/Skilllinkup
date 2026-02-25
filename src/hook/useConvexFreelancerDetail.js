"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function useConvexFreelancerDetail(profileId) {
  return useQuery(
    api.marketplace.freelancers.getById,
    profileId ? { profileId } : "skip"
  );
}

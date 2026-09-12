"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
export default function useConvexFreelancerDetail(idOrSlug, world = "online") {
  const isId = typeof idOrSlug === "string" && /^[a-z0-9]{32}$/i.test(idOrSlug);
  const local = world === "local";
  const byId = useQuery(local ? api.marketplace.freelancers.getLocalById : api.marketplace.freelancers.getById, isId ? { profileId: idOrSlug } : "skip");
  const bySlug = useQuery(local ? api.marketplace.freelancers.getLocalBySlug : api.marketplace.freelancers.getBySlug, !isId && idOrSlug ? { slug: idOrSlug } : "skip");
  return isId ? byId : bySlug;
}

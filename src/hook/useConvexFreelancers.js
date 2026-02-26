"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function mapConvexFreelancer(fl, index) {
  return {
    id: index + 1,
    _id: fl._id,
    img: fl.avatarUrl || "/images/team/fl-1.png",
    name: fl.displayName || "Freelancer",
    profession: fl.tagline || "Professional",
    rating: fl.ratingAverage || 0,
    reviews: fl.ratingCount || 0,
    tags: fl.skills || [],
    skill: fl.tagline || "",
    price: fl.hourlyRate || 0,
    location: fl.locationCountry?.toLowerCase() || "remote",
    level: fl.isVerified ? "top-rated" : "new",
    language: fl.languages?.[0] || "",
    sort: "best-seller",
    title: fl.bio ? fl.bio.substring(0, 80) : "",
    slug: fl._id,
  };
}

export default function useConvexFreelancers() {
  const convexFreelancers = useQuery(api.marketplace.freelancers.list, { locale: "en" });

  // undefined means still loading
  if (convexFreelancers === undefined) {
    return undefined;
  }

  // Map Convex data (may be empty array)
  return convexFreelancers.map(mapConvexFreelancer);
}

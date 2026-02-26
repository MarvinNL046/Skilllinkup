"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Maps Convex gig data to SkillLinkup product format
function mapGigToProduct(gig, index) {
  return {
    id: index + 1,
    _id: gig._id,
    img: gig.firstImage?.url || "/images/listings/g-1.jpg",
    img2: gig.firstImage?.url || "/images/listings/g-1.jpg",
    category: gig.category?.name || "Uncategorized",
    title: gig.title || "Untitled Service",
    rating: gig.ratingAverage || 0,
    review: gig.ratingCount || 0,
    author: {
      img: gig.freelancerProfile?.avatarUrl || "/images/team/fl-1.png",
      name: gig.freelancerProfile?.displayName || "Freelancer",
    },
    price: gig.minPrice || 0,
    tag: gig.category?.name || "General",
    deliveryTime: "3d",
    level: gig.isFeatured ? "top-rated" : "lavel-1",
    location: gig.locationCountry?.toLowerCase() || "remote",
    sort: gig.isFeatured ? "best-seller" : "new-arrivals",
    tool: "",
    language: "",
    slug: gig.slug,
  };
}

export default function useConvexGigs() {
  const convexGigs = useQuery(api.marketplace.gigs.list, { locale: "en" });

  // undefined means still loading
  if (convexGigs === undefined) {
    return undefined;
  }

  // Map Convex data (may be empty array)
  return convexGigs.map(mapGigToProduct);
}

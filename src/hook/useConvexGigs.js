"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { product1 } from "@/data/product";

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

  // If Convex returns data, map it; otherwise fallback to static data
  if (convexGigs && convexGigs.length > 0) {
    return convexGigs.map(mapGigToProduct);
  }

  // Fallback to static data when Convex is empty
  return product1;
}

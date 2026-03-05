"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function mapConvexClient(client, index) {
  return {
    id: index + 1,
    _id: client._id,
    img: client.avatar || "/images/team/client-1.png",
    server: client.name || "Client",
    rating: 0,
    review: 0,
    location: client.locationCity || client.locationCountry || "Remote",
    bio: client.bio || "",
    email: client.email || "",
    createdAt: client.createdAt || null,
    // Fields used by filters in Listing12
    category: "",
    jobs: 0,
    sort: "best-seller",
  };
}

export default function useConvexClients() {
  const convexClients = useQuery(api.marketplace.clients.list, { limit: 20 });

  // undefined means still loading
  if (convexClients === undefined) {
    return undefined;
  }

  // Map Convex data (may be empty array)
  return convexClients.map(mapConvexClient);
}

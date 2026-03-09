"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import useConvexUser from "./useConvexUser";

export default function useConvexDashboardStats() {
  const { convexUser } = useConvexUser();

  // Single combined query: fetches orders once and derives both stats and
  // recentOrders from the same data, halving the number of Convex round-trips.
  const dashboardData = useQuery(
    api.marketplace.dashboard.getCombined,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  return {
    stats: dashboardData?.stats ?? null,
    recentOrders: dashboardData?.recentOrders ?? [],
    isLoading: dashboardData === undefined,
    user: convexUser,
  };
}

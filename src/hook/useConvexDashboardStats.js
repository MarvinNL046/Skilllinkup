"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import useConvexUser from "./useConvexUser";

export default function useConvexDashboardStats() {
  const { convexUser } = useConvexUser();

  const stats = useQuery(
    api.marketplace.dashboard.getStats,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  const recentOrders = useQuery(
    api.marketplace.dashboard.getRecentOrders,
    convexUser?._id ? { userId: convexUser._id, limit: 5 } : "skip"
  );

  return {
    stats,
    recentOrders,
    isLoading: stats === undefined || recentOrders === undefined,
    user: convexUser,
  };
}

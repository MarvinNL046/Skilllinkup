"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import useConvexUser from "./useConvexUser";

export default function useConvexOrders(role = "client") {
  const { convexUser } = useConvexUser();
  const orders = useQuery(
    api.marketplace.orders.getByUser,
    convexUser?._id ? { userId: convexUser._id, role, limit: 50 } : "skip"
  );
  return { orders, isLoading: orders === undefined, user: convexUser };
}

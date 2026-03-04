"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import useConvexUser from "./useConvexUser";

export default function useConvexOrders(role = "client") {
  const { convexUser, isLoaded } = useConvexUser();
  const orders = useQuery(
    api.marketplace.orders.getByUser,
    convexUser?._id ? { userId: convexUser._id, role, limit: 50 } : "skip"
  );
  // isLoading is true until auth resolves AND (if logged in) until the query returns data
  const isLoading = !isLoaded || (!!convexUser?._id && orders === undefined);
  return { orders: orders ?? [], isLoading, user: convexUser };
}

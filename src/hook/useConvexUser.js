"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function useConvexUser() {
  const { user: clerkUser, isLoaded } = useUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress;

  const convexUser = useQuery(
    api.users.getByEmail,
    email ? { email } : "skip"
  );

  return {
    clerkUser,
    convexUser,
    isLoaded,
    isAuthenticated: isLoaded && !!clerkUser,
  };
}

"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function useConvexUser() {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();

  const convexUser = useQuery(
    api.users.getCurrentUser,
    isLoaded && isSignedIn ? {} : "skip"
  );

  return {
    clerkUser,
    convexUser,
    isLoaded,
    isAuthenticated: isLoaded && !!clerkUser,
  };
}

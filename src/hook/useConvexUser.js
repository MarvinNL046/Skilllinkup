"use client";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function useConvexUser() {
  const {
    user: clerkUser,
    isLoaded: isClerkLoaded,
    isSignedIn,
  } = useUser();
  const {
    isAuthenticated: isConvexAuthenticated,
    isLoading: isConvexAuthLoading,
  } = useConvexAuth();

  const isLoaded = isClerkLoaded && !isConvexAuthLoading;
  const isAuthenticated =
    isLoaded && Boolean(isSignedIn) && isConvexAuthenticated;

  const convexUser = useQuery(
    api.users.getCurrentUser,
    isAuthenticated ? {} : "skip"
  );

  return {
    clerkUser,
    convexUser,
    isLoaded,
    isClerkSignedIn: isClerkLoaded && Boolean(isSignedIn),
    isConvexAuthLoading,
    isAuthenticated,
  };
}

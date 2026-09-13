"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import useConvexUser from "./useConvexUser";

export default function useMyProjectProposal(projectId) {
  const { isAuthenticated } = useConvexUser();
  return useQuery(
    api.marketplace.myProposal.get,
    isAuthenticated && projectId && projectId !== "demo-project"
      ? { projectId }
      : "skip",
  );
}

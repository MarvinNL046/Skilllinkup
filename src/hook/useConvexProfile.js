"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import useConvexUser from "./useConvexUser";

export default function useConvexProfile() {
  const { convexUser } = useConvexUser();

  const profile = useQuery(
    api.marketplace.freelancers.getByUserId,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  const updateProfile = useMutation(api.marketplace.freelancers.updateProfile);

  return { convexUser, profile, updateProfile };
}

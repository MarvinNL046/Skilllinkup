"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import useConvexProfile from "./useConvexProfile";

export default function useConvexMyGigs() {
  const { profile } = useConvexProfile();

  const gigs = useQuery(
    api.marketplace.gigs.getAllByFreelancer,
    profile?._id ? { freelancerId: profile._id } : "skip"
  );

  const updateGig = useMutation(api.marketplace.gigs.update);
  const removeGig = useMutation(api.marketplace.gigs.remove);

  return {
    gigs: gigs || [],
    updateGig,
    removeGig,
    freelancerId: profile?._id,
  };
}

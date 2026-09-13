"use client";
import { useQuery, usePaginatedQuery } from "convex/react";
import { useCallback, useState } from "react";
import { api } from "../../convex/_generated/api";
import useConvexUser from "./useConvexUser";
export default function useConvexOrders(role = "client") {
  const { convexUser, isLoaded } = useConvexUser();
  const [choice, setChoice] = useState(null);
  const profiles = useQuery(
    api.marketplace.orderPages.profiles,
    convexUser?._id && role === "freelancer" ? {} : "skip",
  );
  const profileId =
    profiles?.find((p) => p.id === choice)?.id ?? profiles?.[0]?.id;
  const ready = !!convexUser?._id && (role === "client" || !!profileId);
  const { results, status, loadMore } = usePaginatedQuery(
    api.marketplace.orderPages.list,
    ready ? { role, ...(role === "freelancer" ? { profileId } : {}) } : "skip",
    { initialNumItems: 20 },
  );
  const loadNextPage = useCallback(() => loadMore(20), [loadMore]);
  return {
    orders: ready ? results : [],
    isLoading:
      !isLoaded ||
      (!!convexUser?._id &&
        ((role === "freelancer" && profiles === undefined) ||
          (ready && status === "LoadingFirstPage"))),
    profiles: profiles ?? [],
    profileId,
    setProfileId: setChoice,
    canLoadMore: ready && status === "CanLoadMore",
    loadingMore: ready && status === "LoadingMore",
    loadMore: loadNextPage,
    user: convexUser,
  };
}

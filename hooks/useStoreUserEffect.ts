"use client";

import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { useEffect, useRef } from "react";
import { api } from "@/convex/_generated/api";

/**
 * Syncs the currently logged-in Clerk user to the Convex users table.
 * Should be mounted once in the app (e.g., in ConvexClientProvider or layout).
 */
export function useStoreUserEffect() {
  const { isAuthenticated } = useConvexAuth();
  const { user: clerkUser } = useUser();
  const syncUser = useMutation(api.users.syncUser);
  const hasSynced = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || !clerkUser || hasSynced.current) return;

    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if (!email) return;

    const name = clerkUser.firstName
      ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
      : email.split("@")[0];

    syncUser({
      email,
      name,
      image: clerkUser.imageUrl || undefined,
      clerkId: clerkUser.id,
      userType:
        (clerkUser.publicMetadata?.userType as string) || "client",
    })
      .then(() => {
        hasSynced.current = true;
      })
      .catch((err) => {
        console.error("[useStoreUserEffect] sync failed:", err);
      });
  }, [isAuthenticated, clerkUser, syncUser]);
}

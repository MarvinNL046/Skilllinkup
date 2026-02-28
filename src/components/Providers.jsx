"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import ConvexUserSync from "./ConvexUserSync";
import { useEffect, useCallback } from "react";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL
);

/**
 * Syncs Clerk auth token to Convex client when available.
 * Unlike ConvexProviderWithClerk, this does NOT block public queries
 * while auth is loading — so pages like /platforms work immediately.
 */
function ClerkConvexAdapter() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const fetchToken = useCallback(
    async ({ forceRefreshToken }) => {
      try {
        const token = await getToken({
          template: "convex",
          skipCache: forceRefreshToken,
        });
        return token ?? null;
      } catch (err) {
        console.warn("Clerk JWT template 'convex' not available:", err.message);
        return null;
      }
    },
    [getToken]
  );

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      convex.setAuth(fetchToken);
    } else {
      convex.clearAuth();
    }
  }, [isLoaded, isSignedIn, fetchToken]);

  return null;
}

export default function Providers({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProvider client={convex}>
        <ClerkConvexAdapter />
        <ConvexUserSync />
        {children}
      </ConvexProvider>
    </ClerkProvider>
  );
}

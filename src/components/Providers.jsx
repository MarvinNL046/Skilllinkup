"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import ConvexUserSync from "./ConvexUserSync";
import { useCallback } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

function useConvexClerkAuth() {
  const auth = useAuth();
  const { getToken: getClerkToken } = auth;
  const getToken = useCallback(
    (options) => getClerkToken({ ...options, template: "convex" }),
    [getClerkToken],
  );

  // Account synchronization needs the signed email claim from our JWT template.
  // Clerk's session token can have the Convex audience without that claim.
  return { ...auth, getToken };
}

export default function Providers({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl="/login"
      signUpUrl="/register"
    >
      <ConvexProviderWithClerk client={convex} useAuth={useConvexClerkAuth}>
        <ConvexUserSync />
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

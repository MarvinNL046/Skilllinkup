"use client";
import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { hasCompletedActiveContext } from "@/lib/accountContext.mjs";
import { onboardingUrl } from "@/lib/onboardingRedirect.mjs";

export default function ConvexUserSync() {
    const { user, isSignedIn } = useUser();
    const { isAuthenticated, isLoading } = useConvexAuth();
    const syncUser = useMutation(api.users.syncUser);
    const convexUser = useQuery(
        api.users.getCurrentUser,
        isAuthenticated ? {} : "skip"
    );
    const hasSynced = useRef(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && isSignedIn && isAuthenticated && user && !hasSynced.current) {
            hasSynced.current = true;
            syncUser({
                email: user.primaryEmailAddress?.emailAddress || "",
                name: user.fullName || user.firstName || "User",
                image: user.imageUrl || "",
                clerkId: user.id,
            }).catch((err) => {
                console.error("Failed to sync user to Convex:", err);
                hasSynced.current = false;
            });
        }
    }, [isAuthenticated, isLoading, isSignedIn, user, syncUser]);

    useEffect(() => {
        if (!isSignedIn) {
            hasSynced.current = false;
        }
    }, [isSignedIn]);

    // Redirect to onboarding if user hasn't completed it yet and tries to access dashboard
    useEffect(() => {
        if (
            convexUser &&
            !hasCompletedActiveContext(convexUser) &&
            pathname.startsWith("/dashboard") &&
            pathname !== "/onboarding"
        ) {
            router.replace(onboardingUrl(window.location.pathname + window.location.search + window.location.hash));
        }
    }, [convexUser, pathname, router]);

    return null;
}

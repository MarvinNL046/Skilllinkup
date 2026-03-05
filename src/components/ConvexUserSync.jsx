"use client";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ConvexUserSync() {
    const { user, isSignedIn } = useUser();
    const syncUser = useMutation(api.users.syncUser);
    const convexUser = useQuery(api.users.getCurrentUser);
    const hasSynced = useRef(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isSignedIn && user && !hasSynced.current) {
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
    }, [isSignedIn, user, syncUser]);

    // Redirect to onboarding if user hasn't completed it yet and tries to access dashboard
    useEffect(() => {
        if (
            convexUser &&
            !convexUser.userType &&
            pathname.startsWith("/dashboard") &&
            pathname !== "/onboarding"
        ) {
            router.replace("/onboarding");
        }
    }, [convexUser, pathname, router]);

    return null;
}

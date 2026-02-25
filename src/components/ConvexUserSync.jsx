"use client";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect, useRef } from "react";

export default function ConvexUserSync() {
    const { user, isSignedIn } = useUser();
    const syncUser = useMutation(api.users.syncUser);
    const hasSynced = useRef(false);

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

    return null;
}

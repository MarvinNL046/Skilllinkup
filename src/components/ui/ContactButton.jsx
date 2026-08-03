"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";

export default function ContactButton({
  recipientId,
  profileId,
  gigId,
  className = "",
}) {
  const t = useTranslations("contactButton");
  const { isSignedIn } = useUser();
  const { convexUser } = useConvexUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const openConversation = useMutation(api.chat.conversations.openForContext);

  const handleContact = async () => {
    if (!isSignedIn) {
      const returnUrl = typeof window !== "undefined" ? window.location.pathname : "";
      router.push(`/login?redirect_url=${encodeURIComponent(returnUrl)}`);
      return;
    }
    if (!convexUser?._id || convexUser._id === recipientId) return;
    const context = gigId
      ? { type: "gig_inquiry", gigId }
      : profileId
        ? { type: "profile_inquiry", freelancerProfileId: profileId }
        : null;
    if (!context) return;

    setIsLoading(true);
    try {
      const conversationId = await openConversation({ context });
      router.push(`/message?conversation=${conversationId}`);
    } catch (err) {
      console.error("Failed to create conversation:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show button if viewing own profile
  if (convexUser?._id === recipientId || (!profileId && !gigId)) return null;

  return (
    <button
      className={`btn btn--secondary ${className}`}
      onClick={handleContact}
      disabled={isLoading}
      style={{ justifyContent: "center" }}
    >
      <Mail size={16} />
      {isLoading ? t("openingChat") : t("contact")}
    </button>
  );
}

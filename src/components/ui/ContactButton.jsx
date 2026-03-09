"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { api } from "../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";

export default function ContactButton({ recipientId, className = "" }) {
  const t = useTranslations("contactButton");
  const { isSignedIn } = useUser();
  const { convexUser } = useConvexUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const createConversation = useMutation(api.chat.conversations.create);

  const handleContact = async () => {
    if (!isSignedIn) {
      const returnUrl = typeof window !== "undefined" ? window.location.pathname : "";
      router.push(`/login?redirect_url=${encodeURIComponent(returnUrl)}`);
      return;
    }
    if (!convexUser?._id || !recipientId || convexUser._id === recipientId) return;

    setIsLoading(true);
    try {
      await createConversation({
        participant1: convexUser._id,
        participant2: recipientId,
      });
      router.push("/message");
    } catch (err) {
      console.error("Failed to create conversation:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show button if viewing own profile
  if (convexUser?._id === recipientId) return null;

  return (
    <button
      className={`ud-btn btn-thm2 ${className}`}
      onClick={handleContact}
      disabled={isLoading}
    >
      {isLoading ? t("openingChat") : t("contact")}
      <i className="fal fa-envelope ms-2"></i>
    </button>
  );
}

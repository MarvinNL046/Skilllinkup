"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { LoaderCircle, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

export default function ContextMessageButton({
  context,
  label = "Message",
  className,
  variant = "outline",
  size = "sm",
  disabled = false,
}) {
  const router = useRouter();
  const openConversation = useMutation(api.chat.conversations.openForContext);
  const [opening, setOpening] = useState(false);

  async function handleOpen() {
    if (!context || opening) return;
    setOpening(true);
    try {
      const conversationId = await openConversation({ context });
      router.push(`/message?conversation=${conversationId}`);
    } catch (error) {
      toast.error(error?.message || "The conversation could not be opened.");
      setOpening(false);
    }
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={handleOpen}
      disabled={disabled || opening}
    >
      {opening ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
      {opening ? "Opening…" : label}
    </Button>
  );
}

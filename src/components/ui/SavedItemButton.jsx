"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";

export default function SavedItemButton({ itemType, itemId, title, image, href, className = "", showLabel = false, disabled = false }) {
  const { isAuthenticated, isClerkSignedIn, convexUser } = useConvexUser();
  const ready = isAuthenticated && Boolean(convexUser?._id);
  const saved = useQuery(api.marketplace.savedItems.isSaved, ready && !disabled ? { itemId: String(itemId) } : "skip");
  const save = useMutation(api.marketplace.savedItems.save);
  const remove = useMutation(api.marketplace.savedItems.remove);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  async function toggle() {
    if (!isClerkSignedIn) {
      const returnUrl = `${pathname}${params.size ? `?${params}` : ""}`;
      router.push(`/login?redirect_url=${encodeURIComponent(returnUrl)}`);
      return;
    }
    if (!ready || saved === undefined || busy) return;
    setBusy(true);
    try {
      if (saved) await remove({ itemId: String(itemId) });
      else await save({ itemType, itemId: String(itemId), itemTitle: title, itemImage: image || undefined, itemUrl: href });
      toast.success(saved ? "Removed from saved items" : "Added to saved items");
    } catch (error) { toast.error(error?.message || "Could not update saved items. Please try again."); }
    finally { setBusy(false); }
  }
  return <button type="button" className={className} onClick={toggle} disabled={disabled || busy || (isClerkSignedIn && (!ready || saved === undefined))} aria-pressed={Boolean(saved)} aria-label={saved ? `Remove ${title} from saved items` : `Save ${title}`}><Heart size={18} fill={saved ? "currentColor" : "none"} />{showLabel ? (busy ? "Saving…" : saved ? "Saved" : "Save") : null}</button>;
}

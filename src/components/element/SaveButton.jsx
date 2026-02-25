"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";

export default function SaveButton({ itemId, itemType, itemTitle, itemImage, itemUrl }) {
  const { convexUser } = useConvexUser();
  const userId = convexUser?._id;

  const isSaved = useQuery(
    api.marketplace.savedItems.isSaved,
    userId && itemId ? { userId, itemId: String(itemId) } : "skip"
  );
  const saveItem = useMutation(api.marketplace.savedItems.save);
  const removeItem = useMutation(api.marketplace.savedItems.remove);

  if (!userId) return null;

  const handleToggle = async () => {
    if (isSaved) {
      await removeItem({ userId, itemId: String(itemId) });
    } else {
      await saveItem({
        userId,
        itemType: itemType || "gig",
        itemId: String(itemId),
        itemTitle,
        itemImage,
        itemUrl,
      });
    }
  };

  return (
    <button
      className={`icon ${isSaved ? "text-thm" : ""}`}
      onClick={handleToggle}
      title={isSaved ? "Remove from saved" : "Save"}
    >
      <span className={isSaved ? "fas fa-heart" : "far fa-heart"} />
    </button>
  );
}

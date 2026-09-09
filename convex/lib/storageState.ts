import { v } from "convex/values";

export const uploadPurposeValidator = v.union(
  v.literal("avatar"),
  v.literal("cover"),
  v.literal("portfolio_image"),
  v.literal("gig_image"),
  v.literal("resume"),
  v.literal("deliverable"),
);

export type UploadPurpose =
  "avatar" | "cover" | "portfolio_image" | "gig_image" | "resume" | "deliverable";

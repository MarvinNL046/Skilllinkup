import { v } from "convex/values";
import {
  paginationOptsValidator,
  paginationResultValidator,
} from "convex/server";
import { mutation, query, type QueryCtx } from "../_generated/server";
import type { Doc, Id } from "../_generated/dataModel";
import {
  requireAuthUser,
  requireMarketplaceContext,
  requireServerSecret,
} from "../lib/authHelpers";
import {
  claimStoredFile,
  releaseStoredFile,
  DOCUMENT_CONTENT_TYPES,
} from "../lib/storageValidation";
import { rateLimiter } from "../lib/rateLimits";

const fields = {
  displayName: v.string(),
  headline: v.string(),
  location: v.string(),
  summary: v.string(),
  skills: v.array(v.string()),
  discoverable: v.boolean(),
  shareResume: v.boolean(),
};
const profileView = v.object({
  _id: v.id("candidateProfiles"),
  ...fields,
  resumeName: v.union(v.string(), v.null()),
  resumeType: v.union(v.string(), v.null()),
  resumeSize: v.union(v.number(), v.null()),
  resumeUrl: v.union(v.string(), v.null()),
  updatedAt: v.number(),
});
const directoryView = v.object({
  _id: v.id("candidateProfiles"),
  displayName: v.string(),
  headline: v.string(),
  location: v.string(),
  summary: v.string(),
  skills: v.array(v.string()),
  resumeUrl: v.union(v.string(), v.null()),
});
function ownView(profile: Doc<"candidateProfiles">) {
  return {
    _id: profile._id,
    displayName: profile.displayName,
    headline: profile.headline,
    location: profile.location,
    summary: profile.summary,
    skills: profile.skills,
    discoverable: profile.discoverable,
    shareResume: profile.shareResume,
    resumeName: profile.resumeName ?? null,
    resumeType: profile.resumeType ?? null,
    resumeSize: profile.resumeSize ?? null,
    resumeUrl: profile.resumeStorageId
      ? `/api/candidate-profiles/${profile._id}/resume`
      : null,
    updatedAt: profile.updatedAt,
  };
}
async function requireEmployer(ctx: QueryCtx) {
  const user = await requireAuthUser(ctx);
  requireMarketplaceContext(user, "company", "jobs", "finding candidates");
  if (user.companyVerificationStatus !== "verified" || user.deletionRequestedAt)
    throw new Error("Company verification is required to find candidates.");
  return user;
}
export const getMine = query({
  args: {},
  returns: v.union(profileView, v.null()),
  handler: async (ctx) => {
    const user = await requireAuthUser(ctx);
    const profile = await ctx.db
      .query("candidateProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    return profile ? ownView(profile) : null;
  },
});

// Server-only attachment parameters: browser clients cannot claim arbitrary storage IDs.
export const save = mutation({
  args: {
    ...fields,
    expectedUpdatedAt: v.number(),
    resumeStorageId: v.optional(v.id("_storage")),
    resumeName: v.optional(v.string()),
    serverSecret: v.optional(v.string()),
  },
  returns: profileView,
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    requireMarketplaceContext(
      user,
      "candidate",
      "jobs",
      "editing your candidate profile",
    );
    if (user.deletionRequestedAt)
      throw new Error(
        "Cancel your account deletion request before editing your profile.",
      );
    const current = await ctx.db
      .query("candidateProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if ((current?.updatedAt ?? 0) !== args.expectedUpdatedAt)
      throw new Error(
        "Your profile changed in another tab. Reload before saving.",
      );
    const displayName = args.displayName.trim(),
      headline = args.headline.trim(),
      location = args.location.trim(),
      summary = args.summary.trim();
    const skills = [
      ...new Set(args.skills.map((s) => s.trim()).filter(Boolean)),
    ];
    if (
      !displayName ||
      displayName.length > 80 ||
      !headline ||
      headline.length > 120 ||
      location.length > 120 ||
      summary.length > 2000 ||
      skills.length > 12 ||
      skills.some((s) => s.length > 50)
    )
      throw new Error(
        "Add a name and headline, up to 12 skills and a summary of no more than 2,000 characters.",
      );
    if (args.shareResume && !args.discoverable)
      throw new Error(
        "Make your profile discoverable before sharing your CV with employers.",
      );
    if (args.shareResume && !(args.resumeStorageId || current?.resumeStorageId))
      throw new Error("Add a CV before enabling CV sharing.");
    let resume = {};
    if (args.resumeStorageId) {
      requireServerSecret(args.serverSecret);
      const { metadata } = await claimStoredFile(
        ctx,
        user._id,
        args.resumeStorageId,
        "resume",
        {
          maxBytes: 3 * 1024 * 1024,
          allowedContentTypes: DOCUMENT_CONTENT_TYPES,
          typeError: "Upload a PDF, DOC or DOCX CV.",
        },
      );
      resume = {
        resumeStorageId: args.resumeStorageId,
        resumeName: (args.resumeName || "CV")
          .replace(/[\x00-\x1f\x7f]/g, "")
          .slice(0, 150),
        resumeType: metadata.contentType,
        resumeSize: metadata.size,
      };
    }
    const now = Math.max(Date.now(), (current?.updatedAt ?? 0) + 1);
    const data = {
      displayName,
      headline,
      location,
      summary,
      skills,
      discoverable: args.discoverable,
      shareResume: args.shareResume,
      searchText: [displayName, headline, location, ...skills].join(" "),
      updatedAt: now,
      consentUpdatedAt:
        !current ||
        current.discoverable !== args.discoverable ||
        current.shareResume !== args.shareResume
          ? now
          : current.consentUpdatedAt,
      ...resume,
    };
    let id: Id<"candidateProfiles">;
    if (current) {
      await ctx.db.patch(current._id, data);
      id = current._id;
      if (args.resumeStorageId && current.resumeStorageId)
        await releaseStoredFile(ctx, current.resumeStorageId);
    } else
      id = await ctx.db.insert("candidateProfiles", {
        ...data,
        tenantId: user.tenantId,
        userId: user._id,
        createdAt: now,
      });
    return ownView((await ctx.db.get(id))!);
  },
});

export const removeResume = mutation({
  args: { expectedUpdatedAt: v.number() },
  returns: profileView,
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const profile = await ctx.db
      .query("candidateProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!profile || profile.updatedAt !== args.expectedUpdatedAt)
      throw new Error("Your profile changed. Reload before removing the CV.");
    if (profile.resumeStorageId)
      await releaseStoredFile(ctx, profile.resumeStorageId);
    await ctx.db.patch(profile._id, {
      resumeStorageId: undefined,
      resumeName: undefined,
      resumeType: undefined,
      resumeSize: undefined,
      shareResume: false,
      updatedAt: Math.max(Date.now(), profile.updatedAt + 1),
      consentUpdatedAt: Date.now(),
    });
    return ownView((await ctx.db.get(profile._id))!);
  },
});

export const discardUnattachedResume = mutation({
  args: { storageId: v.id("_storage"), serverSecret: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
    await requireAuthUser(ctx);
    const asset = await ctx.db
      .query("fileAssets")
      .withIndex("by_storageId", (q) => q.eq("storageId", args.storageId))
      .unique();
    if (!asset) await ctx.storage.delete(args.storageId);
    return null;
  },
});

export const generateResumeUploadUrl = mutation({
  args: { serverSecret: v.string() },
  returns: v.string(),
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
    const user = await requireAuthUser(ctx);
    requireMarketplaceContext(user, "candidate", "jobs", "saving a CV");
    if (user.deletionRequestedAt)
      throw new Error("Account deletion is pending.");
    await rateLimiter.limit(ctx, "candidateCvUpload", {
      key: user._id,
      throws: true,
    });
    return ctx.storage.generateUploadUrl();
  },
});

export const listDiscoverable = query({
  args: {
    search: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  returns: paginationResultValidator(directoryView),
  handler: async (ctx, args) => {
    const employer = await requireEmployer(ctx);
    const search = args.search?.trim() ?? "";
    if (search.length > 120 || args.paginationOpts.numItems > 50)
      throw new Error(
        "Use a shorter search and load up to 50 profiles at a time.",
      );
    const result = search
      ? await ctx.db
          .query("candidateProfiles")
          .withSearchIndex("search_candidates", (q) =>
            q
              .search("searchText", search)
              .eq("tenantId", employer.tenantId)
              .eq("discoverable", true),
          )
          .paginate(args.paginationOpts)
      : await ctx.db
          .query("candidateProfiles")
          .withIndex("by_tenantId_and_discoverable", (q) =>
            q.eq("tenantId", employer.tenantId).eq("discoverable", true),
          )
          .order("desc")
          .paginate(args.paginationOpts);
    const page = [];
    for (const profile of result.page) {
      const owner = await ctx.db.get(profile.userId);
      if (!owner || owner.deletionRequestedAt) continue;
      page.push({
        _id: profile._id,
        displayName: profile.displayName,
        headline: profile.headline,
        location: profile.location,
        summary: profile.summary,
        skills: profile.skills,
        resumeUrl:
          profile.shareResume && profile.resumeStorageId
            ? `/api/candidate-profiles/${profile._id}/resume`
            : null,
      });
    }
    return { ...result, page };
  },
});

export const getResumeDownload = query({
  args: {
    profileId: v.id("candidateProfiles"),
    serverSecret: v.string(),
    expectedUpdatedAt: v.optional(v.number()),
  },
  returns: v.union(
    v.null(),
    v.object({ url: v.string(), contentType: v.string() }),
  ),
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
    const user = await requireAuthUser(ctx);
    const profile = await ctx.db.get(args.profileId);
    if (!profile?.resumeStorageId) return null;
    if (
      args.expectedUpdatedAt !== undefined &&
      args.expectedUpdatedAt !== profile.updatedAt
    )
      throw new Error(
        "The saved CV changed. Review it before attaching a copy.",
      );
    if (profile.userId !== user._id) {
      const employer = await requireEmployer(ctx);
      const owner = await ctx.db.get(profile.userId);
      if (
        !owner ||
        owner.deletionRequestedAt ||
        employer.tenantId !== profile.tenantId ||
        !profile.discoverable ||
        !profile.shareResume
      )
        throw new Error("This CV is private.");
    }
    const meta = await ctx.db.system.get("_storage", profile.resumeStorageId);
    if (!meta?.contentType || !DOCUMENT_CONTENT_TYPES.has(meta.contentType))
      return null;
    const url = await ctx.storage.getUrl(profile.resumeStorageId);
    return url ? { url, contentType: meta.contentType } : null;
  },
});

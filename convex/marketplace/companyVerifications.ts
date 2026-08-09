import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import {
  requireAdmin,
  requireAuthUser,
  requireMarketplaceContext,
} from "../lib/authHelpers";
import { companyVerificationStatusValidator } from "../lib/marketplaceState";
import { notifyUser } from "../lib/notifications";
import { rateLimiter } from "../lib/rateLimits";

const requestValidator = v.object({
  _id: v.id("companyVerificationRequests"),
  _creationTime: v.number(),
  tenantId: v.id("tenants"),
  userId: v.id("users"),
  companyName: v.string(),
  website: v.string(),
  registrationNumber: v.string(),
  country: v.string(),
  evidence: v.string(),
  status: companyVerificationStatusValidator,
  adminNote: v.optional(v.string()),
  reviewedBy: v.optional(v.id("users")),
  submittedAt: v.number(),
  reviewedAt: v.optional(v.number()),
  createdAt: v.number(),
  updatedAt: v.number(),
});

const adminRequestValidator = v.object({
  ...requestValidator.fields,
  userName: v.string(),
  userEmail: v.string(),
});

function cleanText(value: string, label: string, min: number, max: number) {
  const cleaned = value.trim();
  if (cleaned.length < min || cleaned.length > max) {
    throw new Error(`${label} must be between ${min} and ${max} characters.`);
  }
  return cleaned;
}

function cleanWebsite(value: string) {
  const cleaned = cleanText(value, "Website", 8, 300);
  let url: URL;
  try {
    url = new URL(cleaned);
  } catch {
    throw new Error("Enter a valid company website.");
  }
  if (url.protocol !== "https:") {
    throw new Error("The company website must use HTTPS.");
  }
  url.hash = "";
  return url.toString();
}

export const getMine = query({
  args: {},
  returns: v.union(v.null(), requestValidator),
  handler: async (ctx) => {
    const user = await requireAuthUser(ctx);
    requireMarketplaceContext(
      user,
      "company",
      "jobs",
      "managing company verification",
    );
    return await ctx.db
      .query("companyVerificationRequests")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .first();
  },
});

export const submit = mutation({
  args: {
    companyName: v.string(),
    website: v.string(),
    registrationNumber: v.string(),
    country: v.string(),
    evidence: v.string(),
  },
  returns: v.object({ requestId: v.id("companyVerificationRequests") }),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    requireMarketplaceContext(
      user,
      "company",
      "jobs",
      "requesting company verification",
    );
    if (user.companyVerificationStatus === "verified") {
      throw new Error("This company is already verified.");
    }
    await rateLimiter.limit(ctx, "companyVerification", {
      key: user._id,
      throws: true,
    });
    const pending = await ctx.db
      .query("companyVerificationRequests")
      .withIndex("by_user_and_status", (q) =>
        q.eq("userId", user._id).eq("status", "pending"),
      )
      .first();
    if (pending)
      throw new Error("A verification request is already being reviewed.");

    const companyName = cleanText(args.companyName, "Company name", 2, 120);
    const website = cleanWebsite(args.website);
    const registrationNumber = cleanText(
      args.registrationNumber,
      "Registration number",
      4,
      50,
    );
    const country = cleanText(args.country, "Country", 2, 80);
    const evidence = cleanText(args.evidence, "Verification details", 40, 2000);
    const now = Date.now();
    const requestId = await ctx.db.insert("companyVerificationRequests", {
      tenantId: user.tenantId,
      userId: user._id,
      companyName,
      website,
      registrationNumber,
      country,
      evidence,
      status: "pending",
      submittedAt: now,
      createdAt: now,
      updatedAt: now,
    });
    await ctx.db.patch(user._id, {
      companyName,
      companyVerificationStatus: "pending",
      updatedAt: now,
    });
    await ctx.db.insert("moderationAuditEvents", {
      tenantId: user.tenantId,
      actorId: user._id,
      action: "company_verification_submitted",
      targetType: "company_verification",
      targetId: requestId,
      fromStatus: user.companyVerificationStatus ?? "unverified",
      toStatus: "pending",
      createdAt: now,
    });
    return { requestId };
  },
});

export const listForAdmin = query({
  args: {
    status: v.optional(companyVerificationStatusValidator),
    limit: v.optional(v.number()),
  },
  returns: v.array(adminRequestValidator),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const limit = Math.max(1, Math.min(args.limit ?? 100, 100));
    const requests = args.status
      ? await ctx.db
          .query("companyVerificationRequests")
          .withIndex("by_status", (q) => q.eq("status", args.status!))
          .order("desc")
          .take(limit)
      : await ctx.db
          .query("companyVerificationRequests")
          .order("desc")
          .take(limit);
    const users = await Promise.all(
      requests.map((request) => ctx.db.get(request.userId)),
    );
    return requests.map((request, index) => ({
      ...request,
      userName: users[index]?.name ?? "Unknown user",
      userEmail: users[index]?.email ?? "Unknown email",
    }));
  },
});

export const review = mutation({
  args: {
    requestId: v.id("companyVerificationRequests"),
    decision: v.union(v.literal("verified"), v.literal("rejected")),
    note: v.string(),
  },
  returns: v.object({ success: v.boolean() }),
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx);
    const request = await ctx.db.get(args.requestId);
    if (!request) throw new Error("Verification request not found.");
    if (request.status !== "pending") {
      throw new Error("This verification request has already been reviewed.");
    }
    const company = await ctx.db.get(request.userId);
    if (!company) throw new Error("Company account not found.");
    const note = cleanText(args.note, "Review note", 10, 2000);
    const now = Date.now();
    await ctx.db.patch(request._id, {
      status: args.decision,
      adminNote: note,
      reviewedBy: admin._id,
      reviewedAt: now,
      updatedAt: now,
    });
    await ctx.db.patch(company._id, {
      companyName: request.companyName,
      companyVerificationStatus: args.decision,
      updatedAt: now,
    });
    await ctx.db.insert("moderationAuditEvents", {
      tenantId: request.tenantId,
      actorId: admin._id,
      action: "company_verification_reviewed",
      targetType: "company_verification",
      targetId: request._id,
      fromStatus: request.status,
      toStatus: args.decision,
      note,
      createdAt: now,
    });
    await notifyUser(ctx, {
      userId: company._id,
      type: "company_verification_updated",
      title:
        args.decision === "verified"
          ? "Your company is verified"
          : "Your company verification needs attention",
      body: note,
      link: "/create-job",
      metadata: { requestId: request._id, status: args.decision },
    });
    return { success: true };
  },
});

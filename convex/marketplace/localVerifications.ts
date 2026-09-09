import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { requireAdmin } from "../lib/authHelpers";

export const list = query({
  args: {},
  returns: v.array(v.object({ id: v.id("freelancerProfiles"), name: v.string(), city: v.string(), country: v.string(), postcode: v.string(), verified: v.boolean(), updatedAt: v.number() })),
  handler: async ctx => {
    const admin = await requireAdmin(ctx);
    const profiles = await ctx.db.query("freelancerProfiles").withIndex("by_tenant", q => q.eq("tenantId", admin.tenantId)).order("desc").take(100);
    return profiles.filter(p => p.providerRole === "local_professional" && p.status === "active").map(p => ({ id: p._id, name: p.displayName, city: p.locationCity || "", country: p.locationCountry || "", postcode: p.locationPostcode || "", verified: p.isVerified === true, updatedAt: p.updatedAt }));
  },
});

export const review = mutation({
  args: { profileId: v.id("freelancerProfiles"), verified: v.boolean(), expectedUpdatedAt: v.number(), note: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx);
    const profile = await ctx.db.get(args.profileId);
    if (!profile || profile.tenantId !== admin.tenantId || profile.providerRole !== "local_professional" || profile.status !== "active") throw new Error("Local profile not available for review.");
    if (profile.updatedAt !== args.expectedUpdatedAt) throw new Error("The profile changed. Review its current details before approving.");
    const note = args.note.trim();
    if (note.length < 20 || note.length > 2000) throw new Error("Record the checks and evidence in 20–2,000 characters.");
    if (args.verified && (!profile.locationCity?.trim() || !profile.locationCountry?.trim() || !["local", "hybrid"].includes(profile.workType || ""))) throw new Error("A local work type, city and country are required.");
    const now = Date.now();
    await ctx.db.patch(profile._id, { isVerified: args.verified, verificationDate: args.verified ? now : undefined, updatedAt: now });
    await ctx.db.insert("moderationAuditEvents", { tenantId: admin.tenantId, actorId: admin._id, action: "local_profile_verification_reviewed", targetType: "freelancer_profile", targetId: profile._id, fromStatus: profile.isVerified ? "verified" : "unverified", toStatus: args.verified ? "verified" : "unverified", note, createdAt: now });
    return null;
  },
});

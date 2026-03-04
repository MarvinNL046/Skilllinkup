import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

async function requireUser(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Authentication required");
  const user = await ctx.db
    .query("users")
    .withIndex("by_email", (q: any) => q.eq("email", identity.email!))
    .first();
  if (!user) throw new Error("User not found");
  const tenant = await ctx.db.query("tenants").first();
  if (!tenant) throw new Error("No tenant found");
  return { user, tenant };
}

// ---- Work Experience ----

export const getWorkExperience = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workExperience")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const addWorkExperience = mutation({
  args: {
    company: v.string(),
    title: v.string(),
    startDate: v.number(),
    endDate: v.optional(v.number()),
    isCurrent: v.optional(v.boolean()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { user, tenant } = await requireUser(ctx);
    const now = Date.now();
    return await ctx.db.insert("workExperience", {
      ...args,
      userId: user._id,
      tenantId: tenant._id,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateWorkExperience = mutation({
  args: {
    id: v.id("workExperience"),
    company: v.optional(v.string()),
    title: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    isCurrent: v.optional(v.boolean()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");
    const { id, ...fields } = args;
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [k, val] of Object.entries(fields)) {
      if (val !== undefined) patch[k] = val;
    }
    await ctx.db.patch(id, patch);
    return id;
  },
});

export const removeWorkExperience = mutation({
  args: { id: v.id("workExperience") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// ---- Education ----

export const getEducation = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("education")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const addEducation = mutation({
  args: {
    school: v.string(),
    degree: v.optional(v.string()),
    field: v.optional(v.string()),
    startYear: v.optional(v.number()),
    endYear: v.optional(v.number()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { user, tenant } = await requireUser(ctx);
    const now = Date.now();
    return await ctx.db.insert("education", {
      ...args,
      userId: user._id,
      tenantId: tenant._id,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateEducation = mutation({
  args: {
    id: v.id("education"),
    school: v.optional(v.string()),
    degree: v.optional(v.string()),
    field: v.optional(v.string()),
    startYear: v.optional(v.number()),
    endYear: v.optional(v.number()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");
    const { id, ...fields } = args;
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [k, val] of Object.entries(fields)) {
      if (val !== undefined) patch[k] = val;
    }
    await ctx.db.patch(id, patch);
    return id;
  },
});

export const removeEducation = mutation({
  args: { id: v.id("education") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// ---- Certifications ----

export const getCertifications = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userCertifications")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const addCertification = mutation({
  args: {
    name: v.string(),
    issuer: v.optional(v.string()),
    year: v.optional(v.number()),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { user, tenant } = await requireUser(ctx);
    return await ctx.db.insert("userCertifications", {
      ...args,
      userId: user._id,
      tenantId: tenant._id,
      createdAt: Date.now(),
    });
  },
});

export const removeCertification = mutation({
  args: { id: v.id("userCertifications") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");
    await ctx.db.delete(args.id);
    return args.id;
  },
});

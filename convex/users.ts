import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Sync a Clerk user to the Convex users table.
 * Called from the client after sign-in via useEffect.
 */
export const syncUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    image: v.optional(v.string()),
    clerkId: v.string(),
    userType: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists by Clerk ID
    const existing = await ctx.db
      .query("users")
      .withIndex("by_stackAuthId", (q) => q.eq("stackAuthId", args.clerkId))
      .first();

    if (existing) {
      // Update existing user
      await ctx.db.patch(existing._id, {
        name: args.name,
        image: args.image || existing.image,
        email: args.email,
        lastLogin: Date.now(),
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    // Also check by email (for users migrated from old auth)
    const existingByEmail = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingByEmail) {
      // Link existing user to Clerk
      await ctx.db.patch(existingByEmail._id, {
        stackAuthId: args.clerkId,
        name: args.name,
        image: args.image || existingByEmail.image,
        lastLogin: Date.now(),
        updatedAt: Date.now(),
      });
      return existingByEmail._id;
    }

    // Get default tenant
    const tenant = await ctx.db.query("tenants").first();
    if (!tenant) {
      throw new Error("No tenant found — run data migration first");
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      tenantId: tenant._id,
      email: args.email,
      name: args.name,
      passwordHash: "clerk-managed",
      image: args.image,
      role: "author",
      userType: args.userType || "client",
      stackAuthId: args.clerkId,
      emailVerified: true,
      lastLogin: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return userId;
  },
});

/**
 * Get the current user from Convex, using Clerk identity.
 */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    return user;
  },
});

/**
 * Get user by Clerk ID.
 */
export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_stackAuthId", (q) => q.eq("stackAuthId", args.clerkId))
      .first();
  },
});

/**
 * Get a user's contact info (id, email, name) by their Convex user ID.
 * Used by the Stripe webhook to send confirmation emails.
 */
export const getContact = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;
    return { id: user._id, email: user.email, name: user.name };
  },
});

/**
 * Get a user by their email address.
 */
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

/**
 * Get a user by their Stack Auth / Clerk ID.
 * Returns the Convex user document or null.
 */
export const getByStackAuthId = query({
  args: { stackAuthId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_stackAuthId", (q) => q.eq("stackAuthId", args.stackAuthId))
      .first();
  },
});

/**
 * Update user type (client/freelancer).
 */
export const setUserType = mutation({
  args: {
    email: v.string(),
    userType: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      userType: args.userType,
      updatedAt: Date.now(),
    });

    // If becoming a freelancer, create basic profile
    if (args.userType === "freelancer") {
      const existingProfile = await ctx.db
        .query("freelancerProfiles")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .first();

      if (!existingProfile) {
        await ctx.db.insert("freelancerProfiles", {
          userId: user._id,
          tenantId: user.tenantId,
          displayName: user.name,
          status: "active",
          locale: "en",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }
    }

    return { success: true };
  },
});

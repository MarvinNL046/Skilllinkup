import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
  requireAuthUser,
  requireServerSecret,
} from "./lib/authHelpers";
import { toSafeUser } from "./lib/publicData";
import {
  assertMarketplaceContext,
  marketplaceRoleValidator,
  marketplaceWorldValidator,
} from "./lib/marketplaceState";

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
    userType: v.optional(v.union(v.literal("client"), v.literal("freelancer"))),
  },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required.");
    }

    const clerkId = identity.subject;
    if (args.clerkId !== clerkId) {
      throw new Error("Unauthorized.");
    }

    const suppliedEmail = args.email.trim().toLowerCase();
    const identityEmail =
      typeof identity.email === "string"
        ? identity.email.trim().toLowerCase()
        : undefined;
    if (!suppliedEmail || !/^\S+@\S+\.\S+$/.test(suppliedEmail)) {
      throw new Error("A valid email address is required.");
    }
    if (identityEmail && suppliedEmail !== identityEmail) {
      throw new Error("Unauthorized.");
    }

    // The Clerk subject is the authorization key. Some Convex JWT templates do
    // not include an email claim, so the signed-in Clerk client supplies the
    // display/contact email while identity.subject prevents cross-user writes.
    const email = identityEmail ?? suppliedEmail;

    // Check if user already exists by Clerk ID
    const existing = await ctx.db
      .query("users")
      .withIndex("by_stackAuthId", (q) => q.eq("stackAuthId", clerkId))
      .first();

    if (existing) {
      // Update existing user
      await ctx.db.patch(existing._id, {
        name: args.name,
        image: args.image || existing.image,
        email,
        lastLogin: Date.now(),
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    // Only link a legacy email-only account when the signed JWT itself confirms
    // that email. This prevents a client-supplied address from claiming another
    // account when the deployment intentionally omits email from its JWT.
    if (identityEmail) {
      const existingByEmail = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", email))
        .first();

      if (existingByEmail) {
        await ctx.db.patch(existingByEmail._id, {
          stackAuthId: clerkId,
          name: args.name,
          image: args.image || existingByEmail.image,
          lastLogin: Date.now(),
          updatedAt: Date.now(),
        });
        return existingByEmail._id;
      }
    }

    // Get default tenant
    const tenant = await ctx.db.query("tenants").first();
    if (!tenant) {
      throw new Error("No tenant found — run data migration first");
    }

    // Create new user — do NOT set userType here; onboarding page handles that
    const userId = await ctx.db.insert("users", {
      tenantId: tenant._id,
      email,
      name: args.name,
      passwordHash: "clerk-managed",
      image: args.image,
      role: "author",
      userType: args.userType,
      stackAuthId: clerkId,
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

    const userBySubject = await ctx.db
      .query("users")
      .withIndex("by_stackAuthId", (q) => q.eq("stackAuthId", identity.subject))
      .first();

    return toSafeUser(userBySubject);
  },
});

/**
 * Get user by Clerk ID.
 */
export const getByClerkId = query({
  args: {
    clerkId: v.string(),
    serverSecret: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.serverSecret) {
      requireServerSecret(args.serverSecret);
    } else {
      const user = await requireAuthUser(ctx);
      if (user.stackAuthId !== args.clerkId && user.role !== "admin") {
        throw new Error("Unauthorized.");
      }
    }

    const result = await ctx.db
      .query("users")
      .withIndex("by_stackAuthId", (q) => q.eq("stackAuthId", args.clerkId))
      .first();
    return toSafeUser(result);
  },
});

/**
 * Get a user's contact info (id, email, name) by their Convex user ID.
 * Used by the Stripe webhook to send confirmation emails.
 */
export const getContact = query({
  args: {
    userId: v.id("users"),
    serverSecret: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.serverSecret) {
      requireServerSecret(args.serverSecret);
    } else {
      const user = await requireAuthUser(ctx);
      if (user._id !== args.userId && user.role !== "admin") {
        throw new Error("Unauthorized.");
      }
    }

    const user = await ctx.db.get(args.userId);
    if (!user) return null;
    return { id: user._id, email: user.email, name: user.name };
  },
});

/**
 * Get a user by their email address.
 */
export const getByEmail = query({
  args: {
    email: v.string(),
    serverSecret: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.serverSecret) {
      requireServerSecret(args.serverSecret);
    } else {
      const user = await requireAuthUser(ctx);
      if (user.email !== args.email && user.role !== "admin") {
        throw new Error("Unauthorized.");
      }
    }

    const result = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    return toSafeUser(result);
  },
});

/**
 * Get a user by their Stack Auth / Clerk ID.
 * Returns the Convex user document or null.
 */
export const getByStackAuthId = query({
  args: {
    stackAuthId: v.string(),
    serverSecret: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.serverSecret) {
      requireServerSecret(args.serverSecret);
    } else {
      const user = await requireAuthUser(ctx);
      if (user.stackAuthId !== args.stackAuthId && user.role !== "admin") {
        throw new Error("Unauthorized.");
      }
    }

    const result = await ctx.db
      .query("users")
      .withIndex("by_stackAuthId", (q) => q.eq("stackAuthId", args.stackAuthId))
      .first();
    return toSafeUser(result);
  },
});

/**
 * Update user type (client/freelancer).
 */
export const setUserType = mutation({
  args: {
    userType: v.union(v.literal("client"), v.literal("freelancer")),
    preferredWorld: v.optional(marketplaceWorldValidator),
  },
  returns: v.object({
    success: v.boolean(),
    profileId: v.optional(v.id("freelancerProfiles")),
  }),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);

    const patch: Record<string, unknown> = {
      userType: args.userType,
      updatedAt: Date.now(),
    };
    if (args.preferredWorld) {
      patch.preferredWorld = args.preferredWorld;
    }
    await ctx.db.patch(user._id, patch);

    // If becoming a freelancer, create basic profile
    if (args.userType === "freelancer") {
      const existingProfile = await ctx.db
        .query("freelancerProfiles")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .first();

      if (!existingProfile) {
        // Generate URL-friendly slug from name
        const baseSlug = (user.name || "freelancer")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          || "freelancer";
        const existingSlug = await ctx.db
          .query("freelancerProfiles")
          .withIndex("by_slug", (q) => q.eq("slug", baseSlug))
          .first();
        const slug = existingSlug
          ? `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`
          : baseSlug;

        await ctx.db.insert("freelancerProfiles", {
          userId: user._id,
          tenantId: user.tenantId,
          displayName: user.name,
          slug,
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

/**
 * Switch the user's preferred world (online/local/jobs).
 * Called from the dashboard world-switcher.
 */
export const setPreferredWorld = mutation({
  args: {
    preferredWorld: marketplaceWorldValidator,
  },
  returns: v.object({ success: v.boolean() }),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);

    await ctx.db.patch(user._id, {
      preferredWorld: args.preferredWorld,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Save a simple bio/interests string for client users during onboarding.
 */
export const updateBio = mutation({
  args: {
    bio: v.string(),
  },
  returns: v.object({ success: v.boolean() }),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    await ctx.db.patch(user._id, {
      bio: args.bio,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});

/**
 * Switch both the active marketplace role and its compatible product world.
 * A role must already belong to the account; adding roles happens in onboarding.
 */
export const switchAccountContext = mutation({
  args: {
    activeRole: marketplaceRoleValidator,
    preferredWorld: marketplaceWorldValidator,
  },
  returns: v.object({ success: v.boolean() }),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const roles = user.accountRoles ?? [];
    if (!roles.includes(args.activeRole)) {
      throw new Error("Add this role to your account before switching to it.");
    }

    assertMarketplaceContext(args.activeRole, args.preferredWorld);

    await ctx.db.patch(user._id, {
      activeRole: args.activeRole,
      preferredWorld: args.preferredWorld,
      userType:
        args.activeRole === "freelancer" || args.activeRole === "local_professional"
          ? "freelancer"
          : "client",
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});

/**
 * Store the user's marketplace roles independently from CMS/admin permissions.
 * This is the role model used by the three product worlds going forward.
 */
export const setAccountContext = mutation({
  args: {
    accountRoles: v.array(marketplaceRoleValidator),
    activeRole: marketplaceRoleValidator,
    preferredWorld: marketplaceWorldValidator,
    onboardingVersion: v.number(),
  },
  returns: v.object({
    success: v.boolean(),
    profileId: v.optional(v.id("freelancerProfiles")),
  }),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const uniqueRoles = [...new Set(args.accountRoles)];

    if (uniqueRoles.length === 0) {
      throw new Error("Select at least one account role.");
    }
    if (!uniqueRoles.includes(args.activeRole)) {
      throw new Error("The active role must be one of the account roles.");
    }
    assertMarketplaceContext(args.activeRole, args.preferredWorld);
    if (!Number.isInteger(args.onboardingVersion) || args.onboardingVersion < 1) {
      throw new Error("Invalid onboarding version.");
    }

    const professionalRole = args.activeRole === "freelancer" || args.activeRole === "local_professional";
    const legacyUserType = professionalRole ? "freelancer" : "client";

    await ctx.db.patch(user._id, {
      accountRoles: uniqueRoles,
      activeRole: args.activeRole,
      preferredWorld: args.preferredWorld,
      onboardingVersion: args.onboardingVersion,
      userType: legacyUserType,
      updatedAt: Date.now(),
    });

    let profileId;
    if (professionalRole) {
      const existingProfile = await ctx.db
        .query("freelancerProfiles")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .first();
      profileId = existingProfile?._id;
      if (!profileId) {
        const baseSlug = (user.name || "professional")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "") || "professional";
        const slugMatch = await ctx.db
          .query("freelancerProfiles")
          .withIndex("by_slug", (q) => q.eq("slug", baseSlug))
          .first();
        profileId = await ctx.db.insert("freelancerProfiles", {
          userId: user._id,
          tenantId: user.tenantId,
          displayName: user.name,
          slug: slugMatch ? `${baseSlug}-${user._id.slice(-5)}` : baseSlug,
          workType: args.activeRole === "local_professional" ? "local" : "remote",
          status: "active",
          locale: "en",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }
    }

    return { success: true, profileId };
  },
});

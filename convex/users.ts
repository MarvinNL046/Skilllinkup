import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
  requireAuthUser,
  requireServerSecret,
} from "./lib/authHelpers";
import { toSafeUser, safeUserValidator } from "./lib/publicData";
import {
  assertMarketplaceContext,
  CURRENT_ONBOARDING_VERSION,
  hasCompletedMarketplaceContext,
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
    if (identityEmail !== undefined && !/^\S+@\S+\.\S+$/.test(identityEmail)) {
      throw new Error("A valid email address is required.");
    }
    if (identityEmail && suppliedEmail !== identityEmail) {
      throw new Error("Unauthorized.");
    }

    // Check if user already exists by Clerk ID
    const existing = await ctx.db
      .query("users")
      .withIndex("by_stackAuthId", (q) => q.eq("stackAuthId", clerkId))
      .first();

    if (existing) {
      if (identityEmail && identityEmail !== existing.email) {
        if (identity.emailVerified !== true) throw new Error("Verify your email before changing it.");
        const emailOwner = await ctx.db.query("users")
          .withIndex("by_email", (q) => q.eq("email", identityEmail)).first();
        if (emailOwner && emailOwner._id !== existing._id) {
          throw new Error("This email is already linked to another sign-in identity.");
        }
      }
      await ctx.db.patch(existing._id, {
        name: args.name,
        image: args.image || existing.image,
        ...(identityEmail ? {
          email: identityEmail,
          emailVerified: identity.emailVerified === true ||
            (identityEmail === existing.email && existing.emailVerified === true),
        } : {}),
        lastLogin: Date.now(),
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    if (!identityEmail) {
      throw new Error("Convex authentication token must contain the Clerk primary email.");
    }
    const email = identityEmail;
    if (identityEmail) {
      const existingByEmail = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", email))
        .first();

      if (existingByEmail) {
        if (existingByEmail.stackAuthId && existingByEmail.stackAuthId !== clerkId) {
          throw new Error("This email is already linked to another sign-in identity.");
        }
        if (identity.emailVerified !== true) throw new Error("Verify your email before linking this account.");
        await ctx.db.patch(existingByEmail._id, {
          stackAuthId: clerkId,
          name: args.name,
          image: args.image || existingByEmail.image,
          emailVerified: true,
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
      stackAuthId: clerkId,
      emailVerified: identity.emailVerified === true,
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
  returns: safeUserValidator,
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
  returns: safeUserValidator,
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
  returns: v.union(v.object({ id: v.id("users"), email: v.string(), name: v.string() }), v.null()),
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
  returns: safeUserValidator,
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
  returns: safeUserValidator,
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
    await requireAuthUser(ctx);
    void args;
    throw new Error("Account modes can only be added through role-specific onboarding.");
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
    await requireAuthUser(ctx);
    void args;
    throw new Error("Complete account setup before switching marketplace modes.");
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

    if (!hasCompletedMarketplaceContext(user, args.activeRole, args.preferredWorld)) {
      throw new Error("Complete onboarding for this account mode before switching to it.");
    }
    await ctx.db.patch(user._id, {
      activeRole: args.activeRole,
      preferredWorld: args.preferredWorld,
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
    onboardingData: v.object({
      selections: v.array(v.string()),
      headline: v.optional(v.string()),
      bio: v.optional(v.string()),
      hourlyRate: v.optional(v.number()),
      city: v.optional(v.string()),
      companyName: v.optional(v.string()),
    }),
  },
  returns: v.object({
    success: v.boolean(),
    profileId: v.optional(v.id("freelancerProfiles")),
  }),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const uniqueRoles = [...new Set(args.accountRoles)];
    const existingRoles = user.accountRoles ?? [];

    if (uniqueRoles.length === 0) {
      throw new Error("Select at least one account role.");
    }
    if (!uniqueRoles.includes(args.activeRole)) {
      throw new Error("The active role must be one of the account roles.");
    }
    if (existingRoles.some((role) => !uniqueRoles.includes(role))) {
      throw new Error("Existing account roles cannot be removed during onboarding.");
    }
    const addedRoles = uniqueRoles.filter((role) => !existingRoles.includes(role));
    if (addedRoles.length > 1 || (addedRoles.length === 1 && addedRoles[0] !== args.activeRole)) {
      throw new Error("Complete onboarding for one new account role at a time.");
    }
    assertMarketplaceContext(args.activeRole, args.preferredWorld);
    if (args.onboardingVersion !== CURRENT_ONBOARDING_VERSION) {
      throw new Error("Refresh the page to use the current onboarding version.");
    }

    const providerRole =
      args.activeRole === "freelancer" || args.activeRole === "local_professional"
        ? args.activeRole
        : null;
    const selections = [...new Set(args.onboardingData.selections.map((item) => item.trim()).filter(Boolean))].slice(0, 8);
    const headline = args.onboardingData.headline?.trim().slice(0, 120);
    const bio = args.onboardingData.bio?.trim().slice(0, 1200);
    const city = args.onboardingData.city?.trim().slice(0, 100);
    const companyName = args.onboardingData.companyName?.trim().slice(0, 100);
    const hourlyRate = args.onboardingData.hourlyRate;

    if (args.activeRole !== "company" && selections.length === 0) {
      throw new Error("Choose at least one relevant skill or discipline.");
    }
    if (providerRole === "local_professional" && (!city || city.length < 2)) {
      throw new Error("Enter the city or region you serve.");
    }
    if (args.activeRole === "company" && (!companyName || companyName.length < 2)) {
      throw new Error("Enter your company name.");
    }
    if (hourlyRate !== undefined && (!Number.isFinite(hourlyRate) || hourlyRate < 1 || hourlyRate > 9999)) {
      throw new Error("Enter a valid hourly rate.");
    }

    const now = Date.now();
    const onboardingContexts = (user.onboardingContexts ?? []).filter(
      (context) => context.role !== args.activeRole || context.world !== args.preferredWorld,
    );
    onboardingContexts.push({ role: args.activeRole, world: args.preferredWorld,
      version: CURRENT_ONBOARDING_VERSION, completedAt: now, selections });
    const companyNameChanged = args.activeRole === "company" &&
      companyName?.toLowerCase() !== user.companyName?.trim().toLowerCase();
    if (companyNameChanged && user.companyVerificationStatus === "pending") {
      throw new Error("Your company name cannot change while verification is pending.");
    }

    await ctx.db.patch(user._id, {
      accountRoles: uniqueRoles,
      activeRole: args.activeRole,
      preferredWorld: args.preferredWorld,
      onboardingVersion: args.onboardingVersion,
      onboardingContexts,
      companyName: args.activeRole === "company" ? companyName : user.companyName,
      companyVerificationStatus:
        args.activeRole === "company"
          ? companyNameChanged ? "unverified" : user.companyVerificationStatus ?? "unverified"
          : user.companyVerificationStatus,
      bio: providerRole ? user.bio : [headline, bio, selections.length ? `Interests: ${selections.join(", ")}` : ""].filter(Boolean).join("\n").slice(0, 1200) || user.bio,
      updatedAt: now,
    });

    let profileId;
    if (providerRole) {
      let existingProfile = await ctx.db
        .query("freelancerProfiles")
        .withIndex("by_userId_and_providerRole", (q) =>
          q.eq("userId", user._id).eq("providerRole", providerRole),
        )
        .first();
      if (!existingProfile) {
        const unassignedProfiles = await ctx.db
          .query("freelancerProfiles")
          .withIndex("by_userId", (q) => q.eq("userId", user._id))
          .take(3);
        existingProfile =
          unassignedProfiles.find(
            (profile) =>
              !profile.providerRole &&
              (providerRole === "local_professional"
                ? profile.workType === "local"
                : profile.workType !== "local"),
          ) ?? null;
      }
      profileId = existingProfile?._id;
      if (existingProfile) {
        await ctx.db.patch(existingProfile._id, {
          providerRole,
          tagline: headline,
          bio,
          hourlyRate,
          workType: providerRole === "local_professional" ? "local" : "remote",
          locationCity: providerRole === "local_professional" ? city : existingProfile.locationCity,
          locationCountry: providerRole === "local_professional" ? "Netherlands" : existingProfile.locationCountry,
          serviceRadiusKm: providerRole === "local_professional" ? 25 : existingProfile.serviceRadiusKm,
          skills: selections,
          isAvailable: true,
          updatedAt: now,
        });
      } else {
        const baseSlug = (user.name || "professional")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "") || "professional";
        const roleSlug = providerRole === "local_professional" ? `${baseSlug}-local` : baseSlug;
        const slugMatch = await ctx.db
          .query("freelancerProfiles")
          .withIndex("by_slug", (q) => q.eq("slug", roleSlug))
          .first();
        profileId = await ctx.db.insert("freelancerProfiles", {
          userId: user._id,
          providerRole,
          tenantId: user.tenantId,
          displayName: user.name,
          slug: slugMatch ? `${roleSlug}-${user._id.slice(-5)}` : roleSlug,
          tagline: headline,
          bio,
          hourlyRate,
          workType: providerRole === "local_professional" ? "local" : "remote",
          locationCity: providerRole === "local_professional" ? city : undefined,
          locationCountry: providerRole === "local_professional" ? "Netherlands" : undefined,
          serviceRadiusKm: providerRole === "local_professional" ? 25 : undefined,
          skills: selections,
          isAvailable: true,
          status: "active",
          locale: "en",
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    return { success: true, profileId };
  },
});

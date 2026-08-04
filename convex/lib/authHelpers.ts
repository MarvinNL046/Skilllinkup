import { MutationCtx, QueryCtx } from "../_generated/server";
import { Doc, Id } from "../_generated/dataModel";
import type { MarketplaceRole, MarketplaceWorld } from "./marketplaceState";

const INTERNAL_SERVER_SECRET = process.env.INTERNAL_EMAIL_SECRET;

/**
 * Resolve the authenticated caller to their Convex user doc.
 * Throws if not authenticated or user not found in the database.
 */
export async function requireAuthUser(
  ctx: QueryCtx | MutationCtx
): Promise<Doc<"users">> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Authentication required.");

  const user = await ctx.db
    .query("users")
    .withIndex("by_stackAuthId", (q) => q.eq("stackAuthId", identity.subject))
    .first();

  if (!user) throw new Error("User not found. Complete account synchronization first.");
  return user;
}

/** Resolve the caller when present, while keeping public queries anonymous-safe. */
export async function getOptionalAuthUser(
  ctx: QueryCtx | MutationCtx
): Promise<Doc<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  return await ctx.db
    .query("users")
    .withIndex("by_stackAuthId", (q) => q.eq("stackAuthId", identity.subject))
    .first();
}

/**
 * Verify the authenticated caller is an admin user.
 */
export async function requireAdmin(
  ctx: QueryCtx | MutationCtx
): Promise<Doc<"users">> {
  const user = await requireAuthUser(ctx);
  if (user.role !== "admin") throw new Error("Admin access required.");
  return user;
}

/**
 * Verify the authenticated caller IS the owner of a resource.
 * Throws if not authenticated or if caller's ID !== expectedOwnerId.
 */
export async function requireOwner(
  ctx: QueryCtx | MutationCtx,
  expectedOwnerId: Id<"users">
): Promise<Doc<"users">> {
  const user = await requireAuthUser(ctx);
  if (user._id !== expectedOwnerId) throw new Error("Unauthorized.");
  return user;
}

function legacyMarketplaceRole(user: Doc<"users">): MarketplaceRole {
  if (user.userType === "freelancer") {
    return user.preferredWorld === "local" ? "local_professional" : "freelancer";
  }
  if (user.preferredWorld === "jobs") return "company";
  return "client";
}

/**
 * Require both a completed account role and the matching active dashboard mode.
 * Legacy accounts without accountRoles retain a narrow migration bridge.
 */
export function requireMarketplaceContext(
  user: Doc<"users">,
  role: MarketplaceRole,
  world: MarketplaceWorld,
  action: string,
) {
  if (user.role === "admin") return;
  const roles = user.accountRoles ?? [];
  const effectiveRole = user.activeRole ?? legacyMarketplaceRole(user);
  const effectiveWorld = (user.preferredWorld ?? "online") as MarketplaceWorld;

  if (roles.length > 0 && !roles.includes(role)) {
    throw new Error(`Add the ${role.replaceAll("_", " ")} role before ${action}.`);
  }
  if (effectiveRole !== role || effectiveWorld !== world) {
    throw new Error(
      `Switch to the ${role.replaceAll("_", " ")} · ${world} account mode before ${action}.`,
    );
  }
}

/** Resolve the profile belonging to one provider mode, with legacy fallback. */
export async function getProviderProfile(
  ctx: QueryCtx | MutationCtx,
  userId: Id<"users">,
  providerRole: "freelancer" | "local_professional",
) {
  const exact = await ctx.db
    .query("freelancerProfiles")
    .withIndex("by_userId_and_providerRole", (q) =>
      q.eq("userId", userId).eq("providerRole", providerRole),
    )
    .first();
  if (exact) return exact;

  const profiles = await ctx.db
    .query("freelancerProfiles")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .take(3);
  return (
    profiles.find(
      (profile) =>
        !profile.providerRole &&
        (providerRole === "local_professional"
          ? profile.workType === "local"
          : profile.workType !== "local"),
    ) ?? null
  );
}

/**
 * Verify the caller knows the shared server secret used by Next/Stripe webhooks.
 */
export function requireServerSecret(secret?: string) {
  if (!INTERNAL_SERVER_SECRET) {
    throw new Error("Server secret is not configured.");
  }
  if (!secret || secret !== INTERNAL_SERVER_SECRET) {
    throw new Error("Unauthorized.");
  }
}

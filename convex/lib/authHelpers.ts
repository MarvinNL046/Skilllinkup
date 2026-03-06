import { MutationCtx, QueryCtx } from "../_generated/server";
import { Doc, Id } from "../_generated/dataModel";

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

  const email = identity.email;
  if (!email) throw new Error("Authentication required: no email in identity.");

  const user = await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", email))
    .first();

  if (!user) throw new Error("User not found.");
  return user;
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

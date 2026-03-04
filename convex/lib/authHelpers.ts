import { MutationCtx, QueryCtx } from "../_generated/server";
import { Doc } from "../_generated/dataModel";

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
    .withIndex("by_email", (q) => q.eq("email", identity.email!))
    .first();

  if (!user) throw new Error("User not found.");
  return user;
}

/**
 * Verify the authenticated caller IS the owner of a resource.
 * Throws if not authenticated or if caller's ID !== expectedOwnerId.
 */
export async function requireOwner(
  ctx: QueryCtx | MutationCtx,
  expectedOwnerId: string
): Promise<Doc<"users">> {
  const user = await requireAuthUser(ctx);
  if (user._id !== expectedOwnerId) throw new Error("Unauthorized.");
  return user;
}

import type { QueryCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";
import { getOptionalAuthUser } from "./authHelpers";
import { isPublicFreelancerProfile } from "./publicData";

/**
 * Work history, education, certificates and portfolio are shown on public
 * provider pages. They are readable only by their owner, or by anyone once the
 * owner has an active provider profile that is not private. Candidates and
 * private providers therefore never expose this data by user id.
 */
export async function canViewProfileExtras(ctx: QueryCtx, userId: Id<"users">) {
  const viewer = await getOptionalAuthUser(ctx);
  if (viewer && viewer._id === userId) return true;
  const profiles = await ctx.db
    .query("freelancerProfiles")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .take(5);
  return profiles.some((profile) => isPublicFreelancerProfile(profile));
}

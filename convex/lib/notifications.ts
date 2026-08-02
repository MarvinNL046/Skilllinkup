import { MutationCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";

export async function notifyUser(
  ctx: MutationCtx,
  args: {
    userId: Id<"users">;
    type: string;
    title: string;
    body?: string;
    link?: string;
    metadata?: Record<string, string | number | boolean | null>;
  }
) {
  return await ctx.db.insert("notifications", {
    ...args,
    isRead: false,
    createdAt: Date.now(),
  });
}

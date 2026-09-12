import { paginationOptsValidator, paginationResultValidator } from "convex/server";
import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { rateLimiter } from "./lib/rateLimits";
import { requireAdmin } from "./lib/authHelpers";
import { validateContact } from "../src/lib/contactValidation.mjs";

export const submit = mutation({
  args: { requestId: v.string(), name: v.string(), email: v.string(), subject: v.string(), message: v.string(), website: v.optional(v.string()) },
  returns: v.object({ success: v.boolean() }),
  handler: async (ctx, args) => {
    if (args.website) return { success: true };
    if (!/^[a-zA-Z0-9_-]{16,80}$/.test(args.requestId)) throw new ConvexError("Refresh the page and try again.");
    const result = validateContact(args);
    if (result.error || !result.value) throw new ConvexError(result.error ?? "Check the form.");
    const existing = await ctx.db.query("contactMessages").withIndex("by_requestId", (q) => q.eq("requestId", args.requestId)).unique();
    if (existing) {
      if (existing.email !== result.value.email || existing.message !== result.value.message || existing.subject !== result.value.subject || existing.name !== result.value.name) {
        throw new ConvexError("This submission has already been used. Refresh the page before sending a new message.");
      }
      return { success: true };
    }
    const allowance = await rateLimiter.limit(ctx, "contactPerEmail", { key: result.value.email });
    const global = await rateLimiter.limit(ctx, "contactGlobal");
    if (!allowance.ok || !global.ok) throw new ConvexError("Too many messages. Please try again later or email info@skilllinkup.com.");
    const now = Date.now();
    const contactId = await ctx.db.insert("contactMessages", { ...result.value, requestId: args.requestId, status: "open", createdAt: now, updatedAt: now });
    await ctx.scheduler.runAfter(0, internal.lib.email.sendContactMessage, { contactId, ...result.value });
    return { success: true };
  },
});

export const listForAdmin = query({
  args: { paginationOpts: paginationOptsValidator },
  returns: paginationResultValidator(v.any()),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.query("contactMessages").order("desc").paginate({ ...args.paginationOpts, numItems: Math.min(args.paginationOpts.numItems, 50) });
  },
});

export const close = mutation({
  args: { contactId: v.id("contactMessages"), closed: v.boolean() },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    if (!await ctx.db.get(args.contactId)) throw new ConvexError("Message not found.");
    await ctx.db.patch(args.contactId, { status: args.closed ? "closed" : "open", updatedAt: Date.now() });
    return null;
  },
});

import { mutation, query, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { requireAdmin } from "./lib/authHelpers";

/**
 * Public join mutation. Accepts required email plus optional signal fields
 * (skill / userType / name / source / locale). Idempotent on email: a
 * second submission with the same email returns alreadyJoined=true without
 * overwriting earlier data or re-triggering the welcome mail.
 *
 * On a fresh join we schedule the welcome email via the email-internal
 * action so the mutation stays fast and the email delivery is async /
 * best-effort (same pattern as orders, bids, etc.).
 *
 * Honeypot: the `trap` arg MUST be empty. Any value indicates a bot;
 * we silently accept + discard instead of throwing, so bots don't learn.
 */
export const join = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    skill: v.optional(v.string()),
    userType: v.optional(v.string()),
    source: v.optional(v.string()),
    locale: v.optional(v.string()),
    // Honeypot — hidden field in the form; humans never fill this.
    trap: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.trap && args.trap.trim() !== "") {
      // Pretend success so bots don't learn the honeypot exists.
      return { success: true, alreadyJoined: false, bot: true };
    }

    const email = args.email.toLowerCase().trim();
    if (!email.includes("@") || email.length > 254) {
      return { success: false, alreadyJoined: false, error: "invalid_email" };
    }

    const skill = args.skill?.trim() || undefined;
    const userType = args.userType?.trim() || undefined;
    const name = args.name?.trim() || undefined;
    const source = args.source?.trim() || undefined;
    const locale = args.locale?.trim() || undefined;

    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existing) {
      return { success: true, alreadyJoined: true };
    }

    await ctx.db.insert("waitlist", {
      email,
      name,
      skill,
      userType,
      source,
      locale,
      createdAt: Date.now(),
    });

    // Fire-and-forget welcome email. Failure is logged inside the action
    // but does not break the signup — the waitlist row is already saved.
    await ctx.scheduler.runAfter(0, internal.lib.email.sendWaitlistWelcome, {
      to: email,
      name,
      skill,
      userType,
      locale: locale || "en",
    });

    return { success: true, alreadyJoined: false };
  },
});

/**
 * Public count query. Used by the WaitlistButton to show a live counter
 * ("N freelancers joined") as social proof. No admin auth because this
 * number is an intentional marketing signal.
 */
export const getCount = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("waitlist").collect();
    return all.length;
  },
});

/**
 * Public skill breakdown — only returns top skills to avoid leaking
 * individual signups while still showing useful diversity signal.
 */
export const getSkillBreakdown = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("waitlist").collect();
    const counts = new Map<string, number>();
    for (const entry of all) {
      if (!entry.skill) continue;
      const normalized = entry.skill.toLowerCase().trim();
      if (!normalized) continue;
      counts.set(normalized, (counts.get(normalized) || 0) + 1);
    }
    const sorted = Array.from(counts.entries())
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    return sorted;
  },
});

// Admin: list all waitlist entries (newest first)
export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("waitlist").order("desc").collect();
  },
});

// Admin: count (authenticated, exact number)
export const count = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const all = await ctx.db.query("waitlist").collect();
    return all.length;
  },
});

/**
 * Admin helper: mark a waitlist entry as notified (when we actually
 * send the launch announcement). Used by a future launch-blast job.
 */
export const markNotified = internalMutation({
  args: { id: v.id("waitlist") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { notifiedAt: Date.now() });
  },
});

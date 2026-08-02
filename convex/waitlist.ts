import { internal } from "./_generated/api";
import { MutationCtx, internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib/authHelpers";
import { rateLimiter } from "./lib/rateLimits";

const waitlistEntryValidator = v.object({
  _id: v.id("waitlist"),
  _creationTime: v.number(),
  email: v.string(),
  name: v.optional(v.string()),
  skill: v.optional(v.string()),
  userType: v.optional(v.string()),
  source: v.optional(v.string()),
  locale: v.optional(v.string()),
  notifiedAt: v.optional(v.number()),
  createdAt: v.number(),
});

function normalizeSkill(skill?: string) {
  const label = skill?.trim();
  if (!label) return null;
  return { key: `skill:${label.toLowerCase()}`, label };
}

async function ensureCounters(ctx: MutationCtx) {
  const existingTotal = await ctx.db
    .query("waitlistCounters")
    .withIndex("by_key", (q) => q.eq("key", "total"))
    .first();
  if (existingTotal) return;

  const existingEntries = await ctx.db.query("waitlist").take(10000);
  if (existingEntries.length === 10000) {
    throw new Error("Waitlist counter backfill requires a batched migration.");
  }
  const now = Date.now();
  await ctx.db.insert("waitlistCounters", {
    key: "total",
    count: existingEntries.length,
    updatedAt: now,
  });

  const skills = new Map<string, { label: string; count: number }>();
  for (const entry of existingEntries) {
    const normalized = normalizeSkill(entry.skill);
    if (!normalized) continue;
    const current = skills.get(normalized.key);
    skills.set(normalized.key, {
      label: current?.label ?? normalized.label,
      count: (current?.count ?? 0) + 1,
    });
  }
  for (const [key, value] of skills) {
    await ctx.db.insert("waitlistCounters", {
      key,
      label: value.label,
      count: value.count,
      updatedAt: now,
    });
  }
}

async function changeCounter(ctx: MutationCtx, key: string, delta: number, label?: string) {
  const existing = await ctx.db
    .query("waitlistCounters")
    .withIndex("by_key", (q) => q.eq("key", key))
    .first();
  const now = Date.now();
  if (existing) {
    await ctx.db.patch(existing._id, {
      count: Math.max(0, existing.count + delta),
      label: label ?? existing.label,
      updatedAt: now,
    });
  } else if (delta > 0) {
    await ctx.db.insert("waitlistCounters", { key, label, count: delta, updatedAt: now });
  }
}

async function changeSignupCounters(ctx: MutationCtx, skill: string | undefined, delta: number) {
  await changeCounter(ctx, "total", delta);
  const normalized = normalizeSkill(skill);
  if (normalized) {
    await changeCounter(ctx, normalized.key, delta, normalized.label);
  }
}

export const join = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    skill: v.optional(v.string()),
    userType: v.optional(v.string()),
    source: v.optional(v.string()),
    locale: v.optional(v.string()),
    trap: v.optional(v.string()),
  },
  returns: v.object({
    success: v.boolean(),
    alreadyJoined: v.boolean(),
    bot: v.optional(v.boolean()),
    error: v.optional(v.string()),
  }),
  handler: async (ctx, args) => {
    if (args.trap?.trim()) {
      return { success: true, alreadyJoined: false, bot: true };
    }
    const email = args.email.toLowerCase().trim();
    if (!email.includes("@") || email.length > 254) {
      return { success: false, alreadyJoined: false, error: "invalid_email" };
    }

    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();
    if (existing) return { success: true, alreadyJoined: true };

    await rateLimiter.limit(ctx, "waitlistPerEmail", { key: email, throws: true });
    await rateLimiter.limit(ctx, "waitlistGlobal", { throws: true });

    const skill = args.skill?.trim() || undefined;
    const name = args.name?.trim() || undefined;
    const userType = args.userType?.trim() || undefined;
    const source = args.source?.trim() || undefined;
    const locale = args.locale?.trim() || undefined;
    await ensureCounters(ctx);
    await ctx.db.insert("waitlist", {
      email,
      name,
      skill,
      userType,
      source,
      locale,
      createdAt: Date.now(),
    });
    await changeSignupCounters(ctx, skill, 1);

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

export const getCount = query({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    const counter = await ctx.db
      .query("waitlistCounters")
      .withIndex("by_key", (q) => q.eq("key", "total"))
      .first();
    if (counter) return counter.count;
    return (await ctx.db.query("waitlist").take(10000)).length;
  },
});

export const getSkillBreakdown = query({
  args: {},
  returns: v.array(v.object({ skill: v.string(), count: v.number() })),
  handler: async (ctx) => {
    const counters = await ctx.db
      .query("waitlistCounters")
      .withIndex("by_count")
      .order("desc")
      .take(25);
    if (counters.length > 0) {
      return counters
        .filter((counter) => counter.key.startsWith("skill:") && counter.label)
        .slice(0, 10)
        .map((counter) => ({ skill: counter.label!, count: counter.count }));
    }

    const entries = await ctx.db.query("waitlist").take(10000);
    const counts = new Map<string, number>();
    for (const entry of entries) {
      const normalized = normalizeSkill(entry.skill);
      if (!normalized) continue;
      counts.set(normalized.label, (counts.get(normalized.label) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  },
});

export const list = query({
  args: { limit: v.optional(v.number()) },
  returns: v.array(waitlistEntryValidator),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return ctx.db
      .query("waitlist")
      .order("desc")
      .take(Math.max(1, Math.min(args.limit ?? 100, 500)));
  },
});

export const count = query({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const counter = await ctx.db
      .query("waitlistCounters")
      .withIndex("by_key", (q) => q.eq("key", "total"))
      .first();
    return counter?.count ?? (await ctx.db.query("waitlist").take(10000)).length;
  },
});

export const markNotified = internalMutation({
  args: { id: v.id("waitlist") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { notifiedAt: Date.now() });
    return null;
  },
});

export const deleteByEmails = internalMutation({
  args: { emails: v.array(v.string()) },
  returns: v.object({ deleted: v.number(), total: v.number() }),
  handler: async (ctx, args) => {
    await ensureCounters(ctx);
    let deleted = 0;
    for (const raw of args.emails.slice(0, 500)) {
      const entry = await ctx.db
        .query("waitlist")
        .withIndex("by_email", (q) => q.eq("email", raw.toLowerCase().trim()))
        .first();
      if (!entry) continue;
      await ctx.db.delete(entry._id);
      await changeSignupCounters(ctx, entry.skill, -1);
      deleted += 1;
    }
    return { deleted, total: args.emails.length };
  },
});

export const bulkImport = internalMutation({
  args: {
    entries: v.array(
      v.object({ email: v.string(), name: v.optional(v.string()), source: v.string() })
    ),
  },
  returns: v.object({ inserted: v.number(), skipped: v.number(), total: v.number() }),
  handler: async (ctx, args) => {
    if (args.entries.length > 500) throw new Error("Import at most 500 entries per batch.");
    await ensureCounters(ctx);
    let inserted = 0;
    let skipped = 0;
    const now = Date.now();
    for (const entry of args.entries) {
      const email = entry.email.toLowerCase().trim();
      if (!email.includes("@")) {
        skipped += 1;
        continue;
      }
      const existing = await ctx.db
        .query("waitlist")
        .withIndex("by_email", (q) => q.eq("email", email))
        .first();
      if (existing) {
        skipped += 1;
        continue;
      }
      await ctx.db.insert("waitlist", {
        email,
        name: entry.name?.trim() || undefined,
        source: entry.source,
        createdAt: now,
      });
      await changeSignupCounters(ctx, undefined, 1);
      inserted += 1;
    }
    return { inserted, skipped, total: args.entries.length };
  },
});

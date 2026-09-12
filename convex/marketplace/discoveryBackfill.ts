import { v } from "convex/values";
import { internalMutation } from "../_generated/server";

// Idempotent release migration: process one small page per call. It only adds
// derived search keys; original amounts, status and timestamps are preserved.
export const run = internalMutation({
  args: { table: v.union(v.literal("projects"), v.literal("jobs")), cursor: v.optional(v.union(v.string(), v.null())) },
  returns: v.object({ changed: v.number(), isDone: v.boolean(), continueCursor: v.string() }),
  handler: async (ctx, args) => {
    let changed = 0;
    if (args.table === "projects") {
      const result = await ctx.db.query("projects").paginate({ cursor: args.cursor ?? null, numItems: 100 });
      for (const project of result.page) {
        const amount = project.budgetMax ?? project.budgetMin;
        const budgetSortValue = amount !== undefined && Number.isFinite(amount) ? amount : undefined;
        if (project.budgetSortValue !== budgetSortValue) { await ctx.db.patch(project._id, { budgetSortValue }); changed++; }
      }
      return { changed, isDone: result.isDone, continueCursor: result.continueCursor };
    }
    const result = await ctx.db.query("jobs").paginate({ cursor: args.cursor ?? null, numItems: 100 });
    for (const job of result.page) {
      const amount = job.salaryMax ?? job.salaryMin;
      const salarySortValue = amount !== undefined && Number.isFinite(amount) ? amount : undefined;
      if (job.salarySortValue !== salarySortValue) { await ctx.db.patch(job._id, { salarySortValue }); changed++; }
    }
    return { changed, isDone: result.isDone, continueCursor: result.continueCursor };
  },
});

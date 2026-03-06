import { v } from "convex/values";
import { mutation, MutationCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { requireServerSecret } from "../lib/authHelpers";

type SeedLookup = {
  tenantId: Id<"tenants">;
  categoryId: Id<"marketplaceCategories">;
  clientId: Id<"users">;
  freelancerId: Id<"users">;
  freelancerProfileId: Id<"freelancerProfiles">;
};

async function getSeedLookup(
  ctx: MutationCtx,
  {
    clientEmail,
    freelancerEmail,
    categorySlug,
    locale,
  }: {
    clientEmail: string;
    freelancerEmail: string;
    categorySlug: string;
    locale: string;
  }
): Promise<SeedLookup> {
  const tenant = await ctx.db.query("tenants").first();
  if (!tenant) throw new Error("No tenant found.");

  const client = await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", clientEmail))
    .first();
  if (!client) throw new Error(`Client user not found for ${clientEmail}.`);

  const freelancer = await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", freelancerEmail))
    .first();
  if (!freelancer) throw new Error(`Freelancer user not found for ${freelancerEmail}.`);

  const freelancerProfile = await ctx.db
    .query("freelancerProfiles")
    .withIndex("by_userId", (q) => q.eq("userId", freelancer._id))
    .first();
  if (!freelancerProfile) {
    throw new Error(`Freelancer profile not found for ${freelancerEmail}.`);
  }

  const category = await ctx.db
    .query("marketplaceCategories")
    .withIndex("by_slug_locale", (q) =>
      q.eq("slug", categorySlug).eq("locale", locale)
    )
    .first();
  if (!category) throw new Error(`Category not found for slug ${categorySlug}.`);

  return {
    tenantId: tenant._id,
    categoryId: category._id,
    clientId: client._id,
    freelancerId: freelancer._id,
    freelancerProfileId: freelancerProfile._id,
  };
}

export const seed = mutation({
  args: {
    serverSecret: v.string(),
    tag: v.string(),
    clientEmail: v.string(),
    freelancerEmail: v.string(),
    categorySlug: v.optional(v.string()),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);

    const locale = args.locale ?? "en";
    const categorySlug = args.categorySlug ?? "finance-accounting";
    const now = Date.now();
    const lookup = await getSeedLookup(ctx, {
      clientEmail: args.clientEmail,
      freelancerEmail: args.freelancerEmail,
      categorySlug,
      locale,
    });

    const serviceSlug = `smoke-service-${args.tag}`;
    const projectSlug = `smoke-project-${args.tag}`;
    const jobSlug = `smoke-job-${args.tag}`;
    const quoteTitle = `Smoke Test Quote Request ${args.tag}`;

    const gigId = await ctx.db.insert("gigs", {
      tenantId: lookup.tenantId,
      freelancerId: lookup.freelancerProfileId,
      title: `Smoke Test Service ${args.tag}`,
      slug: serviceSlug,
      description: "End-to-end service detail smoke test record.",
      categoryId: lookup.categoryId,
      tags: ["smoke", "qa", "e2e"],
      workType: "remote",
      locationCity: "Amsterdam",
      locationCountry: "Netherlands",
      serviceRadiusKm: 25,
      views: 0,
      orderCount: 0,
      ratingAverage: 0,
      ratingCount: 0,
      isFeatured: false,
      status: "active",
      locale,
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    const gigPackageId = await ctx.db.insert("gigPackages", {
      gigId,
      tier: "Basic",
      title: "Smoke Test Package",
      description: "A minimal package for service detail smoke testing.",
      price: 149,
      currency: "EUR",
      deliveryDays: 5,
      revisionCount: 2,
      features: ["Kickoff call", "Implementation", "Handover"],
      createdAt: now,
      updatedAt: now,
    });

    const projectId = await ctx.db.insert("projects", {
      tenantId: lookup.tenantId,
      clientId: lookup.clientId,
      title: `Smoke Test Project ${args.tag}`,
      slug: projectSlug,
      description: "Project detail smoke test record with a real bid path.",
      categoryId: lookup.categoryId,
      requiredSkills: ["React", "Next.js", "Convex"],
      budgetMin: 1200,
      budgetMax: 1800,
      currency: "EUR",
      deadline: now + 14 * 24 * 60 * 60 * 1000,
      workType: "remote",
      bidCount: 1,
      views: 0,
      status: "open",
      locale,
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    const bidId = await ctx.db.insert("bids", {
      projectId,
      freelancerId: lookup.freelancerProfileId,
      amount: 1550,
      currency: "EUR",
      deliveryDays: 10,
      pitch: "I can deliver this within ten days with a clean handoff.",
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });

    const quoteRequestId = await ctx.db.insert("quoteRequests", {
      tenantId: lookup.tenantId,
      clientId: lookup.clientId,
      categoryId: lookup.categoryId,
      title: quoteTitle,
      description:
        "Need help validating the quote request detail page with enough body text to test the preview and full-description paths.",
      locationCity: "Rotterdam",
      locationPostcode: "3011AA",
      locationCountry: "Netherlands",
      budgetIndication: "EUR500 - EUR1,000",
      preferredDate: now + 7 * 24 * 60 * 60 * 1000,
      status: "open",
      quoteCount: 0,
      maxSlots: 3,
      claimedSlots: 0,
      isExclusive: false,
      createdAt: now,
      updatedAt: now,
    });

    const jobId = await ctx.db.insert("jobs", {
      tenantId: lookup.tenantId,
      clientId: lookup.clientId,
      title: `Smoke Test Job ${args.tag}`,
      slug: jobSlug,
      description: "Job detail smoke test record for browser validation.",
      categoryId: lookup.categoryId,
      company: "SkillLinkup QA",
      requiredSkills: ["React", "TypeScript"],
      salaryMin: 65000,
      salaryMax: 85000,
      currency: "EUR",
      jobType: "full-time",
      experienceLevel: "mid",
      workType: "hybrid",
      locationCity: "Utrecht",
      locationCountry: "Netherlands",
      benefits: ["Remote days", "Learning budget"],
      applicationCount: 0,
      views: 0,
      status: "open",
      locale,
      publishedAt: now,
      expiresAt: now + 30 * 24 * 60 * 60 * 1000,
      createdAt: now,
      updatedAt: now,
    });

    return {
      tag: args.tag,
      locale,
      ids: {
        gigId,
        gigPackageId,
        projectId,
        bidId,
        quoteRequestId,
        jobId,
      },
      routes: {
        service: `/online/service/${serviceSlug}`,
        project: `/online/project/${projectSlug}`,
        quoteRequest: `/local/quote-request/${quoteRequestId}`,
        job: `/jobs/job/${jobSlug}`,
      },
    };
  },
});

export const cleanup = mutation({
  args: {
    serverSecret: v.string(),
    gigId: v.optional(v.id("gigs")),
    projectId: v.optional(v.id("projects")),
    quoteRequestId: v.optional(v.id("quoteRequests")),
    jobId: v.optional(v.id("jobs")),
  },
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);

    if (args.projectId) {
      const bids = await ctx.db
        .query("bids")
        .withIndex("by_project", (q) => q.eq("projectId", args.projectId!))
        .collect();
      for (const bid of bids) {
        await ctx.db.delete(bid._id);
      }
      if (await ctx.db.get(args.projectId)) {
        await ctx.db.delete(args.projectId);
      }
    }

    if (args.gigId) {
      const packages = await ctx.db
        .query("gigPackages")
        .withIndex("by_gig", (q) => q.eq("gigId", args.gigId!))
        .collect();
      for (const pkg of packages) {
        await ctx.db.delete(pkg._id);
      }
      const images = await ctx.db
        .query("gigImages")
        .withIndex("by_gig", (q) => q.eq("gigId", args.gigId!))
        .collect();
      for (const image of images) {
        await ctx.db.delete(image._id);
      }
      if (await ctx.db.get(args.gigId)) {
        await ctx.db.delete(args.gigId);
      }
    }

    if (args.quoteRequestId) {
      const quotes = await ctx.db
        .query("quotes")
        .withIndex("by_quoteRequest", (q) =>
          q.eq("quoteRequestId", args.quoteRequestId!)
        )
        .collect();
      for (const quote of quotes) {
        await ctx.db.delete(quote._id);
      }
      const claims = await ctx.db
        .query("leadClaims")
        .withIndex("by_quoteRequest", (q) =>
          q.eq("quoteRequestId", args.quoteRequestId!)
        )
        .collect();
      for (const claim of claims) {
        await ctx.db.delete(claim._id);
      }
      if (await ctx.db.get(args.quoteRequestId)) {
        await ctx.db.delete(args.quoteRequestId);
      }
    }

    if (args.jobId) {
      if (await ctx.db.get(args.jobId)) {
        await ctx.db.delete(args.jobId);
      }
    }

    return { ok: true };
  },
});

import { toPublicJob, publicJobValidator } from "./jobs";
import { toProjectFields, publicProjectValidator } from "./projects";
import { paginationOptsValidator, paginationResultValidator } from "convex/server";
import { v } from "convex/values";
import { query } from "../_generated/server";
import { isPublicLocalProfessionalProfile, isPublicOnlineFreelancerProfile, publicFreelancerProfileValidator, toPublicFreelancerProfile } from "../lib/publicData";

const common = {
  locale: v.string(), paginationOpts: paginationOptsValidator,
  query: v.optional(v.string()), location: v.optional(v.string()),
};
const text = (value: unknown) => String(value ?? "").normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const contains = (values: unknown[], needle?: string) => !needle || text(needle).split(" ").every((word) => text(values.join(" ")).includes(word));
const same = (value: unknown, expected?: string) => !expected || text(value) === text(expected);
const range = (min: number | undefined, max: number | undefined, from?: number, to?: number) =>
  (from === undefined || (max ?? min ?? -1) >= from) && (to === undefined || (min ?? max ?? Infinity) <= to);
const opts = (options: { numItems: number; cursor: string | null }) => ({ ...options, numItems: Math.max(1, Math.min(options.numItems, 50)) });

// Each cursor advances over the whole indexed collection, including rejected
// records. A sparse filter can return an empty page with isDone=false.
export const jobs = query({
  args: { ...common, category: v.optional(v.string()), jobType: v.optional(v.string()),
    experienceLevel: v.optional(v.string()), workType: v.optional(v.string()),
    currency: v.optional(v.string()), salaryMin: v.optional(v.number()), salaryMax: v.optional(v.number()),
    sort: v.optional(v.union(v.literal("newest"), v.literal("salary"))) },
  returns: paginationResultValidator(publicJobValidator),
  handler: async (ctx, args) => {
    const index = args.sort === "salary" ? "by_status_locale_salaryValue" : "by_status_locale";
    const result = await ctx.db.query("jobs").withIndex(index, (q) => q.eq("status", "open").eq("locale", args.locale))
      .order("desc").paginate(opts(args.paginationOpts));
    const page = await Promise.all(result.page.map(async (job) => {
      if (job.expiresAt && job.expiresAt <= Date.now()) return null;
      const [client, category] = await Promise.all([ctx.db.get(job.clientId), job.categoryId ? ctx.db.get(job.categoryId) : null]);
      if (client?.companyVerificationStatus !== "verified") return null;
      if (!contains([job.title, job.description, job.company, ...(job.requiredSkills ?? [])], args.query)
        || !contains([job.locationCity, job.locationCountry, job.workType], args.location)
        || !same(category?.name ?? "Other", args.category) || !same(job.jobType, args.jobType)
        || !same(job.experienceLevel, args.experienceLevel) || !same(job.workType, args.workType)
        || !same(job.currency ?? "EUR", args.currency) || !range(job.salaryMin, job.salaryMax, args.salaryMin, args.salaryMax)) return null;
      return toPublicJob(job, client, category);
    }));
    return { ...result, page: page.filter((item) => item !== null) };
  },
});

export const projects = query({
  args: { ...common, category: v.optional(v.string()), verifiedOnly: v.optional(v.boolean()),
    currency: v.optional(v.string()), budgetMin: v.optional(v.number()), budgetMax: v.optional(v.number()),
    deadlineDays: v.optional(v.number()), sort: v.optional(v.union(v.literal("newest"), v.literal("budget"))) },
  returns: paginationResultValidator(publicProjectValidator),
  handler: async (ctx, args) => {
    const index = args.sort === "budget" ? "by_status_locale_budgetValue" : "by_status_locale";
    const result = await ctx.db.query("projects").withIndex(index, (q) => q.eq("status", "open").eq("locale", args.locale))
      .order("desc").paginate(opts(args.paginationOpts));
    const page = await Promise.all(result.page.map(async (project) => {
      if (project.workType && !["remote", "online"].includes(project.workType)) return null;
      const [client, category] = await Promise.all([ctx.db.get(project.clientId), project.categoryId ? ctx.db.get(project.categoryId) : null]);
      if (!contains([project.title, project.description, ...(project.requiredSkills ?? [])], args.query)
        || !contains([project.locationCity, project.locationCountry, project.workType], args.location)
        || !same(category?.name ?? "Other", args.category) || (args.verifiedOnly && !client?.emailVerified)
        || !same(project.currency ?? "EUR", args.currency) || !range(project.budgetMin, project.budgetMax, args.budgetMin, args.budgetMax)
        || (args.deadlineDays !== undefined && (!project.deadline || project.deadline < Date.now() || project.deadline > Date.now() + args.deadlineDays * 86400000))) return null;
      return { ...toProjectFields(project), clientName: client?.name ?? null,
        clientAvatar: client?.avatar ?? client?.image ?? null, clientVerified: client?.emailVerified === true,
        categoryName: category?.name ?? null };
    }));
    return { ...result, page: page.filter((item) => item !== null) };
  },
});

export const localProfessionals = query({
  args: { ...common, skill: v.optional(v.string()), language: v.optional(v.string()), maxRate: v.optional(v.number()),
    availableOnly: v.optional(v.boolean()), verifiedOnly: v.optional(v.boolean()),
    sort: v.optional(v.union(v.literal("rating"), v.literal("rate"), v.literal("newest"))) },
  returns: paginationResultValidator(publicFreelancerProfileValidator),
  handler: async (ctx, args) => {
    const index = args.sort === "rating" ? "by_role_status_locale_rating"
      : args.sort === "rate" ? "by_role_status_locale_rate" : "by_providerRole_and_status_and_locale";
    const result = await ctx.db.query("freelancerProfiles")
      .withIndex(index, (q) => q.eq("providerRole", "local_professional").eq("status", "active").eq("locale", args.locale))
      .order(args.sort === "rate" ? "asc" : "desc").paginate(opts(args.paginationOpts));
    return { ...result, page: result.page.filter((profile) =>
      isPublicLocalProfessionalProfile(profile)
      && contains([profile.displayName, profile.tagline, profile.bio, ...(profile.skills ?? [])], args.query)
      && contains([profile.locationCity, profile.locationCountry, profile.locationPostcode], args.location)
      && (!args.skill || (profile.skills ?? []).some((skill) => same(skill, args.skill)))
      && (!args.language || (profile.languages ?? []).some((language) => same(language, args.language)))
      && (args.maxRate === undefined || (profile.hourlyRate !== undefined && profile.hourlyRate <= args.maxRate))
      && (!args.availableOnly || profile.isAvailable) && (!args.verifiedOnly || profile.isVerified))
      .map((profile) => toPublicFreelancerProfile(profile)!) };
  },
});

export const onlineProfessionals = query({
  args: { ...common, skill: v.optional(v.string()), language: v.optional(v.string()), maxRate: v.optional(v.number()),
    minRating: v.optional(v.number()), level: v.optional(v.string()),
    availableOnly: v.optional(v.boolean()), verifiedOnly: v.optional(v.boolean()),
    sort: v.optional(v.union(v.literal("rating"), v.literal("rate"), v.literal("newest"))) },
  returns: paginationResultValidator(publicFreelancerProfileValidator),
  handler: async (ctx, args) => {
    const index = args.sort === "rating" ? "by_status_locale_rating" : args.sort === "rate" ? "by_status_locale_rate" : "by_status_locale";
    const result = await ctx.db.query("freelancerProfiles")
      .withIndex(index, (q) => q.eq("status", "active").eq("locale", args.locale))
      .order(args.sort === "rate" ? "asc" : "desc").paginate(opts(args.paginationOpts));
    return { ...result, page: result.page.filter((profile) =>
      isPublicOnlineFreelancerProfile(profile)
      && contains([profile.displayName, profile.tagline, profile.bio, ...(profile.skills ?? [])], args.query)
      && contains([profile.locationCity, profile.locationCountry], args.location)
      && (!args.skill || (profile.skills ?? []).some((skill) => same(skill, args.skill)))
      && (!args.language || (profile.languages ?? []).some((language) => same(language, args.language)))
      && (args.maxRate === undefined || (profile.hourlyRate !== undefined && profile.hourlyRate <= args.maxRate))
      && (args.minRating === undefined || (profile.ratingAverage ?? 0) >= args.minRating) && same(profile.level ?? "new", args.level)
      && (!args.availableOnly || profile.isAvailable) && (!args.verifiedOnly || profile.isVerified))
      .map((profile) => toPublicFreelancerProfile(profile)!) };
  },
});

export const services = query({
  args: { ...common, category: v.optional(v.string()) },
  returns: paginationResultValidator(v.object({
    _id: v.id("gigs"), title: v.string(), slug: v.string(), description: v.string(),
    category: v.union(v.object({ name: v.string(), slug: v.string() }), v.null()),
    freelancerProfile: publicFreelancerProfileValidator,
    packages: v.array(v.object({ price: v.number(), currency: v.string() })),
  })),
  handler: async (ctx, args) => {
    const result = await ctx.db.query("gigs").withIndex("by_status_locale", (q) => q.eq("status", "active").eq("locale", args.locale))
      .order("desc").paginate(opts(args.paginationOpts));
    const page = await Promise.all(result.page.map(async (gig) => {
      if (!["remote", "online"].includes(gig.workType ?? "")) return null;
      const [profile, category] = await Promise.all([ctx.db.get(gig.freelancerId), gig.categoryId ? ctx.db.get(gig.categoryId) : null]);
      if (!isPublicOnlineFreelancerProfile(profile) || profile?.providerRole !== "freelancer"
        || !["remote", "online"].includes(profile?.workType ?? "") || profile?.tenantId !== gig.tenantId || profile?.isAvailable === false
        || !contains([gig.title, gig.description, ...(gig.tags ?? []), category?.name], args.query)
        || !contains([gig.locationCity, gig.locationCountry, profile?.locationCity, profile?.locationCountry], args.location)
        ) return null;
      if (args.category) {
        let current = category;
        const visited = new Set<string>();
        while (current && current.slug !== args.category && current.parentId && !visited.has(current._id) && visited.size < 16) {
          visited.add(current._id);
          current = await ctx.db.get(current.parentId);
        }
        if (current?.slug !== args.category) return null;
      }
      const packages = await ctx.db.query("gigPackages").withIndex("by_gig_price", (q) => q.eq("gigId", gig._id)).order("asc").take(3);
      return { _id: gig._id, title: gig.title, slug: gig.slug, description: gig.description,
        category: category ? { name: category.name, slug: category.slug } : null,
        freelancerProfile: toPublicFreelancerProfile(profile)!,
        packages: packages.map((pkg) => ({ price: pkg.price, currency: pkg.currency ?? "EUR" })) };
    }));
    return { ...result, page: page.filter((item) => item !== null) };
  },
});

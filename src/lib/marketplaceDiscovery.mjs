import { formatJobSalary } from "./jobSalary.mjs";

export const DISCOVERY_LIMIT = 100;
export const normalizeSearch = (value) => String(value ?? "").normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
export const matchesSearch = (value, query) => normalizeSearch(query).split(" ").filter(Boolean).every((term) => normalizeSearch(value).includes(term));
export const numberFilter = (value) => value === "" || value == null || !Number.isFinite(Number(value)) || Number(value) < 0 ? null : Number(value);

export function discoveryHref({ scope = "online", query = "", location = "" } = {}) {
  const path = scope === "local" ? "/local/craftsmen" : scope === "jobs" ? "/jobs/browse" : "/services";
  const params = new URLSearchParams();
  if (query.trim()) params.set("q", query.trim().slice(0, 200));
  else if (scope === "online") params.set("q", "");
  if (location.trim()) params.set("location", location.trim().slice(0, 120));
  return `${path}${params.size ? `?${params}` : ""}`;
}

export function mapProfessional(profile) {
  return {
    ...profile, id: profile._id, img: profile.avatarUrl || "/images/team/default-avatar.svg",
    name: profile.displayName || "Independent professional", profession: profile.tagline || "Independent professional",
    rating: profile.ratingAverage ?? 0, reviews: profile.ratingCount ?? 0, tags: profile.skills || [],
    skill: profile.tagline || "", price: profile.hourlyRate ?? null,
    location: [profile.locationCity, profile.locationCountry].filter(Boolean).join(", ") || "Location not published",
    level: profile.level || "new", language: profile.languages?.[0] || "", title: profile.bio || "",
    slug: profile.slug || profile._id, isVerified: profile.isVerified === true, isAvailable: profile.isAvailable === true,
    portfolioImg: profile.portfolioUrls?.[0] || null,
  };
}

export function mapJob(job) {
  const salaryLabel = formatJobSalary(job);
  return {
    ...job, id: job._id, img: job.companyLogo || "/images/team/default-avatar.svg",
    title: job.title || "Untitled job", company: job.company || job.clientName || "Company",
    server: job.company || job.clientName || "Company", category: job.categoryName || "Other",
    salary: job.salaryMax ?? job.salaryMin ?? null, level: job.experienceLevel || "",
    location: [job.locationCity, job.locationCountry].filter(Boolean).join(", "),
    benefits: [salaryLabel, job.jobType?.replaceAll("-", " "), job.workType, job.experienceLevel].filter(Boolean),
  };
}

export function mapProject(project) {
  const currency = project.currency || "EUR";
  const money = (amount) => new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  const min = project.budgetMin ?? null;
  const max = project.budgetMax ?? null;
  return {
    ...project, id: project._id, company: project.clientName || "Skilllinkup client", verified: project.clientVerified === true,
    category: project.categoryName || "Other", currency, budgetMin: min, budgetMax: max,
    budget: min !== null && max !== null ? `${money(min)} – ${money(max)}` : min !== null ? `From ${money(min)}` : max !== null ? `Up to ${money(max)}` : "Budget to agree",
    location: project.locationCity ? [project.locationCity, project.locationCountry].filter(Boolean).join(", ") : "Online",
    mode: ["remote", "online", undefined].includes(project.workType) ? "online" : "local",
    duration: project.deadline ? `Deadline ${new Date(project.deadline).toLocaleDateString("en-GB")}` : "Timing to agree",
    posted: new Date(project.publishedAt || project.createdAt).toLocaleDateString("en-GB"),
    proposals: project.bidCount || 0, copy: project.description || "", tags: project.requiredSkills || [],
  };
}

export function servicePriceLabel(service) {
  const packages = (service.packages || []).filter((pkg) => Number.isFinite(pkg.price));
  if (!packages.length) return "Price on request";
  const currency = packages[0].currency || "EUR";
  const cheapest = packages.filter((pkg) => (pkg.currency || "EUR") === currency).sort((a, b) => a.price - b.price)[0];
  return `From ${new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(cheapest.price)} / package`;
}

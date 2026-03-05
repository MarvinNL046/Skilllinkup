import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skilllinkup.com";

export const revalidate = 3600; // refresh every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/online`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/local`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/jobs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/become-seller`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const [freelancers, gigs, jobs, projects, resources] = await Promise.all([
      fetchQuery(api.marketplace.freelancers.list, { limit: 1000 }).catch(() => []),
      fetchQuery(api.marketplace.gigs.list, { locale: "en", limit: 1000 }).catch(() => []),
      fetchQuery(api.marketplace.jobs.list, { locale: "en", limit: 1000 }).catch(() => []),
      fetchQuery(api.marketplace.projects.list, { locale: "en", limit: 1000 }).catch(() => []),
      fetchQuery(api.resources.list, { locale: "en", status: "published", limit: 500 }).catch(() => []),
    ]);

    const freelancerRoutes: MetadataRoute.Sitemap = (freelancers ?? []).map((f: any) => ({
      url: `${BASE_URL}/online/freelancer/${f._id}`,
      lastModified: new Date(f.updatedAt || f.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const gigRoutes: MetadataRoute.Sitemap = (gigs ?? []).map((g: any) => ({
      url: `${BASE_URL}/online/service/${g.slug}`,
      lastModified: new Date(g.updatedAt || g.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const jobRoutes: MetadataRoute.Sitemap = (jobs ?? []).map((j: any) => ({
      url: `${BASE_URL}/jobs/job/${j.slug}`,
      lastModified: new Date(j.updatedAt || j.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const projectRoutes: MetadataRoute.Sitemap = (projects ?? []).map((p: any) => ({
      url: `${BASE_URL}/online/project/${p.slug}`,
      lastModified: new Date(p.updatedAt || p.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    const resourceRoutes: MetadataRoute.Sitemap = (resources ?? []).map((r: any) => ({
      url: `${BASE_URL}/resources/${r.slug}`,
      lastModified: new Date(r.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }));

    return [...staticRoutes, ...freelancerRoutes, ...gigRoutes, ...jobRoutes, ...projectRoutes, ...resourceRoutes];
  } catch {
    return staticRoutes;
  }
}

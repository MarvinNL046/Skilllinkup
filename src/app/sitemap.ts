import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skilllinkup.com";

export const revalidate = 3600; // refresh every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/online`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/services`, changeFrequency: "daily", priority: 0.9 },
    {
      url: `${BASE_URL}/services/webdesign`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/online/freelancers`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    { url: `${BASE_URL}/projects`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/local`, changeFrequency: "daily", priority: 0.9 },
    {
      url: `${BASE_URL}/local/craftsmen`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/local/quote-requests`,
      changeFrequency: "daily",
      priority: 0.7,
    },
    { url: `${BASE_URL}/jobs`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/jobs/browse`, changeFrequency: "daily", priority: 0.9 },
    {
      url: `${BASE_URL}/jobs/companies`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${BASE_URL}/platforms`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/resources`, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${BASE_URL}/become-seller`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    { url: `${BASE_URL}/pricing`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/help`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
    {
      url: `${BASE_URL}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  try {
    const [freelancers, gigs, jobs, projects, resources, platforms, posts] =
      await Promise.all([
        fetchQuery(api.marketplace.freelancers.list, { limit: 1000 }).catch(
          () => [],
        ),
        fetchQuery(api.marketplace.gigs.list, {
          locale: "en",
          limit: 1000,
        }).catch(() => []),
        fetchQuery(api.marketplace.jobs.list, {
          locale: "en",
          limit: 1000,
        }).catch(() => []),
        fetchQuery(api.marketplace.projects.list, {
          locale: "en",
          limit: 1000,
        }).catch(() => []),
        fetchQuery(api.resources.list, {
          locale: "en",
          status: "published",
          limit: 500,
        }).catch(() => []),
        fetchQuery(api.platforms.list, { locale: "en", limit: 200 }).catch(
          () => [],
        ),
        fetchQuery(api.posts.list, { locale: "en", limit: 500 }).catch(
          () => [],
        ),
      ]);

    const freelancerRoutes: MetadataRoute.Sitemap = (freelancers ?? []).map(
      (f: any) => ({
        url: `${BASE_URL}/online/freelancer/${f._id}`,
        lastModified: new Date(f.updatedAt || f.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }),
    );

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

    const projectRoutes: MetadataRoute.Sitemap = (projects ?? []).map(
      (p: any) => ({
        url: `${BASE_URL}/online/project/${p.slug}`,
        lastModified: new Date(p.updatedAt || p.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }),
    );

    const resourceRoutes: MetadataRoute.Sitemap = (resources ?? []).map(
      (r: any) => ({
        url: `${BASE_URL}/resources/${r.slug}`,
        lastModified: new Date(r.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.85,
      }),
    );

    const platformRoutes: MetadataRoute.Sitemap = (platforms ?? []).map(
      (p: any) => ({
        url: `${BASE_URL}/platforms/${p.slug}`,
        lastModified: new Date(p.updatedAt || p.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }),
    );

    const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((p: any) => ({
      url: `${BASE_URL}/post/${p.slug}`,
      lastModified: new Date(p.updatedAt || p.publishedAt || p.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [
      ...staticRoutes,
      ...freelancerRoutes,
      ...gigRoutes,
      ...jobRoutes,
      ...projectRoutes,
      ...resourceRoutes,
      ...platformRoutes,
      ...postRoutes,
    ];
  } catch {
    return staticRoutes;
  }
}

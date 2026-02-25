import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JobsClient from "./JobsClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function JobsPage({ params }: PageProps) {
  const { locale } = await params;

  let jobs: any[] = [];
  let categories: any[] = [];

  try {
    [jobs, categories] = await Promise.all([
      fetchQuery(api.marketplace.jobs.list, { locale, limit: 60 }),
      fetchQuery(api.marketplace.categories.list, { locale }),
    ]);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  const mappedJobs = jobs.map((job: any) => ({
    slug: job.slug,
    title: job.title,
    company: job.company ?? null,
    companyLogo: job.companyLogo ?? null,
    category: job.categoryName ?? "Uncategorized",
    categorySlug: job.categoryName
      ? job.categoryName.toLowerCase().replace(/\s+/g, "-")
      : "uncategorized",
    locationCity: job.locationCity ?? null,
    locationCountry: job.locationCountry ?? null,
    workType: job.workType ?? null,
    jobType: job.jobType,
    salaryMin: job.salaryMin ?? null,
    salaryMax: job.salaryMax ?? null,
    currency: job.currency ?? "EUR",
    benefits: Array.isArray(job.benefits) ? job.benefits : [],
    requiredSkills: Array.isArray(job.requiredSkills) ? job.requiredSkills : [],
    createdAt: job.createdAt,
  }));

  const mappedCategories = categories.map((cat: any) => ({
    name: cat.name,
    slug: cat.slug,
  }));

  return (
    <>
      <Breadcrumb title="Jobs" brief="Find your next opportunity" />
      <JobsClient jobs={mappedJobs} categories={mappedCategories} />
    </>
  );
}

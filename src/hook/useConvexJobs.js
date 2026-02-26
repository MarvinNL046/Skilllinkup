"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function mapConvexJob(job, index) {
  const benefits = [];
  if (job.salaryMin && job.salaryMax) {
    benefits.push(`$${Math.round(job.salaryMin / 1000)}k-$${Math.round(job.salaryMax / 1000)}k`);
  }
  if (job.jobType) benefits.push(job.jobType);
  if (job.workType) benefits.push(job.workType === "remote" ? "Remote" : job.workType);
  if (job.experienceLevel) benefits.push(job.experienceLevel);

  return {
    id: index + 1,
    _id: job._id,
    img: job.companyLogo || "/images/listings/g-1.jpg",
    title: job.title || "Untitled Job",
    server: job.company || job.clientName || "Company",
    benefits: benefits.length > 0 ? benefits : ["Freelance", "Remote"],
    category: job.categoryName || "General",
    salary: job.salaryMax || job.salaryMin || 0,
    jobType: job.jobType || "Freelance",
    level: "lavel-1",
    sort: "new-arrivals",
    slug: job.slug,
  };
}

export default function useConvexJobs() {
  const convexJobs = useQuery(api.marketplace.jobs.list, { locale: "en" });

  // undefined means still loading
  if (convexJobs === undefined) {
    return undefined;
  }

  // Map Convex data (may be empty array)
  return convexJobs.map(mapConvexJob);
}

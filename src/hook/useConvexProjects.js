"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function mapConvexProject(project, index) {
  const currency = project.currency || "EUR";
  const budget = project.budgetMin || project.budgetMax
    ? new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      })
    : null;
  const minBudget = project.budgetMin ? budget.format(project.budgetMin) : null;
  const maxBudget = project.budgetMax ? budget.format(project.budgetMax) : null;
  const imageClasses = ["imageOne", "imageFour", "imageTwo", "imageFive", "imageSix", "portfolioTwo"];

  return {
    id: project._id || index + 1,
    _id: project._id,
    title: project.title || "Untitled Project",
    company: project.clientName || "Skilllinkup client",
    verified: project.clientVerified === true,
    featured: false,
    fresh: false,
    category: project.categoryName || project.requiredSkills?.[0] || "Other",
    location: project.locationCity
      ? [project.locationCity, project.locationCountry].filter(Boolean).join(", ")
      : project.workType === "remote" ? "Online" : "On-site",
    mode: project.workType === "remote" ? "online" : "local",
    budget: minBudget && maxBudget
      ? `${minBudget} – ${maxBudget}`
      : minBudget || maxBudget || "Budget to agree",
    duration: project.deadline
      ? `Deadline ${new Date(project.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
      : "Timing to agree",
    posted: new Date(project.publishedAt || project.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    proposals: project.bidCount || 0,
    copy: project.description || "Open project on Skilllinkup.",
    tags: project.requiredSkills || [],
    image: imageClasses[index % imageClasses.length],
    slug: project.slug,
    status: project.status,
  };
}

export default function useConvexProjects() {
  const convexProjects = useQuery(api.marketplace.projects.list, { locale: "en" });

  // undefined means still loading
  if (convexProjects === undefined) {
    return undefined;
  }

  // Map Convex data (may be empty array)
  return convexProjects.map(mapConvexProject);
}

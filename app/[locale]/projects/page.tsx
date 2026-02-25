import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProjectsClient from "./ProjectsClient";
import { ProjectCardData } from "@/components/marketplace/ProjectCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects | SkillLinkup",
  description:
    "Browse open client projects on SkillLinkup and submit your bid. Find freelance projects in web development, design, marketing, and more.",
  openGraph: {
    title: "Projects | SkillLinkup",
    description:
      "Browse open client projects on SkillLinkup and submit your bid. Find freelance projects in web development, design, marketing, and more.",
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

function nameToSlug(name: string | null | undefined): string {
  if (!name) return "uncategorized";
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;

  let projects: any[] = [];
  let categories: any[] = [];

  try {
    [projects, categories] = await Promise.all([
      fetchQuery(api.marketplace.projects.list, { locale, limit: 60 }),
      fetchQuery(api.marketplace.categories.list, { locale }),
    ]);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  const mappedProjects: ProjectCardData[] = projects.map((project: any) => ({
    slug: project.slug,
    title: project.title,
    description: project.description ?? "",
    category: project.categoryName ?? "Uncategorized",
    categorySlug: nameToSlug(project.categoryName),
    clientName: project.clientName ?? "Client",
    clientAvatar: project.clientAvatar ?? null,
    budgetMin: project.budgetMin != null ? Number(project.budgetMin) : null,
    budgetMax: project.budgetMax != null ? Number(project.budgetMax) : null,
    currency: project.currency ?? "EUR",
    bidCount: Number(project.bidCount ?? 0),
    requiredSkills: Array.isArray(project.requiredSkills) ? project.requiredSkills : [],
    workType: project.workType ?? null,
    locationCountry: project.locationCountry ?? null,
    createdAt: Number(project.createdAt ?? project._creationTime ?? Date.now()),
  }));

  const mappedCategories = categories.map((cat: any) => ({
    name: cat.name,
    slug: nameToSlug(cat.name),
  }));

  return (
    <>
      <Breadcrumb
        title="Projects"
        brief="Browse open projects and submit your bid"
      />
      <ProjectsClient projects={mappedProjects} categories={mappedCategories} />
    </>
  );
}

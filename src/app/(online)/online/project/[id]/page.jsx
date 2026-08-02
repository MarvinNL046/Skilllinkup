import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import ProjectDetail from "@/components/projects/ProjectDetail";

export async function generateMetadata({ params }) {
  const { id } = await params;
  if (id === "sustainable-interior-brand") {
    return {
      title: "New website for a sustainable interior brand",
      description:
        "View this featured web design project and send a proposal on SkillLinkup.",
    };
  }
  try {
    const project = await fetchQuery(api.marketplace.projects.getBySlug, {
      slug: id,
      locale: "en",
    });
    if (project) {
      return {
        title: project.title,
        description: project.description
          ? project.description.slice(0, 155)
          : `Project: ${project.title} on SkillLinkup.`,
        openGraph: {
          title: project.title,
          description: project.description?.slice(0, 155) || project.title,
        },
      };
    }
  } catch {}
  return {
    title: "Project",
    description: "View project details on SkillLinkup.",
  };
}

export default async function page({ params }) {
  const { id } = await params;

  return <ProjectDetail />;
}

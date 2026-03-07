import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import ProjectDetail3 from "@/components/section/ProjectDetails3";
import TabSection1 from "@/components/section/TabSection1";

export async function generateMetadata({ params }) {
  const { id } = await params;
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

  return (
    <>
      <TabSection1 />
      <div className="bgc-thm3">
        <Breadcumb10 path={["Home", "Services", "Design & Creative"]} />
        <ProjectDetail3 />
      </div>
    </>
  );
}

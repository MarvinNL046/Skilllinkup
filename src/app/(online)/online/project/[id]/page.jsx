import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import ProjectDetail3 from "@/components/section/ProjectDetails3";
import TabSection1 from "@/components/section/TabSection1";

export const metadata = {
  title: "SkillLinkup | Project Single",
};

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

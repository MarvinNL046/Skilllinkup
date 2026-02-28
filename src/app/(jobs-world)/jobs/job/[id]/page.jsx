import TabSection1 from "@/components/section/TabSection1";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Breadcumb13 from "@/components/breadcumb/Breadcumb13";
import JobDetail1 from "@/components/section/JobDetail1";

export const metadata = {
  title: "SkillLinkup | Job Single",
};

export default async function page({ params }) {
  const { id } = await params;

  return (
    <>
      <TabSection1 />
      <Breadcumb10 path={["Home", "Jobs", "Detail"]} />
      <Breadcumb13 />
      <JobDetail1 />
    </>
  );
}

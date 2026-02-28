import Breadcumb18 from "@/components/breadcumb/Breadcumb18";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Listing19 from "@/components/section/Listing19";

export const metadata = {
  title: "Browse Projects | SkillLinkup",
  description: "Find freelance projects and opportunities on SkillLinkup. Browse open projects across all categories and submit your proposal.",
};

export default function page() {
  return (
    <>
      <Breadcumb3 path={["Home", "Projects"]} />
      <Breadcumb18 />
      <Listing19 />
    </>
  );
}

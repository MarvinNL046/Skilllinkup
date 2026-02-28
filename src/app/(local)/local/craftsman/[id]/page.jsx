import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import FreelancerDetail3 from "@/components/section/FreelancerDetails3";

export const metadata = {
  title: "Craftsman Profile | SkillLinkup",
  description: "View craftsman profile, portfolio, reviews, and services on SkillLinkup. Hire with confidence.",
};

export default async function CraftsmanDetailPage({ params }) {
  const { id } = await params;

  return (
    <div className="bgc-thm3">
      <Breadcumb10 path={["Home", "Local", "Craftsmen"]} />
      <FreelancerDetail3 />
    </div>
  );
}

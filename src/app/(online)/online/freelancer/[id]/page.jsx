import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import FreelancerDetail3 from "@/components/section/FreelancerDetails3";

export const metadata = {
  title: "Freelancer Profile | SkillLinkup",
  description: "View freelancer profile, portfolio, reviews, and services on SkillLinkup. Hire with confidence.",
};

export default async function page({ params }) {
  const { id } = await params;

  return (
    <div className="bgc-thm3">
      <Breadcumb10 path={["Home", "Freelancers"]} />
      <FreelancerDetail3 />
    </div>
  );
}

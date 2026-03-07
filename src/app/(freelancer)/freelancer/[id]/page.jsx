import { notFound } from "next/navigation";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";

import FreelancerDetail3 from "@/components/section/FreelancerDetails3";

function isValidConvexId(id) {
  return id && typeof id === "string" && id.length > 10 && !/^\d+$/.test(id);
}

export const metadata = {
    title: "Freelancer Profile | SkillLinkup",
    description: "View freelancer profile, portfolio, reviews, and services on SkillLinkup. Hire with confidence.",
};

export default async function page({ params }) {
    const { id } = await params;
    if (!isValidConvexId(id)) notFound();
    return (
        <>
            <Header20 />
            <div className="bgc-thm3">
                <Breadcumb10 path={["Home", "Freelancers"]} />
                <FreelancerDetail3 />
            </div>
            <Footer14 />
        </>
    );
}

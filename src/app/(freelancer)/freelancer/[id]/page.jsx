import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";

import FreelancerDetail3 from "@/components/section/FreelancerDetails3";

export const metadata = {
    title: "Freelancer Profile | SkillLinkup",
    description: "View freelancer profile, portfolio, reviews, and services on SkillLinkup. Hire with confidence.",
};

export default function page() {
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

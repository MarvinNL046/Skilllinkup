import Breadcumb16 from "@/components/breadcumb/Breadcumb16";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";

import Listing14 from "@/components/section/Listing14";
import TabSection1 from "@/components/section/TabSection1";

export const metadata = {
    title: "Find Freelancers | SkillLinkup",
    description: "Browse top-rated freelancers on SkillLinkup. Filter by skill, location, and rating to find the perfect professional for your project.",
};

export default function page() {
    return (
        <>
            <Header20 />
            <TabSection1 />
            <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
            <Breadcumb16 />
            <Listing14 />
            <Footer14 />
        </>
    );
}

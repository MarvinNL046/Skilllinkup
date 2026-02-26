import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";

import Listing14 from "@/components/section/Listing14";

export const metadata = {
    title: "Find Freelancers | SkillLinkup",
    description: "Browse top-rated freelancers on SkillLinkup. Filter by skill, location, and rating to find the perfect professional for your project.",
};

export default function page() {
    return (
        <>
            <Header20 />
            <Breadcumb1
                title="Find Freelancers"
                brief="Browse talented professionals ready to work on your project."
                isBtnActive={false}
            />
            <Listing14 />
            <Footer14 />
        </>
    );
}

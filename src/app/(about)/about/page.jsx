import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";

import About5 from "@/components/section/About5";
import CtaBanner3 from "@/components/section/CtaBanner3";
import CtaBanner4 from "@/components/section/CtaBanner4";
import OurFaq1 from "@/components/section/OurFaq1";

export const metadata = {
    title: "About Us | SkillLinkup",
    description: "Learn about SkillLinkup, our mission to connect freelancers with clients worldwide, and the team behind the platform.",
};

export default function page() {
    return (
        <>
            <Header20 />
            <Breadcumb1
                title="About SkillLinkup"
                brief="Your guide to navigating the freelance world with confidence."
                isBtnActive={false}
            />
            <About5 />
            <CtaBanner3 />
            <CtaBanner4 />
            <OurFaq1 />
            <Footer14 />
        </>
    );
}

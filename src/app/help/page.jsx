import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import OurFaqSection1 from "@/components/section/OurFaqSection1";

export const metadata = {
    title: "Help & Support | SkillLinkup",
    description: "Get help with SkillLinkup. Browse our support articles, guides, and resources for freelancers and clients.",
};

export default function page() {
    return (
        <>
            <Header20 />
            <OurFaqSection1 />
            <Footer14 />
        </>
    );
}

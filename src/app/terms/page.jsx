import Footer from "@/components/footer/Footer";
import Header20 from "@/components/header/Header20";
import TermsCondition1 from "@/components/section/TermsCondition1";

export const metadata = {
    title: "Terms of Service | SkillLinkup",
    description: "Read the SkillLinkup terms of service. Understand the rules and guidelines that govern use of our freelance marketplace platform.",
};

export default function page() {
    return (
        <>
            <Header20 />
            <TermsCondition1 />
            <Footer />
        </>
    );
}

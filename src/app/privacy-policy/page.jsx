import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import PrivacyPolicy from "@/components/section/PrivacyPolicy";

export const metadata = {
    title: "Privacy Policy",
    description: "Learn how SkillLinkup collects, uses, and protects your personal data. Our privacy policy covers cookies, authentication, analytics, and your GDPR rights.",
};

export default function page() {
    return (
        <>
            <Header20 />
            <PrivacyPolicy />
            <Footer14 />
        </>
    );
}

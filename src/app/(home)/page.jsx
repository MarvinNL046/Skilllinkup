import Footer14 from "@/components/footer/Footer14";
import Header19 from "@/components/header/Header19";
import Hero20 from "@/components/hero/Hero20";
import CtaBanner18 from "@/components/section/CtaBanner18";
import NeedSomething2 from "@/components/section/NeedSomething2";
import TrendingService14 from "@/components/section/TrendingService14";

export const metadata = {
    title: "SkillLinkup - Freelance Marketplace",
    description: "Find top freelancers and post projects on SkillLinkup. Connect with skilled professionals for design, development, writing, marketing, and more.",
};

export default function page() {
    return (
        <>
            <div className="wrapper ovh">
                <Header19 />
                <div className="body_content">
                    <Hero20 />
                    <TrendingService14 />
                    <NeedSomething2 />
                    <CtaBanner18 />
                </div>
                <Footer14 />
            </div>
        </>
    );
}

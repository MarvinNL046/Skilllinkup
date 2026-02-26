import Footer from "@/components/footer/Footer";
import Header20 from "@/components/header/Header20";
import PriceTable1 from "@/components/section/PriceTable1";

export const metadata = {
    title: "Pricing | SkillLinkup",
    description: "View SkillLinkup pricing plans for freelancers and clients. Find the right plan to grow your freelance business or hire top talent.",
};

export default function page() {
    return (
        <>
            <Header20 />
            <PriceTable1 />
            <Footer />
        </>
    );
}

import { Suspense } from "react";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import Listing6 from "@/components/section/Listing6";

export const metadata = {
    title: "Browse Services | SkillLinkup",
    description: "Explore freelance services on SkillLinkup. Find the right service for your project across design, development, writing, marketing, and more.",
};

export default function page() {
    return (
        <>
            <Header20 />
            <Suspense>
                <Listing6 />
            </Suspense>
            <Footer14 />
        </>
    );
}

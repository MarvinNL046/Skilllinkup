import { Suspense } from "react";
import Breadcumb18 from "@/components/breadcumb/Breadcumb18";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Header20 from "@/components/header/Header20";
import Listing19 from "@/components/section/Listing19";

export const metadata = {
    title: "Browse Projects | SkillLinkup",
    description: "Find freelance projects and opportunities on SkillLinkup. Browse open projects across all categories and submit your proposal.",
};

export default function page() {
    return (
        <>
            <Header20 />
            <Breadcumb3 path={["Home", "Projects"]} />
            <Suspense>
                <Breadcumb18 />
                <Listing19 />
            </Suspense>
        </>
    );
}

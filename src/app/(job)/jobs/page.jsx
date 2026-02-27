import Breadcumb12 from "@/components/breadcumb/Breadcumb12";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Header20 from "@/components/header/Header20";

import Listing16 from "@/components/section/Listing16";

export const metadata = {
    title: "Find Jobs | SkillLinkup",
    description: "Browse freelance job listings on SkillLinkup. Find remote and local opportunities that match your skills and experience.",
};

export default function page() {
    return (
        <>
            <Header20 />
            <Breadcumb3 path={["Home", "Jobs"]} />
            <Breadcumb12 />
            <Listing16 />
        </>
    );
}

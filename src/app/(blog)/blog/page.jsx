import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";

import BlogArea3 from "@/components/section/BlogArea3";

export const metadata = {
    title: "Blog | SkillLinkup",
    description: "Read the latest tips, guides, and insights for freelancers and clients on the SkillLinkup blog.",
};

export default function page() {
    return (
        <>
            <Header20 />
            <Breadcumb1
                title="SkillLinkup Blog"
                brief="Tips, guides, and insights for freelancers and clients."
                isBtnActive={false}
            />
            <BlogArea3 />
            <Footer14 />
        </>
    );
}

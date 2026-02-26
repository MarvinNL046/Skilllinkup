import Breadcumb2 from "@/components/breadcumb/Breadcumb2";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer from "@/components/footer/Footer";
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
            <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
            <Breadcumb2
                title="SkillLinkup Blog"
                brief="Give your visitor a smooth online experience with a solid UX design"
            />
            <BlogArea3 />
            <Footer />
        </>
    );
}

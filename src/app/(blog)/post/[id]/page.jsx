import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import BlogArea4 from "@/components/section/BlogArea4";
import RecentPostArea1 from "@/components/section/RecentPostArea1";

export const metadata = {
    title: "SkillLinkup | Blog Single",
};

export default function page() {
    return (
        <>
            <Header20 />
            <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
            <BlogArea4 />
            <RecentPostArea1 />
            <Footer14 />
        </>
    );
}

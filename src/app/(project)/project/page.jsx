import { getTranslations } from "next-intl/server";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Header20 from "@/components/header/Header20";

import ProjectDetail3 from "@/components/section/ProjectDetails3";
import TabSection1 from "@/components/section/TabSection1";

export async function generateMetadata() {
    const t = await getTranslations("pageMeta.projectSingle");
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function page() {
    return (
        <>
            <Header20 />
            <TabSection1 />
            <div className="bgc-thm3">
                <Breadcumb10 path={["Home", "Services", "Design & Creative"]} />
                {/* <Breadcumb11 /> */}
                <ProjectDetail3 />
            </div>
        </>
    );
}

import { getTranslations } from "next-intl/server";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Header20 from "@/components/header/Header20";

import ProjectDetail3 from "@/components/section/ProjectDetails3";
import TabSection1 from "@/components/section/TabSection1";

export async function generateMetadata() {
    const t = await getTranslations("projectDetail");
    return {
        title: t("title"),
        description: t("metaDescription"),
    };
}

export default async function page() {
    const t = await getTranslations("projectDetail");
    return (
        <>
            <Header20 />
            <TabSection1 />
            <div className="bgc-thm3">
                <Breadcumb10 path={[t("breadcrumbHome"), t("breadcrumbProjects")]} />
                <ProjectDetail3 />
            </div>
        </>
    );
}

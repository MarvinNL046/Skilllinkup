import { getTranslations } from "next-intl/server";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Breadcumb15 from "@/components/breadcumb/Breadcumb15";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";

import EmplyeeDetail1 from "@/components/section/EmplyeeDetail1";
import JobInvision1 from "@/components/section/JobInvision1";
import TabSection1 from "@/components/section/TabSection1";

export async function generateMetadata() {
    const t = await getTranslations("pageMeta.employeeSingle");
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
            <Breadcumb10 path={["Home", "Services", "Design & Creative"]} />
            <Breadcumb15 />
            <EmplyeeDetail1 />
            <JobInvision1 />
            <Footer14 />
        </>
    );
}

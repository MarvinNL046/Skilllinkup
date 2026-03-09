import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import PopulerService from "@/components/section/PopulerService";
import ServiceDetail3 from "@/components/section/ServiceDetails3";
import TabSection1 from "@/components/section/TabSection1";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("gigDetail");
    return {
        title: t("title"),
        description: t("metaDescription"),
    };
}

export default async function page() {
    const t = await getTranslations("gigDetail");
    return (
        <>
            <Header20 />
            <TabSection1 />
            <div className=" bgc-thm3">
                <Breadcumb3 path={[t("breadcrumbHome"), t("breadcrumbServices"), t("breadcrumbCategory")]} />
                <ServiceDetail3 />
                <PopulerService />
            </div>
            <Footer14 />
        </>
    );
}

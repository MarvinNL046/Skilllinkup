import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import BlogArea3 from "@/components/section/BlogArea3";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("blogListing");
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        openGraph: {
            title: t("metaTitle"),
            description: t("metaDescription"),
        },
    };
}

export default async function page() {
    const t = await getTranslations("blogListing");
    return (
        <>
            <Header20 />
            <Breadcumb1
                title={t("breadcrumbTitle")}
                brief={t("breadcrumbBrief")}
                isBtnActive={false}
            />
            <BlogArea3 />
            <Footer14 />
        </>
    );
}

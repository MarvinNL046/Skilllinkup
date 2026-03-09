import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";

import About5 from "@/components/section/About5";
import CtaBanner3 from "@/components/section/CtaBanner3";
import CtaBanner4 from "@/components/section/CtaBanner4";
import OurFaq1 from "@/components/section/OurFaq1";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("about");
    return {
        title: t("title"),
        description: t("metaDescription"),
        openGraph: {
            title: t("title"),
            description: t("metaDescription"),
            url: "https://skilllinkup.com/about",
        },
    };
}

export default async function page() {
    const t = await getTranslations("about");
    return (
        <>
            <Header20 />
            <Breadcumb1
                title={t("breadcrumbTitle")}
                brief={t("breadcrumbBrief")}
                isBtnActive={false}
            />
            <About5 />
            <CtaBanner3 />
            <CtaBanner4 />
            <OurFaq1 />
            <Footer14 />
        </>
    );
}

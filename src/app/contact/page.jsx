import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";

import ContactInfo1 from "@/components/section/ContactInfo1";
import OurFaq1 from "@/components/section/OurFaq1";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("contact");
    return {
        title: t("title"),
        description: t("metaDescription"),
        openGraph: {
            title: t("title"),
            description: t("metaDescription"),
            url: "https://skilllinkup.com/contact",
        },
    };
}

export default async function page() {
    const t = await getTranslations("contact");
    return (
        <>
            <Header20 />
            <Breadcumb1
                title={t("breadcrumbTitle")}
                brief={t("breadcrumbBrief")}
                isBtnActive={false}
            />
            <ContactInfo1 />
            <OurFaq1 />
            <Footer14 />
        </>
    );
}

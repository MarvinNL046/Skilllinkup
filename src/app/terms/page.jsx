import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import TermsCondition1 from "@/components/section/TermsCondition1";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("terms");
    return {
        title: t("title"),
        description: t("metaDescription"),
        openGraph: {
            title: t("title"),
            description: t("metaDescription"),
            url: "https://skilllinkup.com/terms",
        },
    };
}

export default function page() {
    return (
        <>
            <Header20 />
            <TermsCondition1 />
            <Footer14 />
        </>
    );
}

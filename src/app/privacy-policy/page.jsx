import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import PrivacyPolicy from "@/components/section/PrivacyPolicy";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("privacy");
    return {
        title: t("title"),
        description: t("metaDescription"),
        openGraph: {
            title: t("title"),
            description: t("metaDescription"),
            url: "https://skilllinkup.com/privacy-policy",
        },
    };
}

export default function page() {
    return (
        <>
            <Header20 />
            <PrivacyPolicy />
            <Footer14 />
        </>
    );
}

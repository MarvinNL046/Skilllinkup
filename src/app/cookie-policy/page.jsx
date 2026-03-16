import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import CookiePolicy from "@/components/section/CookiePolicy";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("cookiePolicy");
    return {
        title: t("title"),
        description: t("metaDescription"),
        openGraph: {
            title: t("title"),
            description: t("metaDescription"),
            url: "https://skilllinkup.com/cookie-policy",
        },
    };
}

export default function page() {
    return (
        <>
            <Header20 />
            <CookiePolicy />
            <Footer14 />
        </>
    );
}

import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import AffiliateDisclosure from "@/components/section/AffiliateDisclosure";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("affiliateDisclosure");
    return {
        title: t("title"),
        description: t("metaDescription"),
        openGraph: {
            title: t("title"),
            description: t("metaDescription"),
            url: "https://skilllinkup.com/affiliate-disclosure",
        },
    };
}

export default function page() {
    return (
        <>
            <Header20 />
            <AffiliateDisclosure />
            <Footer14 />
        </>
    );
}

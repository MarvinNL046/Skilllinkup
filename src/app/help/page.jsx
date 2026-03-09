import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import OurFaqSection1 from "@/components/section/OurFaqSection1";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("help");
    return {
        title: t("title"),
        description: t("metaDescription"),
        openGraph: {
            title: t("title"),
            description: t("metaDescription"),
            url: "https://skilllinkup.com/help",
        },
    };
}

export default function page() {
    return (
        <>
            <Header20 />
            <OurFaqSection1 />
            <Footer14 />
        </>
    );
}

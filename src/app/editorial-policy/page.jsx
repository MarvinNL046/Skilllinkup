import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import EditorialPolicy from "@/components/section/EditorialPolicy";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("editorialPolicy");
    return {
        title: t("title"),
        description: t("metaDescription"),
        openGraph: {
            title: t("title"),
            description: t("metaDescription"),
            url: "https://skilllinkup.com/editorial-policy",
        },
    };
}

export default function page() {
    return (
        <>
            <Header20 />
            <EditorialPolicy />
            <Footer14 />
        </>
    );
}

import { getTranslations } from "next-intl/server";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import ServicesOverview from "@/components/services/ServicesOverview";

export async function generateMetadata() {
    const t = await getTranslations("pageMeta.services");
    return {
        title: t("title"),
        description: t("description"),
        openGraph: {
            title: t("title"),
            description: t("description"),
        },
        alternates: { canonical: "/services" },
    };
}

export default function page() {
    return (
        <>
            <Header20 />
            <ServicesOverview />
            <Footer14 />
        </>
    );
}

import { SeoServiceLinks } from '@/components/seo/SeoPage';
import { getTranslations } from "next-intl/server";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import ServicesOverview from "@/components/services/ServicesOverview";
import ServiceSearchResults from "@/components/services/ServiceSearchResults";

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

export default async function page({ searchParams }) {
    const params = await searchParams;
    const query = typeof params?.q === "string" ? params.q.slice(0, 200) : "";
    return (
        <>
            <Header20 />
            {params?.q !== undefined ? <ServiceSearchResults query={query} /> : <ServicesOverview />}
            {params?.q === undefined && <SeoServiceLinks />}
            <Footer14 />
        </>
    );
}

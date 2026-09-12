import { redirect } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { discoveryHref } from "@/lib/marketplaceDiscovery.mjs";
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
    let query = typeof params?.q === "string" ? params.q.slice(0, 200) : "";
    if (params?.scope === "local" || params?.scope === "jobs") {
        redirect(discoveryHref({ scope: params.scope, query, location: typeof params.location === "string" ? params.location : "" }));
    }
    let category = null;
    if (typeof params?.category === "string" && params.category) {
        category = await fetchQuery(api.marketplace.categories.getBySlug, { slug: params.category, locale: "en" });
        if (!category && !query) query = params.category.replaceAll("-", " ");
    }
    const hasSearch = params?.q !== undefined || params?.category !== undefined || params?.location !== undefined;
    return (
        <>
            <Header20 />
            {hasSearch ? <ServiceSearchResults category={category?.slug || ""} categoryName={category?.name || ""} query={query} location={typeof params.location === "string" ? params.location.slice(0, 120) : ""} /> : <ServicesOverview />}
            {!hasSearch && <SeoServiceLinks />}
            <Footer14 />
        </>
    );
}

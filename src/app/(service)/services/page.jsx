import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import Listing6 from "@/components/section/Listing6";

export async function generateMetadata() {
    const t = await getTranslations("pageMeta.services");
    return {
        title: t("title"),
        description: t("description"),
        openGraph: {
            title: t("title"),
            description: t("description"),
        },
    };
}

export default function page() {
    return (
        <>
            <Header20 />
            <Suspense>
                <Listing6 />
            </Suspense>
            <Footer14 />
        </>
    );
}

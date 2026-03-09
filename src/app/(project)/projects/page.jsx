import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Breadcumb18 from "@/components/breadcumb/Breadcumb18";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Header20 from "@/components/header/Header20";
import Listing19 from "@/components/section/Listing19";

export async function generateMetadata() {
    const t = await getTranslations("pageMeta.projects");
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
            <Breadcumb3 path={["Home", "Projects"]} />
            <Suspense>
                <Breadcumb18 />
                <Listing19 />
            </Suspense>
        </>
    );
}

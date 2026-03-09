import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import Listing14 from "@/components/section/Listing14";

export async function generateMetadata() {
    const t = await getTranslations("pageMeta.freelancers");
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
            <Breadcumb1
                title="Find Freelancers"
                brief="Browse talented professionals ready to work on your project."
                isBtnActive={false}
            />
            <Suspense>
                <Listing14 />
            </Suspense>
            <Footer14 />
        </>
    );
}

import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import AuthorsTeam from "@/components/section/AuthorsTeam";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("authorsTeam");
    return {
        title: t("title"),
        description: t("metaDescription"),
        openGraph: {
            title: t("title"),
            description: t("metaDescription"),
            url: "https://skilllinkup.com/authors",
        },
    };
}

export default function page() {
    return (
        <>
            <Header20 />
            <AuthorsTeam />
            <Footer14 />
        </>
    );
}

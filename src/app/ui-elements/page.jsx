import { getTranslations } from "next-intl/server";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import UiElement from "@/components/section/UiElement";

export async function generateMetadata() {
    const t = await getTranslations("pageMeta.uiElements");
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function page() {
    return (
        <>
            <Header20 />
            <UiElement />
            <Footer14 />
        </>
    );
}

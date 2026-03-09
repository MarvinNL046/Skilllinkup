import { getTranslations } from "next-intl/server";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import EmptyState from "@/components/ui/EmptyState";

export async function generateMetadata() {
    const t = await getTranslations("pageMeta.freelancerProfile");
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function page() {
    return (
        <>
            <Header20 />
            <section className="pt60 pb90">
                <div className="container">
                    <EmptyState
                        icon="👤"
                        title="Freelancer not found"
                        description="This profile doesn't exist or has been removed."
                        actionLabel="Browse Freelancers"
                        actionHref="/freelancers"
                    />
                </div>
            </section>
            <Footer14 />
        </>
    );
}

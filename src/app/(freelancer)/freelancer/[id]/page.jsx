import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";

import FreelancerDetail3 from "@/components/section/FreelancerDetails3";

// Accept both Convex IDs (alphanumeric) and URL slugs (with hyphens)
function isValidParam(id) {
  return id && typeof id === "string" && id.length >= 2 && /^[a-zA-Z0-9-]+$/.test(id);
}

export async function generateMetadata() {
    const t = await getTranslations("freelancerProfile");
    return {
        title: t("title"),
        description: t("metaDescription"),
    };
}

export default async function page({ params }) {
    const { id } = await params;
    if (!isValidParam(id)) notFound();
    const t = await getTranslations("freelancerProfile");
    return (
        <>
            <Header20 />
            <div className="bgc-thm3">
                <Breadcumb10 path={[t("breadcrumbHome"), t("breadcrumbFreelancers")]} />
                <FreelancerDetail3 />
            </div>
            <Footer14 />
        </>
    );
}

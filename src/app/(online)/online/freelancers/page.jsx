import { getTranslations } from "next-intl/server";
import FreelancerDirectory from "@/components/freelancers/FreelancerDirectory";

export async function generateMetadata() {
  const t = await getTranslations("pageMeta.onlineFreelancers");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
    alternates: { canonical: "/online/freelancers" },
  };
}

export default function page() {
  return <FreelancerDirectory />;
}

import { getTranslations } from "next-intl/server";
import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import QuoteRequestListing from "@/components/section/QuoteRequestListing";

export async function generateMetadata() {
  const t = await getTranslations("localHub");
  return {
    title: t("quoteRequestsTitle"),
    description: t("quoteRequestsDescription"),
  };
}

export default async function QuoteRequestsPage() {
  const t = await getTranslations("localHub");
  return (
    <>
      <Breadcumb1
        title={t("quoteRequestsHeading")}
        brief={t("quoteRequestsBrief")}
        isBtnActive={false}
      />
      <QuoteRequestListing />
    </>
  );
}

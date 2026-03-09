import { getTranslations } from "next-intl/server";
import QuoteRequestDetail from "@/components/section/QuoteRequestDetail";

export async function generateMetadata() {
  const t = await getTranslations("localHub");
  return { title: t("quoteRequestDetailTitle") };
}

export default async function QuoteRequestDetailPage({ params }) {
  const { id } = await params;
  return <QuoteRequestDetail requestId={id} />;
}

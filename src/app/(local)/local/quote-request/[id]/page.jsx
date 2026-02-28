import QuoteRequestDetail from "@/components/section/QuoteRequestDetail";

export const metadata = { title: "Quote Request — SkillLinkup" };

export default async function QuoteRequestDetailPage({ params }) {
  const { id } = await params;
  return <QuoteRequestDetail requestId={id} />;
}

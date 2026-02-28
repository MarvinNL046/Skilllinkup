import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import QuoteRequestListing from "@/components/section/QuoteRequestListing";

export const metadata = {
  title: "Quote Requests | SkillLinkup Local",
  description: "Browse open quote requests from homeowners and businesses looking for skilled local craftsmen.",
};

export default function QuoteRequestsPage() {
  return (
    <>
      <Breadcumb1
        title="Open Quote Requests"
        brief="Browse job requests from clients looking for skilled craftsmen near them."
        isBtnActive={false}
      />
      <QuoteRequestListing />
    </>
  );
}

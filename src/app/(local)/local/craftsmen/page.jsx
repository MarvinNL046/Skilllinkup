import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import Listing14 from "@/components/section/Listing14";

export const metadata = {
  title: "Find Local Craftsmen | SkillLinkup",
  description: "Browse skilled local craftsmen near you. Filter by trade, location, and rating to find the right professional for your job.",
};

export default function CraftsmenPage() {
  return (
    <>
      <Breadcumb1
        title="Find Local Craftsmen"
        brief="Browse skilled professionals in your area ready to help with your project."
        isBtnActive={false}
      />
      <Listing14 />
    </>
  );
}

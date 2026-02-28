import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import BecomeSeller from "@/components/section/BecomeSeller";

export const metadata = {
  title: "Become a Seller | SkillLinkup",
  description:
    "Start selling your freelance services on SkillLinkup. Offer digital services online, get local leads, or find employment opportunities.",
};

export default function page() {
  return (
    <>
      <Header20 />
      <BecomeSeller />
      <Footer14 />
    </>
  );
}

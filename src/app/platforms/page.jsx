import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import PlatformListing from "@/components/section/PlatformListing";

export const metadata = {
  title: "SkillLinkup | Freelance Platform Reviews & Comparisons",
  description:
    "Compare the best freelance platforms. Read reviews, compare fees, and find the right platform for your freelance career.",
};

export default function PlatformsPage() {
  return (
    <>
      <Header20 />
      <PlatformListing />
      <Footer14 />
    </>
  );
}

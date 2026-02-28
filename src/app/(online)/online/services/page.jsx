import { Suspense } from "react";
import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import Listing6 from "@/components/section/Listing6";

export const metadata = {
  title: "Browse Services | SkillLinkup",
  description: "Explore freelance services on SkillLinkup. Find the right service for your project across design, development, writing, marketing, and more.",
};

export default function page() {
  return (
    <>
      <Breadcumb1
        title="Browse Services"
        brief="Explore freelance services for your next project — design, development, marketing and more."
        isBtnActive={false}
      />
      <Suspense>
        <Listing6 />
      </Suspense>
    </>
  );
}

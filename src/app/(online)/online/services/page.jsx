import { Suspense } from "react";
import Listing6 from "@/components/section/Listing6";

export const metadata = {
  title: "Browse Services | SkillLinkup",
  description: "Explore freelance services on SkillLinkup. Find the right service for your project across design, development, writing, marketing, and more.",
};

export default function page() {
  return (
    <Suspense>
      <Listing6 />
    </Suspense>
  );
}

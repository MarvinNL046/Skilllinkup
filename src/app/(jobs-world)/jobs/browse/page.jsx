import { Suspense } from "react";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Breadcumb12 from "@/components/breadcumb/Breadcumb12";
import Listing16 from "@/components/section/Listing16";

export const metadata = {
  title: "Browse Jobs — SkillLinkup",
  description: "Browse freelance job listings on SkillLinkup. Find remote and local opportunities that match your skills and experience.",
};

export default function BrowseJobsPage() {
  return (
    <>
      <Breadcumb3 path={["Home", "Jobs", "Browse"]} />
      <Suspense>
        <Breadcumb12 />
        <Listing16 />
      </Suspense>
    </>
  );
}

import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import PopulerService from "@/components/section/PopulerService";
import ServiceDetail3 from "@/components/section/ServiceDetails3";
import TabSection1 from "@/components/section/TabSection1";
import React from "react";

export const metadata = {
  title: "Service Details | SkillLinkup",
  description: "View service details, pricing, and seller information on SkillLinkup. Order freelance services with confidence.",
};

export default async function page({ params }) {
  const { id } = await params;

  return (
    <>
      <TabSection1 />
      <div className=" bgc-thm3">
        <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
        <ServiceDetail3 />
        <PopulerService />
      </div>
    </>
  );
}

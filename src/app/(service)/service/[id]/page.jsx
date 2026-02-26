import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import PopulerService from "@/components/section/PopulerService";
import ServiceDetail3 from "@/components/section/ServiceDetails3";
import TabSection1 from "@/components/section/TabSection1";
import React from "react";

export const metadata = {
    title: "Service Details | SkillLinkup",
    description: "View service details, pricing, and seller information on SkillLinkup. Order freelance services with confidence.",
};

export default function page() {
    return (
        <>
            <Header20 />
            <TabSection1 />
            <div className=" bgc-thm3">
                <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
                <ServiceDetail3 />
                <PopulerService />
            </div>
            <Footer14 />
        </>
    );
}

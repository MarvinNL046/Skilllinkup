"use client";
import { useTranslations } from "next-intl";
import toggleStore from "@/store/toggleStore";
import DeliveryTimeOption1 from "../option/DeliveryTimeOption1";
import BudgetOption1 from "../option/BudgetOption1";
import DesignToolOption1 from "../option/DesignToolOption1";
import LocationOption1 from "../option/LocationOption1";
import SpeakOption1 from "../option/SpeakOption1";
import LevelOption1 from "../option/LevelOption1";
import ClearButton from "../button/ClearButton";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function ListingSidebarModal1() {
  const t = useTranslations("filterModals");
  const listingToggle = toggleStore((state) => state.listingToggleHandler);

  const filters = [
    { value: "delivery", label: t("deliveryTime"), Component: DeliveryTimeOption1 },
    { value: "budget", label: t("budget"), Component: BudgetOption1 },
    { value: "designTool", label: t("designTool"), Component: DesignToolOption1 },
    { value: "location", label: t("location"), Component: LocationOption1 },
    { value: "speaks", label: t("speaks"), Component: SpeakOption1 },
    { value: "level", label: t("level"), Component: LevelOption1 },
  ];

  return (
    <>
      <div className="lefttside-hidden-bar">
        <div className="hsidebar-header bdrb1">
          <h4 className="list-title">{t("allFilters")}</h4>
          <button
            type="button"
            onClick={listingToggle}
            className="sidebar-close-icon"
            aria-label="Close filters"
          >
            <span className="far fa-times" />
          </button>
        </div>
        <div className="hsidebar-content">
          <div className="widget-wrapper">
            <Accordion type="multiple" defaultValue={["delivery"]} className="w-full">
              {filters.map(({ value, label, Component }) => (
                <AccordionItem key={value} value={value}>
                  <AccordionTrigger className="text-base font-medium">{label}</AccordionTrigger>
                  <AccordionContent>
                    <Component />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <ClearButton />
          </div>
        </div>
      </div>
      <div onClick={listingToggle} className="hiddenbar-body-ovelay" />
    </>
  );
}

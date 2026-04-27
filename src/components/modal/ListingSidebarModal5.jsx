"use client";
import { useTranslations } from "next-intl";
import toggleStore from "@/store/toggleStore";
import CategoryOption1 from "../option/CategoryOption1";
import ClearButton from "../button/ClearButton";
import BudgetOption1 from "../option/BudgetOption1";
import LocationOption1 from "../option/LocationOption1";
import SpeakOption1 from "../option/SpeakOption1";
import LevelOption1 from "../option/LevelOption1";
import AvailableNowOption from "../option/AvailableNowOption";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function ListingSidebarModal5() {
  const t = useTranslations("filterModals");
  const listingToggle = toggleStore((state) => state.listingToggleHandler);

  const filters = [
    { value: "skills", label: t("skills"), content: <CategoryOption1 /> },
    { value: "price", label: t("price"), content: <BudgetOption1 /> },
    { value: "location", label: t("location"), content: <LocationOption1 /> },
    { value: "language", label: t("language"), content: <SpeakOption1 /> },
    { value: "level", label: t("level"), content: <LevelOption1 /> },
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
            <AvailableNowOption />
            <Accordion
              type="multiple"
              defaultValue={filters.map((f) => f.value)}
              className="w-full"
            >
              {filters.map(({ value, label, content }) => (
                <AccordionItem key={value} value={value}>
                  <AccordionTrigger className="text-base font-medium">{label}</AccordionTrigger>
                  <AccordionContent>{content}</AccordionContent>
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

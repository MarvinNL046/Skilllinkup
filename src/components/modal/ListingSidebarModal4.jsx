"use client";

import { useTranslations } from "next-intl";
import toggleStore from "@/store/toggleStore";
import CategoryOption1 from "../option/CategoryOption1";
import ClearButton from "../button/ClearButton";
import NoOfEmployeeOption1 from "../option/NoOfEmployeeOption1";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function ListingSidebarModal4() {
  const t = useTranslations("filterModals");
  const listingToggle = toggleStore((state) => state.listingToggleHandler);

  const filters = [
    { value: "category", label: t("category"), content: <CategoryOption1 /> },
    { value: "noOfEmployees", label: t("noOfEmployees"), content: <NoOfEmployeeOption1 /> },
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

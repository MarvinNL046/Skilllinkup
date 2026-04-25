"use client";

import { useTranslations } from "next-intl";
import BudgetOption2 from "../option/BudgetOption2";
import CategoryOption1 from "../option/CategoryOption1";
import LevelOption1 from "../option/LevelOption1";
import LocationOption1 from "../option/LocationOption1";
import SpeakOption1 from "../option/SpeakOption1";
import AvailableNowOption from "../option/AvailableNowOption";
import FilterGroup from "./FilterGroup";
import ListingSidebarShell from "./ListingSidebarShell";

/**
 * /online/freelancers filter sidebar — DS rebuild. Replaces the legacy
 * Bootstrap accordion with controlled FilterGroup components. The
 * AvailableNowOption sits above the groups (it's a single toggle, not
 * a collapsible section).
 */
export default function ListingSidebar5() {
  const t = useTranslations("filters");

  return (
    <ListingSidebarShell>
      <div style={{ paddingBottom: "var(--space-3)" }}>
        <AvailableNowOption />
      </div>
      <FilterGroup label={t("skills")} defaultOpen>
        <CategoryOption1 />
      </FilterGroup>
      <FilterGroup label={t("price")}>
        <BudgetOption2 />
      </FilterGroup>
      <FilterGroup label={t("location")}>
        <LocationOption1 />
      </FilterGroup>
      <FilterGroup label={t("language")}>
        <SpeakOption1 />
      </FilterGroup>
      <FilterGroup label={t("level")}>
        <LevelOption1 />
      </FilterGroup>
    </ListingSidebarShell>
  );
}

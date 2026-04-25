"use client";
import { useTranslations } from "next-intl";
import BudgetOption2 from "../option/BudgetOption2";
import CategoryOption1 from "../option/CategoryOption1";
import JobTypeOption1 from "../option/JobTypeOption1";
import LevelOption1 from "../option/LevelOption1";
import FilterGroup from "./FilterGroup";
import ListingSidebarShell from "./ListingSidebarShell";

/**
 * /jobs filter sidebar — DS rebuild. Same FilterGroup pattern as the
 * other listing sidebars; no Bootstrap accordion + .collapse markup.
 */
export default function ListingSidebar3() {
  const t = useTranslations("jobsHub");

  return (
    <ListingSidebarShell>
      <FilterGroup label={t("category")} defaultOpen>
        <CategoryOption1 />
      </FilterGroup>
      <FilterGroup label={t("salary")} defaultOpen>
        <BudgetOption2 />
      </FilterGroup>
      <FilterGroup label={t("jobType")} defaultOpen>
        <JobTypeOption1 />
      </FilterGroup>
      <FilterGroup label={t("level")} defaultOpen>
        <LevelOption1 />
      </FilterGroup>
    </ListingSidebarShell>
  );
}

import BudgetOption2 from "../option/BudgetOption2";
import CategoryOption1 from "../option/CategoryOption1";
import DesignToolOption1 from "../option/DesignToolOption1";
import EnglishLevelOption1 from "../option/EnglishLevelOption1";
import LocationOption1 from "../option/LocationOption1";
import ProjectTypeOption1 from "../option/ProjectTypeOption1";
import SpeakOption1 from "../option/SpeakOption1";
import FilterGroup from "./FilterGroup";
import ListingSidebarShell from "./ListingSidebarShell";

/**
 * /online/projects filter sidebar — DS rebuild. The Bootstrap accordion
 * was the source of the .collapse / Tailwind-utility clash that hid
 * Category and friends. Now uses controlled FilterGroup state, so the
 * sidebar always renders content regardless of CSS framework cascade.
 */
export default function ListingSidebar6() {
  return (
    <ListingSidebarShell>
      <FilterGroup label="Category" defaultOpen>
        <CategoryOption1 />
      </FilterGroup>
      <FilterGroup label="Project type">
        <ProjectTypeOption1 />
      </FilterGroup>
      <FilterGroup label="Price">
        <BudgetOption2 />
      </FilterGroup>
      <FilterGroup label="Tools / skills">
        <DesignToolOption1 />
      </FilterGroup>
      <FilterGroup label="Location">
        <LocationOption1 />
      </FilterGroup>
      <FilterGroup label="Languages">
        <SpeakOption1 />
      </FilterGroup>
      <FilterGroup label="English level">
        <EnglishLevelOption1 />
      </FilterGroup>
    </ListingSidebarShell>
  );
}

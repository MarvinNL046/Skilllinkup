import BudgetOption2 from "../option/BudgetOption2";
import DeliveryTimeOption1 from "../option/DeliveryTimeOption1";
import DesignToolOption1 from "../option/DesignToolOption1";
import LevelOption1 from "../option/LevelOption1";
import LocationOption1 from "../option/LocationOption1";
import SpeakOption1 from "../option/SpeakOption1";
import FilterGroup from "./FilterGroup";
import ListingSidebarShell from "./ListingSidebarShell";

/**
 * /online/services filter sidebar — DS rebuild. Replaces the legacy
 * Bootstrap .accordion + .collapse markup with controlled FilterGroup
 * components. No Bootstrap JS, no .collapse class, no clash with
 * Tailwind's .collapse utility.
 */
export default function ListingSidebar1() {
  return (
    <ListingSidebarShell>
      <FilterGroup label="Delivery time" defaultOpen>
        <DeliveryTimeOption1 />
      </FilterGroup>
      <FilterGroup label="Budget">
        <BudgetOption2 />
      </FilterGroup>
      <FilterGroup label="Design tool">
        <DesignToolOption1 />
      </FilterGroup>
      <FilterGroup label="Level">
        <LevelOption1 />
      </FilterGroup>
      <FilterGroup label="Location">
        <LocationOption1 />
      </FilterGroup>
      <FilterGroup label="Speaks">
        <SpeakOption1 />
      </FilterGroup>
    </ListingSidebarShell>
  );
}

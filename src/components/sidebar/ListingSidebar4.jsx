import ClearButton from "../button/ClearButton";
import CategoryOption1 from "../option/CategoryOption1";
import NoOfEmployeeOption1 from "../option/NoOfEmployeeOption1";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function ListingSidebar4() {
  return (
    <div className="list-sidebar-style1 hidden lg:block">
      <Accordion type="multiple" defaultValue={["category", "employees"]} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="text-base font-medium">Category</AccordionTrigger>
          <AccordionContent>
            <CategoryOption1 />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="employees">
          <AccordionTrigger className="text-base font-medium">No of Employees</AccordionTrigger>
          <AccordionContent>
            <NoOfEmployeeOption1 />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ClearButton />
    </div>
  );
}

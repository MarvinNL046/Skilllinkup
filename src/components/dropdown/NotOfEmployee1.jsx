"use client";
import { noOfEmployee } from "@/data/listing";
import listingStore from "@/store/listingStore";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function NotOfEmployee1() {
  const [getNoOfEmployee, setNoOfEmployee] = useState([]);

  const setNoOfEmployeeState = listingStore((state) => state.setNoOfEmployee);
  const getNoOfEmployeeState = listingStore((state) => state.getNoOfEmployee);

  const noOfEmployeeHandler = (data) => {
    if (!getNoOfEmployee.includes(data)) {
      return setNoOfEmployee([...getNoOfEmployee, data]);
    }
    const deleted = getNoOfEmployee.filter((item) => item !== data);
    setNoOfEmployee(deleted);
  };

  const noOfEmployeeSumitHandler = () => {
    setNoOfEmployeeState([]);
    getNoOfEmployee.forEach((item) => {
      setNoOfEmployeeState(item);
    });
  };

  useEffect(() => {
    setNoOfEmployee(getNoOfEmployeeState);
  }, [getNoOfEmployeeState]);

  return (
    <>
      <div className="px-5 pb-6 space-y-2">
        {noOfEmployee.map((item, i) => (
          <label
            key={i}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <Checkbox
              checked={getNoOfEmployee.includes(item.totalEmployee)}
              onCheckedChange={() => noOfEmployeeHandler(item.totalEmployee)}
            />
            <span className="flex-1">{item.totalEmployee}</span>
            <span className="text-xs text-[var(--text-tertiary)]">
              ({item.total})
            </span>
          </label>
        ))}
      </div>
      <Button onClick={noOfEmployeeSumitHandler}>
        Apply
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </>
  );
}

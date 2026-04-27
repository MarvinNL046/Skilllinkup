"use client";
import { jobType } from "@/data/listing";
import listingStore from "@/store/listingStore";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Switch from "@/components/ui/Switch";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function JobTypeDropdown1() {
  const t = useTranslations("jobsHub");
  const [getJobType, setJobType] = useState([]);

  const setJobTypeState = listingStore((state) => state.setJobType);
  const getJobTypeState = listingStore((state) => state.getJobType);

  const setJobTypeHandler = (data) => {
    if (!getJobType.includes(data)) {
      return setJobType([...getJobType, data]);
    }
    const deleted = getJobType.filter((item) => item !== data);
    setJobType(deleted);
  };

  const jobTypeSumitHandler = () => {
    setJobTypeState([]);
    getJobType.forEach((item) => {
      setJobTypeState(item);
    });
  };

  useEffect(() => {
    setJobType(getJobTypeState);
  }, [getJobTypeState]);

  return (
    <>
      <div className="px-5 pb-6 space-y-3">
        {jobType.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-3">
            <label
              htmlFor={`job-type-${item.id}`}
              className="text-sm cursor-pointer"
            >
              {item.title}
            </label>
            <Switch
              id={`job-type-${item.id}`}
              checked={getJobType.includes(item.title)}
              onChange={() => setJobTypeHandler(item.title)}
              aria-label={item.title}
            />
          </div>
        ))}
      </div>
      <Button onClick={jobTypeSumitHandler}>
        {t("apply")}
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </>
  );
}

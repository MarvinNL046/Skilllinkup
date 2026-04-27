"use client";
import { jobType } from "@/data/listing";
import listingStore from "@/store/listingStore";
import { useTranslations } from "next-intl";

export default function JobTypeOption1() {
  const t = useTranslations("jobsHub");
  const getJobType = listingStore((state) => state.getJobType);
  const setJobType = listingStore((state) => state.setJobType);

  // handler
  const jobTypeHandlere = (data) => {
    setJobType(data);
  };

  return (
    <>
      <div className="widget-wrapper pr-5">
        {jobType.map((item,i) => (
          <div key={ i } className="switch-style1">
            <div className="form-check form-switch mb-5">
              <input
                className="form-check-input"
                type="checkbox"
                id={`flexSwitchCheckDefault5${item.id}`}
                checked={getJobType.includes(item.title)}
                onChange={() => jobTypeHandlere(item.title)}
              />
              <label
                className="form-check-label"
                htmlFor={`flexSwitchCheckDefault5${item.id}`}
              >
                {item.title}
              </label>
            </div>
          </div>
        ))}
      </div>
      <a className="text-thm">{t("moreOptions")}</a>
    </>
  );
}

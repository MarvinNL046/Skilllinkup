"use client";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";

export default function JobCard1({ data }) {
  const t = useTranslations("jobsHub");
  return (
    <tr>
      <td data-label={t("title", { default: "Job" })} className="align-top">
        <div className="flex flex-col xl:flex-row xl:items-start gap-3">
          <div className="flex-shrink-0">
            <Image height={60} width={60} src={data.img} alt="icon" />
          </div>
          <div>
            <h5 className="text-base font-semibold">{data.title}</h5>
            <h6 className="text-sm text-primary">{data.server}</h6>
          </div>
        </div>
      </td>
      <td data-label="Details" className="align-middle">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-[var(--text-secondary)]">
          <span>$125k-$135k {t("hourly")}</span>
          <span>1-5 {t("days")}</span>
          <span>{t("expensive")}</span>
          <span>{t("remote")}</span>
        </div>
      </td>
      <td className="align-middle">
        <button
          type="button"
          id={`delete${data.id}`}
          aria-label={t("deleteItem")}
          className="text-[var(--text-tertiary)] hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <Tooltip
          anchorSelect={`#delete${data.id}`}
          events={["click"]}
          place="left-start"
        >
          {t("deleteItem")}
        </Tooltip>
      </td>
    </tr>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { useTranslations } from "next-intl";
import { Pencil, Trash2 } from "lucide-react";

export default function ManageServiceCard1({ data, removeGig }) {
  const t = useTranslations("manageServices");
  const handleDelete = async () => {
    if (data._id && removeGig) {
      try {
        await removeGig({ gigId: data._id });
      } catch (error) {
        console.error("Failed to delete gig:", error);
      }
    }
  };

  const id = data._id || data.id;

  return (
    <tr>
      <td data-label={t("columnTitle")} className="align-top">
        <div className="flex flex-col xl:flex-row xl:items-start gap-3">
          <div className="flex-shrink-0 rounded-md overflow-hidden">
            <Image
              height={91}
              width={122}
              src={data.img}
              alt="thumb"
              className="object-cover"
            />
          </div>
          <div className="flex-grow">
            <h6 className="text-base font-semibold mb-1">
              <Link href="/services" className="hover:text-primary">
                {data.title}
              </Link>
            </h6>
            {data.list && data.list.length > 0 && (
              <ul className="list-disc pl-4 text-sm text-[var(--text-secondary)] space-y-0.5">
                {data.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </td>
      <td data-label={t("columnCategory")} className="align-top">
        <span className="text-base">{data.category}</span>
      </td>
      <td data-label={t("columnTypeCost")} className="align-top">
        <span className="text-sm">
          ${(data.cost || 0).toFixed(2)}/{t("fixed")}
        </span>
      </td>
      <td data-label={t("columnActions")} className="align-top">
        <div className="flex gap-2">
          <button
            type="button"
            id={`edit-${id}`}
            aria-label={t("edit")}
            className="text-[var(--text-tertiary)] hover:text-foreground"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <Tooltip anchorSelect={`#edit-${id}`} place="top">
            {t("edit")}
          </Tooltip>
          <button
            type="button"
            id={`delete-${id}`}
            onClick={handleDelete}
            aria-label={t("delete")}
            className="text-[var(--text-tertiary)] hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <Tooltip anchorSelect={`#delete-${id}`} place="top">
            {t("delete")}
          </Tooltip>
        </div>
      </td>
    </tr>
  );
}

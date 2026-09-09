"use client";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { useTranslations } from "next-intl";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ManageServiceCard1({ data, removeGig, onEdit }) {
  const [deleting, setDeleting] = useState(false);
  const t = useTranslations("manageServices");
  const handleDelete = async () => {
    if (!window.confirm(`Remove “${data.title}” from your services?`)) return;
    if (data._id && removeGig) {
      setDeleting(true);
      try {
        await removeGig({ gigId: data._id });
        toast.success("Service removed");
      } catch (error) {
        toast.error(error?.message || "Could not remove service");
      } finally { setDeleting(false); }
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
              <Link href={`/online/service/${data.slug || id}`} className="hover:text-primary">
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
          {new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(data.cost || 0)}/{t("fixed")}
        </span>
      </td>
      <td data-label={t("columnActions")} className="align-top">
        <div className="flex gap-2">
          <button
            type="button"
            id={`edit-${id}`}
            onClick={onEdit}
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
            disabled={deleting}
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

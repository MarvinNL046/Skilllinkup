"use client";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { useTranslations } from "next-intl";
import { Pencil, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";

export default function ManageServiceCard1({ data, removeGig, onEdit }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const deleteRef = useRef(null);
  const t = useTranslations("manageServices");
  const confirmDelete = async () => {
    if (!data._id || !removeGig) return;
    await removeGig({ gigId: data._id });
    toast.success("Service removed");
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
            ref={deleteRef}
            onClick={() => setConfirmOpen(true)}
            aria-label={t("delete")}
            className="text-[var(--text-tertiary)] hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <Tooltip anchorSelect={`#delete-${id}`} place="top">
            {t("delete")}
          </Tooltip>
          <ConfirmDialog
            open={confirmOpen}
            title="Remove this service?"
            description={`${data.title} will be removed from your services and from search. You cannot undo this.`}
            confirmLabel="Remove service"
            busyLabel="Removing…"
            onConfirm={confirmDelete}
            onClose={() => setConfirmOpen(false)}
            returnFocusTo={deleteRef}
          />
        </div>
      </td>
    </tr>
  );
}

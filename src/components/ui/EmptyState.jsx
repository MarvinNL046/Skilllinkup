"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function EmptyState({ icon, title, description, actionLabel, actionHref }) {
  const t = useTranslations("emptyState");

  return (
    <div className="text-center py-5">
      {icon && <div className="mb-3" style={{ fontSize: "3rem", opacity: 0.4 }}>{icon}</div>}
      <h4 className="mb-2">{title || t("nothingHereYet")}</h4>
      {description && <p className="text-muted mb-3">{description}</p>}
      {actionLabel && actionHref && (
        <Link href={actionHref} className="ud-btn btn-thm">
          {actionLabel}<i className="fal fa-arrow-right-long ms-2"></i>
        </Link>
      )}
    </div>
  );
}

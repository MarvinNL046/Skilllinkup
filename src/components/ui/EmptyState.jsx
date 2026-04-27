"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * Empty-state placeholder for lists/queries that returned no results.
 *
 * @param {object} props
 * @param {React.ComponentType} [props.Icon] - lucide-react icon component
 * @param {React.ReactNode}    [props.icon]  - or pass a rendered icon element
 *                                              (kept for backwards compat)
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {string} [props.actionLabel]
 * @param {string} [props.actionHref]
 */
export default function EmptyState({
  Icon,
  icon,
  title,
  description,
  actionLabel,
  actionHref,
}) {
  const t = useTranslations("emptyState");

  // Render Icon component if provided, else render icon node if it's an element.
  // Plain string `icon` (legacy emoji) is intentionally NOT rendered — caller
  // should migrate to the Icon prop.
  const iconNode = Icon ? (
    <Icon className="h-10 w-10 text-[var(--text-tertiary)]" aria-hidden="true" />
  ) : icon && typeof icon !== "string" ? (
    icon
  ) : null;

  return (
    <div className="text-center py-12">
      {iconNode && <div className="mb-4 inline-flex">{iconNode}</div>}
      <h4 className="text-lg font-semibold mb-2">
        {title || t("nothingHereYet")}
      </h4>
      {description && (
        <p className="text-[var(--text-secondary)] mb-5 max-w-md mx-auto">
          {description}
        </p>
      )}
      {actionLabel && actionHref && (
        <Button asChild>
          <Link href={actionHref}>
            {actionLabel}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}

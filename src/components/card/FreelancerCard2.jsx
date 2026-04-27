"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const LEVEL_KEYS = {
  top_rated: { key: "topRated", className: "bg-info text-info-foreground" },
  pro: { key: "pro", className: "bg-primary text-primary-foreground" },
  rising: { key: "rising", className: "bg-success text-success-foreground" },
  new: { key: "levelNew", className: "bg-[var(--surface-3)] text-[var(--text-secondary)]" },
};

export function LevelBadge({ level }) {
  const lt = useTranslations("freelancerCard");
  const config = LEVEL_KEYS[level] || LEVEL_KEYS.new;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full text-xs font-medium px-2 py-0.5",
        config.className
      )}
    >
      {lt(config.key)}
    </span>
  );
}

export default function FreelancerCard2({ data }) {
  const t = useTranslations("freelancerCard");
  const tags = data.tags || [];
  const visibleTags = tags.slice(0, 3);
  const overflow = tags.length - 3;

  return (
    <Card className="overflow-hidden">
      {data.portfolioImg && (
        <div className="relative w-full h-32">
          <Image
            src={data.portfolioImg}
            alt={`${data.name} portfolio`}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardContent className="p-5 text-center">
        <div
          className={cn(
            "relative w-[90px] h-[90px] mx-auto mb-4",
            data.portfolioImg && "mt-4"
          )}
        >
          <Image
            height={90}
            width={90}
            className="rounded-full"
            src={data.img}
            alt={data.name}
          />
          <span
            className="absolute right-1 bottom-1 h-3 w-3 rounded-full bg-success border-2 border-[var(--bg-elevated)]"
            aria-label="Online"
          />
        </div>
        <h5 className="text-base font-semibold mb-1">{data.name}</h5>
        <p className="text-sm text-[var(--text-secondary)] mb-0">{data.profession}</p>
        {data.isAvailable && (
          <Badge variant="success" className="mt-2">
            {t("availableNow")}
          </Badge>
        )}
        {data.title && (
          <p className="text-xs text-[var(--text-secondary)] mt-2 line-clamp-2">
            {data.title}
          </p>
        )}
        <div className="flex items-center justify-center gap-1.5 mt-3 text-sm">
          <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
          <span className="font-medium">{data.rating || t("new")}</span>
          {data.reviews > 0 && (
            <span className="text-[var(--text-secondary)]">
              ({data.reviews} {t("reviews")})
            </span>
          )}
        </div>
        {visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center mt-3">
            {visibleTags.map((tag, i) => (
              <Badge key={i} variant="muted">
                {tag}
              </Badge>
            ))}
            {overflow > 0 && <Badge variant="muted">+{overflow}</Badge>}
          </div>
        )}
        {(data.totalOrders > 0 || data.completionRate) && (
          <p className="text-xs text-[var(--text-secondary)] mt-2">
            {data.totalOrders > 0 && (
              <>
                {data.totalOrders} {t("jobs")}
              </>
            )}
            {data.totalOrders > 0 && data.completionRate && " · "}
            {data.completionRate && (
              <>
                {data.completionRate}% {t("success")}
              </>
            )}
          </p>
        )}
        <Separator className="my-4" />
        <div className="flex items-center justify-between gap-2 mb-4 text-sm">
          <div className="text-left flex-1">
            <div className="font-medium text-foreground">{t("location")}</div>
            <div className="text-[var(--text-secondary)]">
              {data.location || t("remote")}
            </div>
          </div>
          <div className="text-left flex-1">
            <div className="font-medium text-foreground">{t("rate")}</div>
            <div className="text-[var(--text-secondary)]">
              {data.price ? `€${data.price}/hr` : t("onRequest")}
            </div>
          </div>
          <div className="text-left flex-1">
            <div className="font-medium text-foreground mb-1">{t("level")}</div>
            <LevelBadge level={data.level} />
          </div>
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/online/freelancer/${data.slug || data._id || data.id}`}>
            {t("viewProfile")}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

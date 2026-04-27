"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LevelBadge } from "./FreelancerCard2";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Star } from "lucide-react";

export default function FreelancerCardList({ data }) {
  const t = useTranslations("freelancerCard");
  const tags = data.tags || [];
  const visibleTags = tags.slice(0, 3);
  const overflow = tags.length - 3;
  const profileHref = `/online/freelancer/${data.slug || data._id || data.id}`;

  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr_auto] items-center">
        {/* Left: Portfolio / Avatar (md+ only) */}
        <div className="hidden md:block relative h-[120px] w-[160px] overflow-hidden">
          {data.portfolioImg ? (
            <Image
              src={data.portfolioImg}
              alt={`${data.name} portfolio`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[var(--surface-2)]">
              <Image
                height={70}
                width={70}
                className="rounded-full"
                src={data.img}
                alt={data.name}
              />
            </div>
          )}
        </div>

        {/* Middle: Details */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Image
              height={40}
              width={40}
              className="rounded-full"
              src={data.img}
              alt={data.name}
            />
            <div className="min-w-0 flex-grow">
              <h6 className="text-base font-medium mb-0">{data.name}</h6>
              <span className="text-xs text-[var(--text-secondary)]">
                {data.profession}
              </span>
            </div>
            {data.location && (
              <span className="hidden lg:inline-flex items-center gap-1 text-xs text-[var(--text-secondary)] ms-auto">
                <MapPin className="h-3 w-3" />
                {data.location}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs flex-wrap mt-1">
            {data.price > 0 && <span className="font-medium">€{data.price}/hr</span>}
            {data.completionRate && (
              <span className="text-[var(--text-secondary)]">
                {data.completionRate}% {t("jobSuccess")}
              </span>
            )}
            {data.totalOrders > 0 && (
              <span className="text-[var(--text-secondary)]">
                {data.totalOrders} {t("jobsCompleted")}
              </span>
            )}
            {data.rating > 0 && (
              <span className="inline-flex items-center gap-1 text-[var(--text-secondary)]">
                <Star
                  className="h-2.5 w-2.5 fill-warning text-warning"
                  aria-hidden="true"
                />
                {data.rating}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {data.isAvailable && (
              <Badge variant="success">{t("availableNow")}</Badge>
            )}
            <LevelBadge level={data.level} />
          </div>

          {visibleTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {visibleTags.map((tag, i) => (
                <Badge key={i} variant="muted">
                  {tag}
                </Badge>
              ))}
              {overflow > 0 && <Badge variant="muted">+{overflow}</Badge>}
            </div>
          )}

          {data.title && (
            <p className="text-xs text-[var(--text-secondary)] mb-0 mt-2 line-clamp-2 leading-relaxed">
              {data.title}
            </p>
          )}
        </div>

        {/* Right: View Profile button (md+) */}
        <div className="hidden md:flex items-center px-5">
          <Button asChild variant="outline" className="whitespace-nowrap">
            <Link href={profileHref}>
              {t("viewProfile")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile-only: full-width button */}
      <div className="md:hidden px-4 pb-4">
        <Button asChild variant="outline" className="w-full">
          <Link href={profileHref}>
            {t("viewProfile")}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}

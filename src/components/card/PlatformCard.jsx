"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, StarHalf, Globe, DollarSign, Signal, ArrowRight } from "lucide-react";

function StarRating({ rating }) {
  const clamped = Math.min(5, Math.max(0, rating ?? 0));
  const fullStars = Math.floor(clamped);
  const halfStar = clamped - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className="h-3 w-3 fill-warning text-warning"
          aria-hidden="true"
        />
      ))}
      {halfStar && (
        <StarHalf className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="h-3 w-3 text-[var(--text-tertiary)]"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function stripHtml(html) {
  if (!html) return "";
  let text = html.replace(/<[^>]*>/g, "");
  text = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
  return text.trim();
}

export default function PlatformCard({ data }) {
  const {
    name = "Unnamed Platform",
    slug,
    description,
    logoUrl,
    rating,
    fees,
    category,
    difficulty,
    featured,
  } = data;

  const plainDescription = stripHtml(description);
  const truncatedDescription =
    plainDescription && plainDescription.length > 100
      ? plainDescription.slice(0, 100) + "..."
      : plainDescription;

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-4">
          {logoUrl ? (
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-[var(--surface-2)]">
              <Image
                src={logoUrl}
                alt={`${name} logo`}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-[var(--surface-2)] text-[var(--text-tertiary)]">
              <Globe className="h-5 w-5" />
            </div>
          )}
          <div className="flex-grow min-w-0">
            <h5 className="text-base font-semibold flex items-center gap-2 leading-tight">
              <span className="truncate">{name}</span>
              {featured && <Badge>Featured</Badge>}
            </h5>
            {category && (
              <p className="text-xs text-[var(--text-secondary)] mb-0">{category}</p>
            )}
          </div>
        </div>

        {rating !== null && rating !== undefined && (
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={rating} />
            <span className="text-sm text-[var(--text-secondary)]">
              {rating.toFixed(1)}
            </span>
          </div>
        )}

        {truncatedDescription && (
          <p className="text-sm text-[var(--text-secondary)] mb-2 min-h-[40px]">
            {truncatedDescription}
          </p>
        )}

        <Separator className="my-3" />

        <div className="flex justify-between items-center gap-3 flex-wrap">
          <div className="flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
            {fees && (
              <span className="inline-flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5" />
                {fees}
              </span>
            )}
            {difficulty && (
              <span className="inline-flex items-center gap-1">
                <Signal className="h-3.5 w-3.5" />
                {difficulty}
              </span>
            )}
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href={slug ? `/platforms/${slug}` : "#"}>
              View Details
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

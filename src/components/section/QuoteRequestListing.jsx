"use client";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardList, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QuoteRequestListing() {
  const t = useTranslations("localHub");
  const requests = useQuery(api.marketplace.quotes.listRequests, { limit: 20 });

  if (requests === undefined) {
    return (
      <section className="pt-8 pb-24">
        <div className="container text-center py-12">
          <div
            role="status"
            aria-label="Loading"
            className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary mx-auto"
          />
        </div>
      </section>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <section className="pt-8 pb-24">
        <div className="container text-center py-12">
          <ClipboardList className="h-10 w-10 text-[var(--text-tertiary)] mx-auto mb-5" />
          <h4 className="text-lg font-semibold mb-2">{t("noQuoteRequests")}</h4>
          <p className="text-[var(--text-secondary)]">{t("checkBackSoon")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-8 pb-24">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {requests.map((req) => {
            const claimedSlots = req.claimedSlots ?? 0;
            const maxSlots = req.isExclusive ? 1 : req.maxSlots ?? 3;
            const slotsRemaining = Math.max(0, maxSlots - claimedSlots);
            const isFull = slotsRemaining === 0;

            return (
              <Card key={req._id} className={cn(isFull && "opacity-50")}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h5 className="text-base font-semibold mb-1">
                      {req.title ||
                        req.description?.slice(0, 50) ||
                        t("quoteRequest")}
                    </h5>
                    {req.isExclusive && (
                      <Badge variant="warning">{t("exclusive")}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-2">
                    {req.categoryName || t("general")}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    {req.description?.length > 120
                      ? req.description.slice(0, 120) + "..."
                      : req.description}
                  </p>
                  <div className="flex justify-between items-center mb-3 text-xs text-[var(--text-secondary)]">
                    <span>{req.budgetIndication || t("flexible")}</span>
                    <span>
                      {slotsRemaining}/{maxSlots} {t("slots")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2 flex-wrap">
                    {req.locationCity && (
                      <span className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                        <MapPin className="h-3 w-3" />
                        {req.locationCity}
                      </span>
                    )}
                    <Button
                      asChild
                      size="sm"
                      variant={isFull ? "outline" : "secondary"}
                    >
                      <Link href={`/local/quote-request/${req._id}`}>
                        {isFull ? t("full") : t("view")}
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

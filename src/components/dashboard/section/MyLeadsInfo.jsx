"use client";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, User, Mail, Phone } from "lucide-react";

export default function MyLeadsInfo() {
  const t = useTranslations("myLeads");
  const claims = useQuery(api.marketplace.leads.getMyClaims);

  if (claims === undefined) {
    return (
      <div className="flex justify-center py-12">
        <div
          role="status"
          aria-label="Loading"
          className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary"
        />
      </div>
    );
  }

  if (claims.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="h-10 w-10 text-[var(--text-tertiary)] mx-auto mb-4" />
        <h4 className="text-lg font-semibold mb-2">{t("noClaimsTitle")}</h4>
        <p className="text-[var(--text-secondary)] mb-5 max-w-md mx-auto">
          {t("noClaimsDescription")}
        </p>
        <Button asChild>
          <Link href="/local/quote-requests">
            {t("browseQuoteRequests")}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {claims.map((claim) => (
        <Card key={claim._id} className="p-5">
          <CardContent className="p-0">
            <div className="flex justify-between items-start mb-3 gap-3">
              <div className="min-w-0">
                <h5 className="text-base font-semibold mb-1 truncate">
                  {claim.request?.title || t("quoteRequest")}
                </h5>
                <span className="text-xs text-[var(--text-secondary)]">
                  {claim.categoryName || t("general")}
                </span>
              </div>
              <Badge variant={claim.claimType === "exclusive" ? "warning" : "default"}>
                {claim.claimType === "exclusive" ? t("exclusive") : t("shared")}
              </Badge>
            </div>

            {claim.request?.description && (
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {claim.request.description.length > 200
                  ? claim.request.description.slice(0, 200) + "..."
                  : claim.request.description}
              </p>
            )}

            {/* Client details — only visible because they claimed this lead */}
            {claim.client && (
              <div className="rounded-md bg-[var(--surface-2)] p-4 mb-4 space-y-1.5">
                <p className="text-xs font-medium text-[var(--text-secondary)] mb-1">
                  {t("clientContact")}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <User className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
                  {claim.client.name || "—"}
                </p>
                {claim.client.email && (
                  <p className="flex items-center gap-2 text-sm">
                    <Mail className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
                    <a href={`mailto:${claim.client.email}`} className="text-primary hover:underline">
                      {claim.client.email}
                    </a>
                  </p>
                )}
                {claim.client.phone && (
                  <p className="flex items-center gap-2 text-sm">
                    <Phone className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
                    <a href={`tel:${claim.client.phone}`} className="text-primary hover:underline">
                      {claim.client.phone}
                    </a>
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-between text-xs text-[var(--text-secondary)] gap-2 flex-wrap">
              <span>
                {claim.request?.locationCity && `${claim.request.locationCity}`}
                {claim.request?.budgetIndication && ` · ${claim.request.budgetIndication}`}
              </span>
              <span>
                {claim.creditsSpent} {t("credits")} · {new Date(claim.claimedAt).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

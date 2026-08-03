"use client";
import { useQuery, useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Lock,
  User,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import ReportButton from "@/components/trust/ReportButton";
import ContextMessageButton from "@/components/ui/ContextMessageButton";

export default function QuoteRequestDetail({ requestId }) {
  const router = useRouter();
  const t = useTranslations("localHub");
  const request = useQuery(api.marketplace.quotes.getRequestById, { requestId });
  const leadStatus = useQuery(api.marketplace.leads.getLeadStatus, {
    quoteRequestId: requestId,
  });
  const credits = useQuery(api.marketplace.leads.getMyCredits);
  const claimLead = useMutation(api.marketplace.leads.claimLead);
  const submitQuote = useMutation(api.marketplace.quotes.submitQuote);
  const acceptQuote = useMutation(api.marketplace.quotes.acceptQuote);
  const [claiming, setClaiming] = useState(false);
  const [quoteBusy, setQuoteBusy] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const [quoteSentId, setQuoteSentId] = useState(null);
  const [quoteForm, setQuoteForm] = useState({ amount: "", estimatedDays: "1", description: "" });

  if (request === undefined || leadStatus === undefined) {
    return (
      <section className="pt-8 pb-24">
        <div className="container flex justify-center py-12">
          <div
            role="status"
            aria-label="Loading"
            className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary"
          />
        </div>
      </section>
    );
  }

  if (!request) {
    return (
      <section className="pt-8 pb-24">
        <div className="container text-center py-12">
          <h4 className="text-xl font-semibold mb-5">{t("notFound")}</h4>
          <Button asChild>
            <Link href="/local/quote-requests">{t("backToQuoteRequests")}</Link>
          </Button>
        </div>
      </section>
    );
  }

  const isLoggedIn = credits !== null;
  const isFreelancer = credits?.profileId !== null;
  const canViewFullDetails = !!request.canViewFullDetails;
  const myQuoteId = request.myQuote?._id ?? quoteSentId;
  const myQuoteStatus = request.myQuote?.status ?? (quoteSentId ? "pending" : null);

  async function handleClaim(claimType) {
    setClaiming(true);
    try {
      const result = await claimLead({ quoteRequestId: requestId, claimType });
      toast.success(
        result.creditsSpent === 0
          ? "Lead claimed free during the private beta."
          : `Lead claimed! ${result.creditsSpent} credits deducted. New balance: ${result.newBalance}`
      );
    } catch (err) {
      toast.error(err.message || t("failedToClaim"));
    } finally {
      setClaiming(false);
    }
  }

  async function handleSubmitQuote(event) {
    event.preventDefault();
    setQuoteBusy(true);
    try {
      const quoteId = await submitQuote({
        quoteRequestId: requestId,
        amount: Number(quoteForm.amount),
        currency: "EUR",
        estimatedDays: Number(quoteForm.estimatedDays),
        description: quoteForm.description.trim(),
      });
      setQuoteSent(true);
      setQuoteSentId(quoteId);
      toast.success("Your quote was sent to the client.");
    } catch (error) { toast.error(error?.message || "The quote could not be sent."); }
    finally { setQuoteBusy(false); }
  }

  async function handleAcceptQuote(quoteId) {
    setQuoteBusy(true);
    try {
      const result = await acceptQuote({ quoteId });
      toast.success("Quote accepted. Your private workspace is ready.");
      router.push(`/orders/${result.orderId}`);
    } catch (error) { toast.error(error?.message || "The quote could not be accepted."); }
    finally { setQuoteBusy(false); }
  }

  return (
    <section className="pt-8 pb-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">{request.title}</h3>

                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5 text-sm text-[var(--text-secondary)]">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    {request.locationCity || t("noLocation")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="h-4 w-4 text-primary" />
                    {request.categoryName || t("general")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-primary" />
                    {request.budgetIndication || t("flexible")}
                  </span>
                </div>

                <h5 className="text-lg font-semibold mb-3">{t("description")}</h5>
                {canViewFullDetails ? (
                  <p className="text-base">
                    {request.description || request.descriptionPreview}
                  </p>
                ) : (
                  <div>
                    <p className="text-base">{request.descriptionPreview}</p>
                    {request.descriptionPreview !== request.description && (
                      <p className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] mt-2">
                        <Lock className="h-4 w-4" />
                        {t("claimToSee")}
                      </p>
                    )}
                  </div>
                )}

                {request.preferredDate && (
                  <p className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] mt-5">
                    <Calendar className="h-4 w-4" />
                    {t("preferredDate")}{" "}
                    {new Date(request.preferredDate).toLocaleDateString()}
                  </p>
                )}

                {canViewFullDetails && !request.isOwner && (
                  <div className="rounded-lg bg-[var(--surface-2)] p-5 mt-5">
                    <h5 className="text-base font-semibold mb-2">
                      {t("clientContact")}
                    </h5>
                    <p className="inline-flex items-center gap-1 text-sm mb-2">
                      <User className="h-4 w-4 text-primary" />
                      {request.clientName || "—"}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {t.rich("claimedLeadInfo", {
                        link: () => (
                          <Link
                            href="/dashboard/my-leads"
                            className="text-primary hover:underline"
                          >
                            {t("myLeads")}
                          </Link>
                        ),
                      })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {leadStatus?.alreadyClaimed && !request.isOwner && request.status === "open" ? (
              <Card className="mt-5">
                <CardContent className="p-8">
                  <h4 className="mb-2 text-xl font-semibold">Send your quote</h4>
                  <p className="mb-5 text-sm text-[var(--text-secondary)]">Be clear about price, timing and what is included. The private beta does not collect payment.</p>
                  {quoteSent || request.myQuote ? (
                    <div className="grid gap-3">
                      <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-4 text-emerald-800"><CheckCircle2 className="h-5 w-5" />Quote sent. The client can now review it.</div>
                      {myQuoteId && ["pending", "accepted"].includes(myQuoteStatus) ? (
                        <ContextMessageButton context={{ type: "local_quote", quoteId: myQuoteId }} label="Message client" />
                      ) : null}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitQuote} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <label className="grid gap-2 text-sm font-medium">Fixed quote (EUR)<input className="h-11 rounded-md border border-[var(--border-default)] px-3 font-normal" type="number" min="1" max="1000000" value={quoteForm.amount} onChange={(event) => setQuoteForm((current) => ({ ...current, amount: event.target.value }))} required /></label>
                      <label className="grid gap-2 text-sm font-medium">Estimated days<input className="h-11 rounded-md border border-[var(--border-default)] px-3 font-normal" type="number" min="1" max="365" value={quoteForm.estimatedDays} onChange={(event) => setQuoteForm((current) => ({ ...current, estimatedDays: event.target.value }))} required /></label>
                      <label className="grid gap-2 text-sm font-medium sm:col-span-2">What is included?<textarea className="min-h-32 rounded-md border border-[var(--border-default)] p-3 font-normal" minLength={20} maxLength={5000} value={quoteForm.description} onChange={(event) => setQuoteForm((current) => ({ ...current, description: event.target.value }))} required /></label>
                      <Button className="sm:col-span-2" type="submit" disabled={quoteBusy}>{quoteBusy ? "Sending…" : "Send quote"}</Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            ) : null}

            {request.isOwner && request.quotes?.length ? (
              <Card className="mt-5">
                <CardContent className="p-8">
                  <h4 className="mb-2 text-xl font-semibold">Quotes received</h4>
                  <p className="mb-5 text-sm text-[var(--text-secondary)]">Compare the proposal and professional before starting the private workspace.</p>
                  <div className="grid gap-3">
                    {request.quotes.map((quote) => (
                      <article key={quote._id} className="rounded-lg border border-[var(--border-subtle)] p-4">
                        <div className="flex flex-wrap items-start justify-between gap-3"><div><strong className="block">{quote.freelancerProfile?.displayName || "Local professional"}</strong><span className="text-sm text-[var(--text-secondary)]">{quote.estimatedDays ? `${quote.estimatedDays} day${quote.estimatedDays === 1 ? "" : "s"}` : "Timing to agree"}</span></div><strong className="text-lg">{new Intl.NumberFormat("en", { style: "currency", currency: quote.currency || "EUR" }).format(quote.amount)}</strong></div>
                        <p className="my-4 text-sm leading-6 text-[var(--text-secondary)]">{quote.description}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          {["pending", "accepted"].includes(quote.status) ? <ContextMessageButton context={{ type: "local_quote", quoteId: quote._id }} label="Message professional" /> : null}
                          {quote.status === "pending" && request.status === "open" ? <Button onClick={() => handleAcceptQuote(quote._id)} disabled={quoteBusy}>Accept quote</Button> : <span className="text-sm font-semibold capitalize text-emerald-700">{quote.status}</span>}
                        </div>
                      </article>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <CardContent className="p-8">
                <h5 className="text-lg font-semibold mb-4">{t("leadStatus")}</h5>

                <div className="space-y-3 mb-5 text-sm">
                  <div className="flex justify-between">
                    <span>{t("slotsTaken")}</span>
                    <span className="font-medium">
                      {leadStatus?.claimedSlots ?? 0} / {leadStatus?.maxSlots ?? 3}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("slotsRemaining")}</span>
                    <span className="font-medium">
                      {leadStatus?.slotsRemaining ?? 3}
                    </span>
                  </div>
                </div>

                <Separator className="mb-5" />

                {leadStatus?.creditCost === 0 ? <div className="mb-4 rounded-lg bg-emerald-50 p-3 text-center text-xs font-semibold text-emerald-800">Free during the private beta</div> : null}

                {leadStatus?.alreadyClaimed ? (
                  <div className="text-center">
                    <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
                    <p className="font-medium">{t("youClaimedLead")}</p>
                    <p className="mt-2 text-xs text-[var(--text-secondary)]">Scroll down to send a clear quote.</p>
                  </div>
                ) : request.isOwner ? (
                  <p className="text-center text-[var(--text-secondary)]">
                    {t("yourRequest")}
                  </p>
                ) : request.status !== "open" ? (
                  <p className="text-center text-[var(--text-secondary)]">
                    {t("requestClosed")}
                  </p>
                ) : !isLoggedIn ? (
                  <Button asChild className="w-full">
                    <Link href="/login">{t("logInToClaim")}</Link>
                  </Button>
                ) : !isFreelancer ? (
                  <p className="text-center text-xs text-[var(--text-secondary)]">
                    {t("needFreelancerProfile")}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {leadStatus?.slotsRemaining > 0 && !leadStatus?.isExclusive && (
                      <Button
                        className="w-full"
                        onClick={() => handleClaim("shared")}
                        disabled={claiming}
                      >
                        {claiming
                          ? t("claiming")
                          : t("claimLead", { cost: leadStatus.creditCost })}
                      </Button>
                    )}

                    {leadStatus?.canClaimExclusive && (
                      <Button
                        variant="secondary"
                        className="w-full"
                        onClick={() => handleClaim("exclusive")}
                        disabled={claiming}
                      >
                        {claiming
                          ? t("claiming")
                          : t("claimExclusive", { cost: leadStatus.exclusiveCost })}
                      </Button>
                    )}

                  </div>
                )}
              </CardContent>
            </Card>
            {!request.isOwner ? (
              <div className="mt-3">
                <ReportButton
                  targetType="quote_request"
                  targetId={request._id}
                  targetLabel={request.title}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

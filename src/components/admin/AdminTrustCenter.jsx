"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminTrustCenter() {
  const { convexUser } = useConvexUser();
  const isAdmin = convexUser?.role === "admin";
  const [view, setView] = useState("reports");
  const [notes, setNotes] = useState({});
  const reports = useQuery(
    api.marketplace.trust.listReportsForAdmin,
    isAdmin ? { limit: 100 } : "skip",
  );
  const tickets = useQuery(
    api.marketplace.trust.listSupportTicketsForAdmin,
    isAdmin ? { limit: 100 } : "skip",
  );
  const auditEvents = useQuery(
    api.marketplace.trust.listAuditEventsForAdmin,
    isAdmin ? { limit: 25 } : "skip",
  );
  const operations = useQuery(
    api.marketplace.operations.getSnapshot,
    isAdmin ? { windowDays: 30 } : "skip",
  );
  const emailDeliveries = useQuery(
    api.marketplace.emailDeliveries.listRecent,
    isAdmin ? { limit: 12 } : "skip",
  );
  const updateReport = useMutation(api.marketplace.trust.updateReport);
  const updateTicket = useMutation(api.marketplace.trust.updateSupportTicket);

  if (convexUser === undefined) {
    return (
      <div className="container py-16 text-center">Loading Trust & Safety…</div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-3 text-3xl font-semibold">Admin access required</h1>
        <p className="mb-6 text-[var(--text-secondary)]">
          This recovery queue contains private safety and support information.
        </p>
        <Button asChild>
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
      </div>
    );
  }

  async function resolveReport(reportId, status) {
    try {
      await updateReport({
        reportId,
        status,
        resolutionNote: notes[reportId] || undefined,
      });
      toast.success(`Report marked ${status}.`);
    } catch (error) {
      toast.error(error?.message || "The report could not be updated.");
    }
  }

  async function resolveTicket(ticketId, status) {
    try {
      await updateTicket({
        ticketId,
        status,
        adminNote: notes[ticketId] || undefined,
      });
      toast.success(`Ticket marked ${status.replace(/_/g, " ")}.`);
    } catch (error) {
      toast.error(error?.message || "The ticket could not be updated.");
    }
  }

  const items = view === "reports" ? reports : tickets;

  return (
    <main className="container py-10 lg:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[.16em] text-emerald-700">
            Operations
          </p>
          <h1 className="mb-2 text-4xl font-semibold text-[var(--navy-900)]">
            Trust & Safety centre
          </h1>
          <p className="text-base text-[var(--text-secondary)]">
            Review reports, support users and leave an auditable resolution
            note.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/disputes">Open order disputes</Link>
        </Button>
      </div>

      <section className="mb-8" aria-labelledby="beta-health-heading">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="beta-health-heading" className="text-2xl font-semibold">
              Private-beta health
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Last 30 days · percentages stay directional until each product has
              enough real demand.
            </p>
          </div>
          {operations?.sampleCapped ? (
            <Badge variant="warning">Sample cap reached</Badge>
          ) : null}
        </div>
        {operations === undefined ? (
          <Card>
            <CardContent className="p-6 text-sm text-[var(--text-secondary)]">
              Loading marketplace health…
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Online", operations.online],
              ["Local", operations.local],
              ["Jobs", operations.jobs],
            ].map(([label, metric]) => (
              <Card key={label}>
                <CardContent className="p-5">
                  <p className="mb-3 text-sm font-bold uppercase tracking-[.12em] text-emerald-700">
                    {label}
                  </p>
                  <strong className="block text-3xl text-[var(--navy-900)]">
                    {metric.commitmentRate == null
                      ? "—"
                      : `${Math.round(metric.commitmentRate * 100)}%`}
                  </strong>
                  <span className="text-sm text-[var(--text-secondary)]">
                    committed · {metric.commitments}/{metric.demand} demand
                  </span>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <span>Response</span>
                    <strong>
                      {metric.responseCoverageRate == null
                        ? "—"
                        : `${Math.round(metric.responseCoverageRate * 100)}%`}
                    </strong>
                    <span>Median first</span>
                    <strong>
                      {metric.medianFirstResponseHours == null
                        ? "—"
                        : `${metric.medianFirstResponseHours}h`}
                    </strong>
                    <span>Completed</span>
                    <strong>{metric.completed}</strong>
                    <span>Cancelled</span>
                    <strong>{metric.cancelled}</strong>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card>
              <CardContent className="p-5">
                <p className="mb-3 text-sm font-bold uppercase tracking-[.12em] text-emerald-700">
                  Trust queues
                </p>
                <strong className="block text-3xl text-[var(--navy-900)]">
                  {operations.trust.openReports +
                    operations.trust.openSupportTickets}
                </strong>
                <span className="text-sm text-[var(--text-secondary)]">
                  open reports and tickets
                </span>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <span>Safety reports</span>
                  <strong>{operations.trust.openReports}</strong>
                  <span>Support tickets</span>
                  <strong>{operations.trust.openSupportTickets}</strong>
                  <span>Urgent</span>
                  <strong>{operations.trust.urgentSupportTickets}</strong>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </section>

      <section className="mb-8" aria-labelledby="email-health-heading">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="email-health-heading" className="text-2xl font-semibold">
              Transactional email health
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Recent lifecycle deliveries for Online, Local and Jobs.
            </p>
          </div>
          {emailDeliveries ? (
            <Badge
              variant={
                emailDeliveries.some((delivery) => delivery.status === "failed")
                  ? "warning"
                  : "success"
              }
            >
              {emailDeliveries.filter((delivery) => delivery.status === "failed").length} failed
            </Badge>
          ) : null}
        </div>
        <Card>
          <CardContent className="p-0">
            {emailDeliveries === undefined ? (
              <p className="p-6 text-sm text-[var(--text-secondary)]">
                Loading delivery audit...
              </p>
            ) : emailDeliveries.length === 0 ? (
              <p className="p-6 text-sm text-[var(--text-secondary)]">
                No transactional emails have been recorded yet.
              </p>
            ) : (
              <div className="divide-y divide-[var(--border-subtle)]">
                {emailDeliveries.map((delivery) => (
                  <article
                    key={delivery._id}
                    className="grid gap-3 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
                  >
                    <div className="min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <Badge
                          variant={
                            delivery.status === "failed"
                              ? "warning"
                              : delivery.status === "sent"
                                ? "success"
                                : "muted"
                          }
                        >
                          {delivery.status}
                        </Badge>
                        <strong className="truncate">{delivery.subject}</strong>
                      </div>
                      <p className="truncate text-sm text-[var(--text-secondary)]">
                        {delivery.template} · {delivery.recipientEmail} · attempt {delivery.attempts}
                      </p>
                      {delivery.lastError ? (
                        <p className="mt-2 text-sm text-red-700">
                          {delivery.lastError}
                        </p>
                      ) : null}
                    </div>
                    <time className="text-xs text-[var(--text-tertiary)]">
                      {new Date(delivery.updatedAt).toLocaleString("en-GB")}
                    </time>
                  </article>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <div className="mb-6 inline-flex rounded-xl border border-[var(--border-subtle)] bg-white p-1">
        <Button
          variant={view === "reports" ? "default" : "ghost"}
          onClick={() => setView("reports")}
        >
          Safety reports
        </Button>
        <Button
          variant={view === "support" ? "default" : "ghost"}
          onClick={() => setView("support")}
        >
          Support tickets
        </Button>
      </div>

      {items === undefined ? (
        <Card>
          <CardContent className="p-8 text-center text-[var(--text-secondary)]">
            Loading queue…
          </CardContent>
        </Card>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <strong className="block text-lg">Queue clear</strong>
            <span className="text-sm text-[var(--text-secondary)]">
              There are no {view === "reports" ? "reports" : "tickets"} to
              review.
            </span>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <Card key={item._id}>
              <CardContent className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          item.priority === "urgent"
                            ? "warning"
                            : item.status === "resolved" ||
                                item.status === "dismissed" ||
                                item.status === "closed"
                              ? "success"
                              : "muted"
                        }
                      >
                        {item.status.replace(/_/g, " ")}
                      </Badge>
                      <span className="text-sm font-semibold text-emerald-700">
                        {"reason" in item
                          ? item.reason.replace(/_/g, " ")
                          : item.category.replace(/_/g, " ")}
                      </span>
                    </div>
                    <h2 className="mb-1 text-lg font-semibold">
                      {"subject" in item
                        ? item.subject
                        : item.targetLabel ||
                          `${item.targetType}: ${item.targetId}`}
                    </h2>
                    <p className="mb-3 text-sm text-[var(--text-secondary)]">
                      {item.userName || item.reporterName} ·{" "}
                      {item.userEmail || item.reporterEmail}
                    </p>
                    <p className="whitespace-pre-wrap text-sm leading-6 text-[var(--text-secondary)]">
                      {"description" in item ? item.description : item.details}
                    </p>
                    {"targetUrl" in item && item.targetUrl ? (
                      <Link
                        className="mt-3 inline-block text-sm font-semibold text-primary"
                        href={item.targetUrl}
                      >
                        Open reported page
                      </Link>
                    ) : null}
                  </div>
                  <time className="text-xs text-[var(--text-tertiary)]">
                    {new Date(item.createdAt).toLocaleString("en-GB")}
                  </time>
                </div>

                <div className="mt-5 grid gap-3 border-t border-[var(--border-subtle)] pt-5 lg:grid-cols-[1fr_auto]">
                  <textarea
                    className="min-h-24 rounded-lg border border-[var(--border-default)] p-3 text-sm leading-6"
                    placeholder="Internal response or resolution note"
                    value={notes[item._id] || ""}
                    onChange={(event) =>
                      setNotes((current) => ({
                        ...current,
                        [item._id]: event.target.value,
                      }))
                    }
                  />
                  <div className="flex flex-wrap content-start gap-2">
                    {view === "reports" ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => resolveReport(item._id, "reviewing")}
                        >
                          Reviewing
                        </Button>
                        <Button
                          onClick={() => resolveReport(item._id, "resolved")}
                        >
                          Resolve
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => resolveReport(item._id, "dismissed")}
                        >
                          Dismiss
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => resolveTicket(item._id, "in_progress")}
                        >
                          In progress
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() =>
                            resolveTicket(item._id, "waiting_for_user")
                          }
                        >
                          Wait for user
                        </Button>
                        <Button
                          onClick={() => resolveTicket(item._id, "resolved")}
                        >
                          Resolve
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">Recent admin actions</h2>
        <Card>
          <CardContent className="p-0">
            {auditEvents === undefined ? (
              <p className="p-6 text-sm text-[var(--text-secondary)]">
                Loading audit trail…
              </p>
            ) : auditEvents.length === 0 ? (
              <p className="p-6 text-sm text-[var(--text-secondary)]">
                No moderation actions recorded yet.
              </p>
            ) : (
              <div className="divide-y divide-[var(--border-subtle)]">
                {auditEvents.map((event) => (
                  <article
                    key={event._id}
                    className="grid gap-2 p-5 md:grid-cols-[1fr_auto]"
                  >
                    <div>
                      <strong className="block">
                        {event.action.replace(/_/g, " ")}
                      </strong>
                      <span className="text-sm text-[var(--text-secondary)]">
                        {event.actorName} · {event.targetType} {event.targetId}
                        {event.fromStatus || event.toStatus
                          ? ` · ${event.fromStatus || "new"} → ${event.toStatus || "updated"}`
                          : ""}
                      </span>
                      {event.note ? (
                        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                          {event.note}
                        </p>
                      ) : null}
                    </div>
                    <time className="text-xs text-[var(--text-tertiary)]">
                      {new Date(event.createdAt).toLocaleString("en-GB")}
                    </time>
                  </article>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

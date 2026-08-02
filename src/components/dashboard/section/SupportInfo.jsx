"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { LifeBuoy, MessageCircleQuestion, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import DashboardNavigation from "../header/DashboardNavigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORIES = [
  ["account", "Account & profile"],
  ["online_order", "Online order"],
  ["local_booking", "Local quote or appointment"],
  ["job_application", "Job or application"],
  ["safety", "Trust & safety"],
  ["technical", "Technical issue"],
  ["other", "Something else"],
];

const EMPTY_FORM = {
  category: "account",
  subject: "",
  description: "",
  priority: "normal",
};

export default function SupportInfo() {
  const tickets = useQuery(api.marketplace.trust.listMySupportTickets, { limit: 25 });
  const createTicket = useMutation(api.marketplace.trust.createSupportTicket);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await createTicket({
        category: form.category,
        subject: form.subject,
        description: form.description,
        priority: form.priority,
        relatedUrl: "/dashboard/support",
      });
      setForm(EMPTY_FORM);
      toast.success("Your support request has been received.");
    } catch (error) {
      toast.error(error?.message || "The support request could not be sent.");
    } finally {
      setSubmitting(false);
    }
  }

  const benefits = [
    [MessageCircleQuestion, "Clear context", "Choose the product and describe what happened."],
    [ShieldCheck, "Safety first", "Use Trust & Safety for fraud, harassment or unsafe behaviour."],
    [LifeBuoy, "Trackable help", "Every request gets a status and remains visible here."],
  ];

  return (
    <div className="dashboard__content hover-bgc-color">
      <DashboardNavigation />
      <div className="dashboard_title_area mb-6">
        <div>
          <h1>Help & Support</h1>
          <p className="text-[var(--text-secondary)]">
            One place for product questions, technical issues and safety concerns.
          </p>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {benefits.map(([Icon, title, body]) => (
          <Card key={title}>
            <CardContent className="flex gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="mb-1 text-base font-semibold">{title}</h2>
                <p className="text-sm leading-6 text-[var(--text-secondary)]">{body}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,.72fr)]">
        <Card>
          <CardContent className="p-7">
            <h2 className="mb-2 text-xl font-semibold">Start a support request</h2>
            <p className="mb-6 text-sm text-[var(--text-secondary)]">
              Never include passwords, card details or identity-document numbers.
            </p>
            <form className="grid gap-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  Topic
                  <select
                    className="h-12 rounded-lg border border-[var(--border-default)] bg-white px-3 font-normal"
                    value={form.category}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, category: event.target.value }))
                    }
                  >
                    {CATEGORIES.map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Priority
                  <select
                    className="h-12 rounded-lg border border-[var(--border-default)] bg-white px-3 font-normal"
                    value={form.priority}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, priority: event.target.value }))
                    }
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent safety or access issue</option>
                  </select>
                </label>
              </div>
              <label className="grid gap-2 text-sm font-semibold">
                Subject
                <input
                  className="h-12 rounded-lg border border-[var(--border-default)] px-3 font-normal"
                  minLength={5}
                  maxLength={160}
                  value={form.subject}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, subject: event.target.value }))
                  }
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                What can we help with?
                <textarea
                  className="min-h-40 rounded-lg border border-[var(--border-default)] p-3 font-normal leading-6"
                  minLength={20}
                  maxLength={5000}
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, description: event.target.value }))
                  }
                  required
                />
              </label>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Sending…" : "Send support request"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-7">
            <h2 className="mb-5 text-xl font-semibold">Your requests</h2>
            {tickets === undefined ? (
              <p className="text-sm text-[var(--text-secondary)]">Loading requests…</p>
            ) : tickets.length === 0 ? (
              <div className="rounded-xl bg-[var(--surface-2)] p-5 text-sm leading-6 text-[var(--text-secondary)]">
                No support requests yet. New updates will also appear in your notification centre.
              </div>
            ) : (
              <div className="grid gap-3">
                {tickets.map((ticket) => (
                  <article key={ticket._id} className="rounded-xl border border-[var(--border-subtle)] p-4">
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                      <strong>{ticket.subject}</strong>
                      <Badge
                        variant={
                          ticket.status === "resolved" || ticket.status === "closed"
                            ? "success"
                            : ticket.priority === "urgent"
                              ? "warning"
                              : "muted"
                        }
                      >
                        {ticket.status.replace(/_/g, " ")}
                      </Badge>
                    </div>
                    <p className="line-clamp-3 text-sm leading-6 text-[var(--text-secondary)]">
                      {ticket.description}
                    </p>
                    {ticket.adminNote ? (
                      <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm leading-6 text-emerald-900">
                        <strong className="block">Support update</strong>
                        {ticket.adminNote}
                      </div>
                    ) : null}
                    <time className="mt-3 block text-xs text-[var(--text-tertiary)]">
                      {new Date(ticket.createdAt).toLocaleDateString("en-GB")}
                    </time>
                  </article>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

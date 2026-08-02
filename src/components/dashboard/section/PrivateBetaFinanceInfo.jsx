"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileCheck2,
  HandCoins,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import DashboardNavigation from "../header/DashboardNavigation";
import { Card, CardContent } from "@/components/ui/card";

const COPY = {
  payouts: {
    title: "Payouts are not active during beta",
    description:
      "Skilllinkup does not collect client funds or pay professionals during the free private beta.",
  },
  invoices: {
    title: "Platform invoices are not active during beta",
    description:
      "Because Skilllinkup is not processing payments, it does not issue payment or VAT invoices for beta workspaces.",
  },
  statements: {
    title: "Financial statements are not active during beta",
    description:
      "Workspace amounts help both parties record agreed scope; they are not proof of payment, earnings or tax treatment.",
  },
};

export default function PrivateBetaFinanceInfo({ kind = "statements" }) {
  const copy = COPY[kind] || COPY.statements;

  return (
    <div className="dashboard__content hover-bgc-color">
      <DashboardNavigation />
      <header className="mb-6 max-w-3xl">
        <span className="mb-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">
          Free private beta
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
          {copy.title}
        </h1>
        <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
          {copy.description}
        </p>
      </header>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="border-b border-[var(--border-subtle)] bg-amber-50/70 p-6">
            <div className="flex max-w-3xl items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-amber-700 shadow-sm">
                <LockKeyhole className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  No payment, escrow or transfer is created
                </h2>
                <p className="mt-1 text-base leading-7 text-[var(--text-secondary)]">
                  Never send money because someone claims Skilllinkup currently
                  holds or releases funds. Payment terms will be published before
                  any live payment feature is enabled.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-6 md:grid-cols-3">
            <article className="rounded-xl border border-[var(--border-subtle)] p-5">
              <FileCheck2 className="h-6 w-6 text-emerald-700" />
              <h2 className="mt-4 text-base font-semibold">Scope records stay active</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Keep the agreed amount, milestones, files and approvals together in
                the private workspace.
              </p>
            </article>
            <article className="rounded-xl border border-[var(--border-subtle)] p-5">
              <ShieldCheck className="h-6 w-6 text-emerald-700" />
              <h2 className="mt-4 text-base font-semibold">Beta policy is explicit</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Prices are informational. Skilllinkup does not treat them as paid,
                cleared or available for withdrawal.
              </p>
            </article>
            <article className="rounded-xl border border-[var(--border-subtle)] p-5">
              <HandCoins className="h-6 w-6 text-emerald-700" />
              <h2 className="mt-4 text-base font-semibold">Commercial policy comes first</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Fees, refunds, tax, KYC and legal responsibility must be approved
                before payments can be activated.
              </p>
            </article>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-[var(--border-subtle)] p-6">
            <Link className="btn btn--primary" href="/orders">
              View workspaces <ArrowRight className="h-4 w-4" />
            </Link>
            <Link className="btn btn--secondary" href="/faq">
              Read the beta policy
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

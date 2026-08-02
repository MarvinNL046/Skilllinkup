"use client";

import { useQuery } from "convex/react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CreditsInfo() {
  const transactions = useQuery(api.marketplace.leads.getMyTransactions, { limit: 20 });

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-emerald-200 bg-emerald-50/60">
        <CardContent className="grid gap-6 p-8 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
            <Sparkles className="h-7 w-7" />
          </div>
          <div>
            <Badge variant="success" className="mb-3">Private beta</Badge>
            <h2 className="mb-2 text-2xl font-semibold text-[var(--navy-900)]">
              Local leads are free during the private beta
            </h2>
            <p className="max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
              You do not need credits to claim matching requests, send quotes or start a Local
              workspace. Paid lead packages remain disabled until pricing and platform policy
              have been approved.
            </p>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="mb-5 text-xl font-semibold">Activity history</h3>
        {transactions === undefined ? (
          <div className="flex justify-center py-8">
            <div
              role="status"
              aria-label="Loading activity"
              className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--border-subtle)] border-t-primary"
            />
          </div>
        ) : transactions.length === 0 ? (
          <Card>
            <CardContent className="flex items-start gap-3 p-6 text-[var(--text-secondary)]">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <p>Your free beta claims will appear here once you start responding to Local requests.</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="table-responsive">
                <table className="table-style3 table w-full">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Type</th>
                      <th scope="col">Description</th>
                      <th scope="col" className="text-right">Credits</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {transactions.map((transaction) => (
                      <tr key={transaction._id}>
                        <td>{new Date(transaction.createdAt).toLocaleDateString("en-GB")}</td>
                        <td><Badge variant="muted">{transaction.type}</Badge></td>
                        <td>{transaction.description}</td>
                        <td className="text-right font-semibold">{transaction.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

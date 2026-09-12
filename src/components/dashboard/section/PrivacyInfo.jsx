"use client";

import { useEffect, useRef, useState } from "react";
import { useConvex, useMutation } from "convex/react";
import { Download, FileJson2, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "../header/DashboardNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { collectAccountExport } from "@/lib/accountExport.mjs";

export default function PrivacyInfo() {
  const { convexUser } = useConvexUser();
  const [exportRequested, setExportRequested] = useState(false);
  const [exportProgress, setExportProgress] = useState("");
  const exportController = useRef(null);
  const convex = useConvex();
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const requestDeletion = useMutation(
    api.marketplace.accountPrivacy.requestAccountDeletion,
  );
  const cancelDeletion = useMutation(
    api.marketplace.accountPrivacy.cancelAccountDeletion,
  );

  useEffect(() => () => exportController.current?.abort(), []);

  async function exportData() {
    if (exportRequested) return;
    const controller = new AbortController();
    exportController.current = controller;
    setExportRequested(true);
    setExportProgress("Preparing your account export…");
    try {
      const exported = await collectAccountExport(
        (args) =>
          convex.query(api.marketplace.accountPrivacy.exportSection, args),
        (progress) =>
          setExportProgress(
            `${progress.records} records collected · ${progress.sections} of ${progress.totalSections} sections`,
          ),
        controller.signal,
      );
      const blob = new Blob([JSON.stringify(exported, null, 2)], {
        type: "application/json;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `skilllinkup-data-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success("Your Skilllinkup data export is ready.");
    } catch (error) {
      if (!controller.signal.aborted)
        toast.error(error?.message || "The export failed. Please try again.");
    } finally {
      if (!controller.signal.aborted) {
        setExportRequested(false);
        setExportProgress("");
      }
    }
  }

  async function submitDeletion(event) {
    event.preventDefault();
    setBusy(true);
    try {
      await requestDeletion({ reason });
      setReason("");
      toast.success(
        "Your deletion request was created. Support will review active obligations first.",
      );
    } catch (error) {
      toast.error(
        error?.message || "The deletion request could not be created.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function cancelRequest() {
    setBusy(true);
    try {
      await cancelDeletion({});
      toast.success("Your account deletion request was cancelled.");
    } catch (error) {
      toast.error(error?.message || "The request could not be cancelled.");
    } finally {
      setBusy(false);
    }
  }

  const deletionActive = Boolean(convexUser?.deletionRequestedAt);

  return (
    <div className="dashboard__content hover-bgc-color">
      <DashboardNavigation />
      <div className="dashboard_title_area mb-6">
        <div>
          <h1>Data & Privacy</h1>
          <p className="text-[var(--text-secondary)]">
            Download your information or manage an account deletion request.
          </p>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex gap-4 p-5">
            <ShieldCheck className="h-6 w-6 shrink-0 text-emerald-700" />
            <div>
              <strong className="block">Authenticated export</strong>
              <span className="text-sm leading-6 text-[var(--text-secondary)]">
                Only your signed-in account can request this file.
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex gap-4 p-5">
            <FileJson2 className="h-6 w-6 shrink-0 text-emerald-700" />
            <div>
              <strong className="block">Portable JSON</strong>
              <span className="text-sm leading-6 text-[var(--text-secondary)]">
                Profile, listings, orders, applications and messages in one
                file.
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex gap-4 p-5">
            <Trash2 className="h-6 w-6 shrink-0 text-emerald-700" />
            <div>
              <strong className="block">Reviewed deletion</strong>
              <span className="text-sm leading-6 text-[var(--text-secondary)]">
                Support checks open work and required retention before deletion.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-7">
            <h2 className="mb-2 text-xl font-semibold">Download your data</h2>
            <p className="mb-6 text-base leading-7 text-[var(--text-secondary)]">
              Download all stored account and workspace records, including both
              provider profiles and complete message history. File references
              are included; file contents, passwords and internal security data
              are not embedded.
            </p>
            {exportRequested ? (
              <p role="status" className="mb-4 text-sm">
                {exportProgress}
              </p>
            ) : null}
            <Button onClick={exportData} disabled={exportRequested}>
              <Download className="mr-2 h-4 w-4" />
              {exportRequested ? "Preparing export…" : "Download JSON export"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardContent className="p-7">
            <h2 className="mb-2 text-xl font-semibold">
              Request account deletion
            </h2>
            {deletionActive ? (
              <div>
                <div className="mb-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                  A deletion request is active. Your account remains available
                  while Support checks open orders, disputes and retention
                  obligations.
                </div>
                <Button
                  variant="outline"
                  onClick={cancelRequest}
                  disabled={busy}
                >
                  Cancel deletion request
                </Button>
              </div>
            ) : (
              <form onSubmit={submitDeletion}>
                <p className="mb-5 text-base leading-7 text-[var(--text-secondary)]">
                  Tell us why you want to leave. This creates a trackable
                  Support request; it does not instantly erase evidence required
                  for active work or safety investigations.
                </p>
                <label className="mb-4 grid gap-2 text-sm font-semibold">
                  Reason
                  <textarea
                    className="min-h-32 rounded-lg border border-[var(--border-default)] p-3 font-normal leading-6"
                    minLength={10}
                    maxLength={2000}
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    required
                  />
                </label>
                <Button type="submit" variant="destructive" disabled={busy}>
                  {busy ? "Submitting…" : "Request account deletion"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

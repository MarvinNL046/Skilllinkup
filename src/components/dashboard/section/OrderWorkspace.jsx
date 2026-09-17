"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import {
  ArrowLeft,
  CalendarCheck2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  LoaderCircle,
  MapPin,
  Paperclip,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import styles from "./OrderWorkspace.module.css";
import useIsMobile from "@/hook/useIsMobile";
import useConversationMessages from "@/hook/useConversationMessages";
import MessageBox from "@/components/dashboard/element/MessageBox";
import { getOrderActionContext, getWorkspaceNextStep } from "@/lib/orderWorkspace.mjs";
import { uploadWorkspaceFile } from "@/lib/uploadWorkspaceFile.mjs";
import ReviewForm from "@/components/element/ReviewForm";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const statusLabels = {
  pending: "Pending",
  active: "In progress",
  in_progress: "In progress",
  revision_requested: "Revision requested",
  delivered: "Delivered for review",
  completed: "Completed",
  cancelled: "Cancelled",
  disputed: "Under review",
};

function formatBytes(value) {
  if (!value) return "";
  if (value < 1024 * 1024) return `${Math.ceil(value / 1024)} KB`;
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

export default function OrderWorkspace({ orderId }) {
  const isMobile = useIsMobile();
  const { convexUser, isAuthenticated } = useConvexUser();
  const order = useQuery(
    api.marketplace.orders.getById,
    isAuthenticated && orderId ? { orderId } : "skip",
  );
  const deliverables = useQuery(
    api.marketplace.deliverables.list,
    isAuthenticated && order?._id ? { orderId: order._id } : "skip",
  );
  const conversation = useQuery(
    api.chat.conversations.getByOrder,
    isAuthenticated && order?._id ? { orderId: order._id } : "skip",
  );
  const appointment = useQuery(
    api.marketplace.localAppointments.getByOrder,
    isAuthenticated && order?._id ? { orderId: order._id } : "skip",
  );
  useEffect(() => {
    if (!order?._id) return;
    const section = window.location.hash.slice(1);
    if (!["workspace-files", "workspace-conversation", "workspace-work", "workspace-review"].includes(section)) return;
    const frame = requestAnimationFrame(() => document.getElementById(section)?.scrollIntoView({ block: "start" }));
    return () => cancelAnimationFrame(frame);
  }, [order?._id]);
  const history = useConversationMessages(conversation?._id, convexUser?._id);
  const generateUploadUrl = useMutation(
    api.marketplace.deliverables.generateUploadUrl,
  );
  const addDeliverable = useMutation(api.marketplace.deliverables.add);
  const removeDeliverable = useMutation(api.marketplace.deliverables.remove);
  const sendMessage = useMutation(api.chat.messages.send);
  const deliverOrder = useMutation(api.marketplace.orders.deliver);
  const approveOrder = useMutation(api.marketplace.orders.approve);
  const requestRevision = useMutation(api.marketplace.orders.requestRevision);
  const updateAppointmentStatus = useMutation(
    api.marketplace.localAppointments.updateStatus,
  );
  const rescheduleAppointment = useMutation(
    api.marketplace.localAppointments.reschedule,
  );
  const [file, setFile] = useState(null);
  const [deliveryNote, setDeliveryNote] = useState("");
  const [revision, setRevision] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const appointmentBusyRef = useRef(false);
  const [appointmentError, setAppointmentError] = useState("");
  const [busy, setBusy] = useState("");
  const workActionRef = useRef(false);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [approvalError, setApprovalError] = useState("");
  const hasPendingAddition = Boolean(file || deliveryNote.trim());

  const { isClient, isLocal, matchesContext, requiredContext } =
    getOrderActionContext(order, convexUser);
  const canAddWork =
    order && !["completed", "cancelled", "disputed"].includes(order.status);
  const canDeliver =
    !isClient &&
    !isLocal &&
    matchesContext &&
    ["active", "in_progress", "revision_requested"].includes(order?.status);
  const canReview =
    isClient && !isLocal && matchesContext && order?.status === "delivered";
  const canRequestRevision = canReview && order?.remainingRevisions !== 0;

  async function handleAddDeliverable(event) {
    event.preventDefault();
    if (busy || workActionRef.current || !hasPendingAddition) return;
    workActionRef.current = true;
    const formElement = event.currentTarget;
    setBusy("deliverable");
    try {
      let storageId;
      if (file) {
        storageId = await uploadWorkspaceFile(file, () => generateUploadUrl({ orderId }));
      }
      await addDeliverable({
        orderId,
        storageId,
        fileName: file?.name,
        fileSize: file?.size,
        fileType: file?.type,
        description: deliveryNote.trim() || undefined,
      });
      setFile(null);
      setDeliveryNote("");
      formElement.reset();
      toast.success("Added to the order.");
    } catch (error) {
      toast.error(error?.message || "The item could not be added.");
    } finally {
      setBusy("");
      workActionRef.current = false;
    }
  }

  async function handleSend(content, clientRequestId) {
    if (!conversation?._id)
      throw new Error("Conversation is not ready. Please try again.");
    await sendMessage({
      clientRequestId,
      conversationId: conversation._id,
      content,
      messageType: "text",
    });
  }

  async function handleDeliver() {
    if (busy || workActionRef.current || !canDeliver || hasPendingAddition) return;
    workActionRef.current = true;
    setBusy("deliver");
    try {
      await deliverOrder({ orderId });
      toast.success("Work submitted for review.");
    } catch (error) {
      toast.error(error?.message || "The work could not be submitted.");
    } finally {
      setBusy("");
      workActionRef.current = false;
    }
  }

  async function handleApprove() {
    if (busy || workActionRef.current || !approvalOpen || !canReview || hasPendingAddition) return;
    workActionRef.current = true;
    setApprovalError("");
    setBusy("approve");
    try {
      await approveOrder({ orderId });
      setApprovalOpen(false);
      toast.success("Work approved and project completed.");
    } catch (error) {
      const message = error?.message || "The delivery could not be approved. Please try again.";
      setApprovalError(message);
      toast.error(message);
    } finally {
      setBusy("");
      workActionRef.current = false;
    }
  }

  async function handleRevision(event) {
    event.preventDefault();
    if (busy || workActionRef.current || hasPendingAddition || !canRequestRevision || revision.trim().length < 10) return;
    workActionRef.current = true;
    setBusy("revision");
    try {
      await requestRevision({ orderId, message: revision.trim() });
      setRevision("");
      toast.success("Revision feedback sent.");
    } catch (error) {
      toast.error(error?.message || "The revision could not be requested.");
    } finally {
      setBusy("");
      workActionRef.current = false;
    }
  }

  async function handleAppointmentStatus(status) {
    if (!appointment?._id || busy || appointmentBusyRef.current) return;
    appointmentBusyRef.current = true;
    setAppointmentError("");
    setBusy(`appointment-${status}`);
    try {
      await updateAppointmentStatus({ appointmentId: appointment._id, status, expectedUpdatedAt: appointment.updatedAt });
      toast.success(
        status === "completed"
          ? "Local service completed."
          : `Appointment ${status.replaceAll("_", " ")}.`,
      );
    } catch (error) {
      setAppointmentError(error?.message || "The appointment could not be updated.");
    } finally {
      appointmentBusyRef.current = false;
      setBusy("");
    }
  }

  const [pendingAction, setPendingAction] = useState(null);
  const pendingTriggerRef = useRef(null);
  function askConfirmation(action, event) {
    if (busy || appointmentBusyRef.current) return;
    pendingTriggerRef.current = event.currentTarget;
    setPendingAction(action);
  }
  async function runPendingAction() {
    const action = pendingAction;
    if (!action) return;
    if (action.kind === "file") {
      await removeDeliverable({ deliverableId: action.id });
      toast.success("File removed.");
      return;
    }
    await updateAppointmentStatus({ appointmentId: appointment._id, status: action.status, expectedUpdatedAt: appointment.updatedAt });
    toast.success(action.status === "completed" ? "Local service completed." : "Appointment cancelled.");
  }
  const confirmCopy = {
    completed: {
      title: "Mark this service as complete?",
      description: "The client is notified and the appointment is closed. You cannot reopen it or change its status afterwards.",
      confirmLabel: "Mark complete",
      destructive: false,
    },
    cancelled: {
      title: "Cancel this appointment?",
      description: "The other party is notified and the appointment is closed. You cannot undo this; a new visit needs a new appointment.",
      confirmLabel: "Cancel appointment",
      destructive: true,
    },
    file: {
      title: "Remove this file?",
      description: `${pendingAction?.name || "This file"} will be removed from the workspace for both parties. You cannot undo this.`,
      confirmLabel: "Remove file",
      destructive: true,
    },
  }[pendingAction?.kind === "file" ? "file" : pendingAction?.status] ?? null;

  async function handleReschedule(event) {
    event.preventDefault();
    if (!appointment?._id || !appointmentDate || busy || appointmentBusyRef.current) return;
    appointmentBusyRef.current = true;
    setAppointmentError("");
    setBusy("appointment-reschedule");
    try {
      await rescheduleAppointment({
        appointmentId: appointment._id,
        scheduledStart: new Date(appointmentDate).getTime(),
        expectedUpdatedAt: appointment.updatedAt,
      });
      setAppointmentDate("");
      toast.success("New appointment time requested.");
    } catch (error) {
      setAppointmentError(
        error?.message || "The appointment could not be rescheduled.",
      );
    } finally {
      appointmentBusyRef.current = false;
      setBusy("");
    }
  }

  if (
    order === undefined ||
    (order !== null && (deliverables === undefined || conversation === undefined))
  )
    return (
      <div className={styles.loading}>
        <LoaderCircle /> Opening order…
      </div>
    );
  if (!order)
    return (
      <section className={styles.empty}>
        <div>
          <h1>Workspace unavailable</h1>
          <p>This workspace may no longer exist, or your current account does not have access. Open an order from your own order list.</p>
          <Button asChild><Link href="/orders">Back to my orders</Link></Button>
        </div>
      </section>
    );

  const nextStep = getWorkspaceNextStep(order, { isClient, isLocal, matchesContext, requiredContext });

  return (
    <div className={styles.page} data-testid="order-workspace">
      <DashboardNavigation />
      <header className={styles.header}>
        <div>
          <Link href="/orders">
            <ArrowLeft size={16} /> All orders
          </Link>
          <p>Order {order.orderNumber}</p>
          <h1>{order.title}</h1>
          <span>{isClient ? order.freelancerName : order.clientName}</span>
        </div>
        <div className={styles.orderMeta}>
          <span data-status={order.status}>
            {statusLabels[order.status] || order.status}
          </span>
          <strong>
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: order.currency || "EUR",
            }).format(order.amount)}
          </strong>
          {order.deliveryDeadline ? (
            <small>
              <CalendarDays /> Due{" "}
              {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
                order.deliveryDeadline,
              )}
            </small>
          ) : null}
        </div>
      </header>
      {order.escrowStatus === "beta_no_payment" ? (
        <div className={styles.betaNotice}>
          <ShieldCheck size={18} />
          <div>
            <strong>Free private beta</strong>
            <span>
              No payment or escrow is active for this order. The agreed amount
              is shown for scope only.
            </span>
          </div>
        </div>
      ) : null}

      {!matchesContext &&
      !["completed", "cancelled", "disputed"].includes(order.status) ? (
        <p
          className="my-4 rounded-lg border border-[var(--border-subtle)] p-4 text-sm"
          role="status"
        >
          To update this order, switch the account menu to {requiredContext}.
        </p>
      ) : null}

      <section className={styles.nextStep} aria-labelledby="workspace-next-step">
        <div>
          <p className={styles.eyebrow}>Next step</p>
          <h2 id="workspace-next-step">{nextStep.title}</h2>
          <p>{nextStep.detail}</p>
        </div>
        {nextStep.href && <Button asChild><Link href={nextStep.href}>{nextStep.label}</Link></Button>}
      </section>
      <nav className={styles.workspaceNav} aria-label="Order workspace sections">
        {isLocal && <Link href="#workspace-work">Appointment</Link>}
        <Link href="#workspace-files">Files &amp; notes ({deliverables.length})</Link>
        <Link href="#workspace-conversation">Conversation</Link>
        {order.status === "completed" && <Link href="#workspace-review">Order review</Link>}
      </nav>

      <div className={styles.grid}>
        <section className={styles.workCard} id="workspace-work" tabIndex={-1}>
          {appointment ? (
            <section
              className={styles.appointmentCard}
              data-testid="local-appointment"
            >
              <div className={styles.sectionTitle}>
                <i>
                  <CalendarCheck2 />
                </i>
                <div>
                  <h2>Local appointment</h2>
                  <p>Agree the visit, track the work and close it together.</p>
                </div>
                <span data-status={appointment.status}>
                  {appointment.status.replaceAll("_", " ")}
                </span>
              </div>
              <div className={styles.appointmentFacts}>
                <p>
                  <Clock3 />{" "}
                  <span>
                    {appointment.scheduledStart
                      ? new Intl.DateTimeFormat("en", {
                          dateStyle: "medium",
                          timeStyle: "short",
                          timeZone: appointment.timezone,
                        }).format(appointment.scheduledStart)
                      : "Time to be agreed"}
                  </span>
                </p>
                <p>
                  <MapPin />{" "}
                  <span>
                    {appointment.locationAddress || "Address shared privately"}
                  </span>
                </p>
              </div>
              {canAddWork &&
              matchesContext &&
              ["requested", "confirmed"].includes(
                appointment.status,
              ) ? (
                <form
                  className={styles.appointmentForm}
                  onSubmit={handleReschedule}
                >
                  <input
                    type="datetime-local"
                    value={appointmentDate}
                    disabled={Boolean(busy)}
                    onChange={(event) => setAppointmentDate(event.target.value)}
                    aria-label="Propose a new appointment time"
                  />
                  <Button
                    type="submit"
                    disabled={!appointmentDate || Boolean(busy)}
                  >
                    Propose new time
                  </Button>
                </form>
              ) : null}
              {appointmentError && <p role="alert">{appointmentError}</p>}
              {canAddWork && matchesContext ? (
                <div className={styles.appointmentActions}>
                  {!isClient && appointment.status === "requested" ? (
                    <Button
                      type="button"
                      disabled={Boolean(busy)}
                      onClick={() => handleAppointmentStatus("confirmed")}
                    >
                      Confirm appointment
                    </Button>
                  ) : null}
                  {!isClient && appointment.status === "confirmed" ? (
                    <Button
                      type="button"
                      disabled={Boolean(busy)}
                      onClick={() => handleAppointmentStatus("in_progress")}
                    >
                      Start work
                    </Button>
                  ) : null}
                  {!isClient &&
                  ["confirmed", "in_progress"].includes(appointment.status) ? (
                    <Button
                      type="button"
                      disabled={Boolean(busy)}
                      onClick={(event) => askConfirmation({ kind: "appointment", status: "completed" }, event)}
                    >
                      Mark service complete
                    </Button>
                  ) : null}
                  {!["completed", "cancelled", "no_show"].includes(
                    appointment.status,
                  ) ? (
                    <Button
                      type="button"
                      disabled={Boolean(busy)}
                      variant="destructive"
                      onClick={(event) => askConfirmation({ kind: "appointment", status: "cancelled" }, event)}
                    >
                      Cancel appointment
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </section>
          ) : null}
          <div className={styles.sectionTitle} id="workspace-files" tabIndex={-1}>
            <i>
              <Paperclip />
            </i>
            <div>
              <h2>Files &amp; delivery</h2>
              <p>
                Keep briefs, work files and delivery notes attached to this
                order.
              </p>
            </div>
          </div>
          {deliverables.length ? (
            <div className={styles.files}>
              {deliverables.map((item) => (
                <article key={item.id}>
                  <i>
                    <FileText />
                  </i>
                  <div>
                    <strong>{item.fileName || "Delivery note"}</strong>
                    <span>
                      {item.uploaderName} ·{" "}
                      {new Intl.DateTimeFormat("en", {
                        dateStyle: "medium",
                      }).format(item.createdAt)}{" "}
                      {item.fileSize ? `· ${formatBytes(item.fileSize)}` : ""}
                    </span>
                    {item.description ? <p>{item.description}</p> : null}
                  </div>
                  <div>
                    {item.downloadUrl ? (
                      <Button asChild variant="outline">
                      <a
                        href={`/api/deliverables/${item.id}/download`}
                        download={item.fileName || "attachment"}
                        aria-label={`Download ${item.fileName}`}
                      >
                        <Download /> Download
                      </a>
                      </Button>
                    ) : null}
                    {item.uploadedBy === convexUser?._id &&
                    ![
                      "delivered",
                      "completed",
                      "cancelled",
                      "disputed",
                    ].includes(order.status) ? (
                      <Button
                        variant="destructive"
                        type="button"
                        disabled={Boolean(busy)}
                        aria-label={`Remove ${item.fileName || "file"}`}
                        onClick={(event) => askConfirmation({ kind: "file", id: item.id, name: item.fileName }, event)}
                      >
                        Remove
                      </Button>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.noFiles}>
              <UploadCloud />
              <p>No files or delivery notes yet.</p>
            </div>
          )}
          {canAddWork ? (
            <form
              className={styles.deliveryForm}
              onSubmit={handleAddDeliverable}
            >
              <label>
                <span>
                  Add a file <em>optional · max 25 MB</em>
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.zip,.jpg,.jpeg,.png,.webp,.txt,.json"
                  onChange={(event) => setFile(event.target.files?.[0] || null)}
                />
                {file ? <small>{file.name}</small> : null}
              </label>
              <label>
                <span>
                  Note <em>optional</em>
                </span>
                <textarea
                  aria-label="Delivery note"
                  value={deliveryNote}
                  onChange={(event) => setDeliveryNote(event.target.value)}
                  placeholder="Explain what you added or share delivery instructions."
                  rows={3}
                  maxLength={3000}
                />
              </label>
              <Button
                variant="outline"
                type="submit"
                disabled={Boolean(busy) || (!file && !deliveryNote.trim())}
              >
                {busy === "deliverable" ? <LoaderCircle /> : <Paperclip />} Add
                to order
              </Button>
            </form>
          ) : null}
          {(canDeliver || canReview) && hasPendingAddition ? (
            <p role="status" className="text-sm">
              Your selected file or note has not been added yet. Choose Add to order before continuing with the delivery.
            </p>
          ) : null}
          {canDeliver ? (
            <Button
              className={styles.primaryAction}
              type="button"
              onClick={handleDeliver}
              disabled={Boolean(busy) || hasPendingAddition}
            >
              <CheckCircle2 />
              {busy === "deliver" ? "Submitting…" : "Submit work for review"}
            </Button>
          ) : null}
          {canReview ? (
            <div className={styles.reviewActions}>
              <Button
                type="button"
                onClick={() => { setApprovalError(""); setApprovalOpen(true); }}
                disabled={Boolean(busy) || hasPendingAddition}
              >
                <CheckCircle2 />{" "}
                {busy === "approve" ? "Approving…" : "Approve delivery"}
              </Button>
              <form onSubmit={handleRevision}>
                <p className="mb-2 text-sm">
                  {order.remainingRevisions === 0
                    ? "The included revisions have been used. Discuss additional changes in the project conversation."
                    : typeof order.remainingRevisions === "number"
                      ? `${order.remainingRevisions} ${order.remainingRevisions === 1 ? "revision" : "revisions"} remaining`
                      : "Explain the changes you need."}
                </p>
                <textarea
                  aria-label="Revision request"
                  value={revision}
                  onChange={(event) => setRevision(event.target.value)}
                  rows={3}
                  minLength={10}
                  maxLength={3000}
                  disabled={!canRequestRevision}
                  placeholder="Describe the revision clearly (minimum 10 characters)."
                />
                <Button
                  variant="outline"
                  type="submit"
                  disabled={
                    !canRequestRevision ||
                    revision.trim().length < 10 ||
                    hasPendingAddition ||
                    Boolean(busy)
                  }
                >
                  {busy === "revision" ? "Sending…" : "Request revision"}
                </Button>
              </form>
            </div>
          ) : null}
          {order.status === "completed" && (isClient ? order.freelancerUserId : order.clientId) && (
            <section id="workspace-review" tabIndex={-1} className="mt-6 border-t pt-4">
              <h2 className="text-lg font-semibold">Order review</h2>
              <ReviewForm key={`${orderId}:${convexUser?._id}`} orderId={orderId}
                revieweeId={isClient ? order.freelancerUserId : order.clientId}
                reviewerRole={isClient ? "client" : "freelancer"} />
            </section>
          )}
        </section>

        <aside className={styles.chatCard} id="workspace-conversation" tabIndex={-1}>
          <h2 className="mb-3 text-lg font-semibold">Project conversation</h2>
          {conversation ? (
            <MessageBox
              key={`${convexUser?._id}:${conversation._id}`}
              conversationId={conversation._id}
              messages={history.messages}
              messageStatus={history.messageStatus}
              onLoadOlder={history.loadOlder}
              readError={history.readError}
              onRetryRead={history.retryRead}
              currentUserId={convexUser?._id}
              otherParticipant={conversation.otherParticipant}
              context={conversation.context}
              isMobile={isMobile}
              hasConversation
              onSend={handleSend}
            />
          ) : (
            <p className={styles.noConversation}>
              Conversation setup is still syncing. Refresh in a moment.
            </p>
          )}
        </aside>
      </div>
      <ConfirmDialog
        open={pendingAction !== null}
        title={confirmCopy?.title ?? ""}
        description={confirmCopy?.description ?? ""}
        confirmLabel={confirmCopy?.confirmLabel}
        destructive={confirmCopy?.destructive ?? true}
        cancelLabel="Keep as is"
        onConfirm={runPendingAction}
        onClose={() => setPendingAction(null)}
        returnFocusTo={pendingTriggerRef}
      />
      <Dialog open={approvalOpen && canReview} onOpenChange={(open) => {
        if (!workActionRef.current) setApprovalOpen(open);
      }}>
        <DialogContent className="max-h-[calc(100dvh-32px)] overflow-y-auto" showCloseButton={!busy}>
          <DialogHeader>
            <DialogTitle>Approve and complete this order?</DialogTitle>
            <DialogDescription>
              Confirm that you have reviewed the delivered work and it meets the agreed scope.
              This marks the order as completed and closes the revision step. Your files and conversation stay available.
              No payment is taken during the private beta.
            </DialogDescription>
          </DialogHeader>
          <p className="break-words font-semibold">{order.title}</p>
          {revision.trim() ? <p className="text-sm">You have an unsent revision request. Choose Keep reviewing to send your feedback instead.</p> : null}
          {approvalError ? <p role="alert" className="text-sm">{approvalError}</p> : null}
          <DialogFooter className="gap-2">
            <Button variant="outline" disabled={Boolean(busy)} onClick={() => setApprovalOpen(false)}>Keep reviewing</Button>
            <Button disabled={Boolean(busy) || !canReview || hasPendingAddition} onClick={handleApprove}>
              {busy === "approve" ? "Completing…" : "Confirm completion"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

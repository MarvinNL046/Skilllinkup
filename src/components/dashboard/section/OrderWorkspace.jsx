"use client";

import { useRef, useState } from "react";
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
import styles from "./OrderWorkspace.module.css";
import useConversationMessages from "@/hook/useConversationMessages";
import MessageBox from "@/components/dashboard/element/MessageBox";
import { getOrderActionContext } from "@/lib/orderWorkspace.mjs";

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
  const { convexUser, isAuthenticated } = useConvexUser();
  const order = useQuery(
    api.marketplace.orders.getById,
    isAuthenticated && orderId ? { orderId } : "skip",
  );
  const deliverables = useQuery(
    api.marketplace.deliverables.list,
    isAuthenticated && orderId ? { orderId } : "skip",
  );
  const conversation = useQuery(
    api.chat.conversations.getByOrder,
    isAuthenticated && orderId ? { orderId } : "skip",
  );
  const appointment = useQuery(
    api.marketplace.localAppointments.getByOrder,
    isAuthenticated && orderId ? { orderId } : "skip",
  );
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
    if (busy || (!file && !deliveryNote.trim())) return;
    const formElement = event.currentTarget;
    setBusy("deliverable");
    try {
      let storageId;
      if (file) {
        if (file.size > 25 * 1024 * 1024)
          throw new Error("Files must be smaller than 25 MB.");
        const uploadUrl = await generateUploadUrl({ orderId });
        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type || "application/octet-stream" },
          body: file,
        });
        if (!response.ok) throw new Error("The file could not be uploaded.");
        ({ storageId } = await response.json());
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
    }
  }

  async function handleSend(content) {
    if (!conversation?._id)
      throw new Error("Conversation is not ready. Please try again.");
    await sendMessage({
      conversationId: conversation._id,
      content,
      messageType: "text",
    });
  }

  async function handleDeliver() {
    setBusy("deliver");
    try {
      await deliverOrder({ orderId });
      toast.success("Work submitted for review.");
    } catch (error) {
      toast.error(error?.message || "The work could not be submitted.");
    } finally {
      setBusy("");
    }
  }

  async function handleApprove() {
    setBusy("approve");
    try {
      await approveOrder({ orderId });
      toast.success("Work approved and project completed.");
    } catch (error) {
      toast.error(error?.message || "The delivery could not be approved.");
    } finally {
      setBusy("");
    }
  }

  async function handleRevision(event) {
    event.preventDefault();
    if (!canRequestRevision || revision.trim().length < 10) return;
    setBusy("revision");
    try {
      await requestRevision({ orderId, message: revision.trim() });
      setRevision("");
      toast.success("Revision feedback sent.");
    } catch (error) {
      toast.error(error?.message || "The revision could not be requested.");
    } finally {
      setBusy("");
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
    deliverables === undefined ||
    conversation === undefined
  )
    return (
      <div className={styles.loading}>
        <LoaderCircle /> Opening order…
      </div>
    );
  if (!order)
    return (
      <section className={styles.empty}>
        <h1>Order not found</h1>
        <Link href="/orders">Back to orders</Link>
      </section>
    );

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

      <div className={styles.grid}>
        <section className={styles.workCard}>
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
                      onClick={() => handleAppointmentStatus("completed")}
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
                      onClick={() => handleAppointmentStatus("cancelled")}
                    >
                      Cancel appointment
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </section>
          ) : null}
          <div className={styles.sectionTitle}>
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
                      <a
                        href={item.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Download ${item.fileName}`}
                      >
                        <Download />
                      </a>
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
                        size="sm"
                        type="button"
                        disabled={Boolean(busy)}
                        onClick={async () => {
                          setBusy("remove-file");
                          try {
                            await removeDeliverable({ deliverableId: item.id });
                          } catch (error) {
                            toast.error(
                              error?.message ||
                                "The file could not be removed.",
                            );
                          } finally {
                            setBusy("");
                          }
                        }}
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
          {canDeliver ? (
            <Button
              className={styles.primaryAction}
              type="button"
              onClick={handleDeliver}
              disabled={Boolean(busy)}
            >
              <CheckCircle2 />
              {busy === "deliver" ? "Submitting…" : "Submit work for review"}
            </Button>
          ) : null}
          {canReview ? (
            <div className={styles.reviewActions}>
              <Button
                type="button"
                onClick={handleApprove}
                disabled={Boolean(busy)}
              >
                <CheckCircle2 />{" "}
                {busy === "approve" ? "Approving…" : "Approve delivery"}
              </Button>
              <form onSubmit={handleRevision}>
                <p className="mb-2 text-sm">
                  {order.remainingRevisions === 0
                    ? "The included revisions have been used. Discuss additional changes in the project conversation."
                    : typeof order.remainingRevisions === "number"
                      ? `${order.remainingRevisions} revisions remaining`
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
                    Boolean(busy)
                  }
                >
                  {busy === "revision" ? "Sending…" : "Request revision"}
                </Button>
              </form>
            </div>
          ) : null}
        </section>

        <aside className={styles.chatCard}>
          <h2 className="mb-3 text-lg font-semibold">Project conversation</h2>
          {conversation ? (
            <MessageBox
              key={conversation._id}
              messages={history.messages}
              messageStatus={history.messageStatus}
              onLoadOlder={history.loadOlder}
              readError={history.readError}
              onRetryRead={history.retryRead}
              currentUserId={convexUser?._id}
              otherParticipant={conversation.otherParticipant}
              context={conversation.context}
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
    </div>
  );
}

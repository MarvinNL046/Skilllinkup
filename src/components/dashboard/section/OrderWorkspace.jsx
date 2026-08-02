"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import {
  ArrowLeft, CalendarCheck2, CalendarDays, CheckCircle2, Clock3, Download, FileText, LoaderCircle,
  MapPin, MessageSquare, Paperclip, Send, ShieldCheck, UploadCloud, UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import styles from "./OrderWorkspace.module.css";

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
  const order = useQuery(api.marketplace.orders.getById, isAuthenticated && orderId ? { orderId } : "skip");
  const deliverables = useQuery(api.marketplace.deliverables.list, isAuthenticated && orderId ? { orderId } : "skip");
  const conversation = useQuery(api.chat.conversations.getByOrder, isAuthenticated && orderId ? { orderId } : "skip");
  const appointment = useQuery(api.marketplace.localAppointments.getByOrder, isAuthenticated && orderId ? { orderId } : "skip");
  const messages = useQuery(api.chat.messages.getByConversation, conversation?._id ? { conversationId: conversation._id, limit: 100 } : "skip");
  const generateUploadUrl = useMutation(api.marketplace.deliverables.generateUploadUrl);
  const addDeliverable = useMutation(api.marketplace.deliverables.add);
  const removeDeliverable = useMutation(api.marketplace.deliverables.remove);
  const sendMessage = useMutation(api.chat.messages.send);
  const deliverOrder = useMutation(api.marketplace.orders.deliver);
  const approveOrder = useMutation(api.marketplace.orders.approve);
  const requestRevision = useMutation(api.marketplace.orders.requestRevision);
  const updateAppointmentStatus = useMutation(api.marketplace.localAppointments.updateStatus);
  const rescheduleAppointment = useMutation(api.marketplace.localAppointments.reschedule);
  const [file, setFile] = useState(null);
  const [deliveryNote, setDeliveryNote] = useState("");
  const [message, setMessage] = useState("");
  const [revision, setRevision] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [busy, setBusy] = useState("");

  const isClient = Boolean(order && convexUser?._id === order.clientId);
  const canAddWork = order && !["completed", "cancelled"].includes(order.status);
  const canDeliver = !isClient && ["active", "in_progress", "revision_requested"].includes(order?.status);
  const canReview = isClient && order?.status === "delivered";

  async function handleAddDeliverable(event) {
    event.preventDefault();
    if (!file && !deliveryNote.trim()) return;
    setBusy("deliverable");
    try {
      let storageId;
      if (file) {
        if (file.size > 25 * 1024 * 1024) throw new Error("Files must be smaller than 25 MB.");
        const uploadUrl = await generateUploadUrl({ orderId });
        const response = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": file.type || "application/octet-stream" }, body: file });
        if (!response.ok) throw new Error("The file could not be uploaded.");
        ({ storageId } = await response.json());
      }
      await addDeliverable({ orderId, storageId, fileName: file?.name, fileSize: file?.size, fileType: file?.type, description: deliveryNote.trim() || undefined });
      setFile(null);
      setDeliveryNote("");
      toast.success("Added to the workspace.");
    } catch (error) {
      toast.error(error?.message || "The item could not be added.");
    } finally { setBusy(""); }
  }

  async function handleSend(event) {
    event.preventDefault();
    if (!message.trim() || !conversation?._id) return;
    setBusy("message");
    try {
      await sendMessage({ conversationId: conversation._id, content: message.trim(), messageType: "text" });
      setMessage("");
    } catch (error) { toast.error(error?.message || "The message could not be sent."); }
    finally { setBusy(""); }
  }

  async function handleDeliver() {
    setBusy("deliver");
    try { await deliverOrder({ orderId }); toast.success("Work submitted for review."); }
    catch (error) { toast.error(error?.message || "The work could not be submitted."); }
    finally { setBusy(""); }
  }

  async function handleApprove() {
    setBusy("approve");
    try { await approveOrder({ orderId }); toast.success("Work approved and project completed."); }
    catch (error) { toast.error(error?.message || "The delivery could not be approved."); }
    finally { setBusy(""); }
  }

  async function handleRevision(event) {
    event.preventDefault();
    if (revision.trim().length < 10) return;
    setBusy("revision");
    try { await requestRevision({ orderId, message: revision.trim() }); setRevision(""); toast.success("Revision feedback sent."); }
    catch (error) { toast.error(error?.message || "The revision could not be requested."); }
    finally { setBusy(""); }
  }

  async function handleAppointmentStatus(status) {
    if (!appointment?._id) return;
    setBusy(`appointment-${status}`);
    try {
      await updateAppointmentStatus({ appointmentId: appointment._id, status });
      toast.success(status === "completed" ? "Local service completed." : `Appointment ${status.replaceAll("_", " ")}.`);
    } catch (error) { toast.error(error?.message || "The appointment could not be updated."); }
    finally { setBusy(""); }
  }

  async function handleReschedule(event) {
    event.preventDefault();
    if (!appointment?._id || !appointmentDate) return;
    setBusy("appointment-reschedule");
    try {
      await rescheduleAppointment({ appointmentId: appointment._id, scheduledStart: new Date(appointmentDate).getTime() });
      setAppointmentDate("");
      toast.success("New appointment time requested.");
    } catch (error) { toast.error(error?.message || "The appointment could not be rescheduled."); }
    finally { setBusy(""); }
  }

  if (order === undefined || deliverables === undefined || conversation === undefined) return <div className={styles.loading}><LoaderCircle /> Opening secure workspace…</div>;
  if (!order) return <section className={styles.empty}><h1>Workspace not found</h1><Link href="/orders">Back to orders</Link></section>;

  return (
    <div className={styles.page} data-testid="order-workspace">
      <DashboardNavigation />
      <header className={styles.header}>
        <div><Link href="/orders"><ArrowLeft size={16} /> All orders</Link><p>Order {order.orderNumber}</p><h1>{order.title}</h1><span>{isClient ? order.freelancerName : order.clientName}</span></div>
        <div className={styles.orderMeta}><span data-status={order.status}>{statusLabels[order.status] || order.status}</span><strong>{new Intl.NumberFormat("en", { style: "currency", currency: order.currency || "EUR" }).format(order.amount)}</strong>{order.deliveryDeadline ? <small><CalendarDays /> Due {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(order.deliveryDeadline)}</small> : null}</div>
      </header>
      {order.escrowStatus === "beta_no_payment" ? <div className={styles.betaNotice}><ShieldCheck size={18} /><div><strong>Free private beta</strong><span>No payment or escrow is active for this order. The agreed amount is shown for scope only.</span></div></div> : null}

      <div className={styles.grid}>
        <section className={styles.workCard}>
          {appointment ? <section className={styles.appointmentCard} data-testid="local-appointment">
            <div className={styles.sectionTitle}><i><CalendarCheck2 /></i><div><h2>Local appointment</h2><p>Agree the visit, track the work and close it together.</p></div><span data-status={appointment.status}>{appointment.status.replaceAll("_", " ")}</span></div>
            <div className={styles.appointmentFacts}>
              <p><Clock3 /> <span>{appointment.scheduledStart ? new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short", timeZone: appointment.timezone }).format(appointment.scheduledStart) : "Time to be agreed"}</span></p>
              <p><MapPin /> <span>{appointment.locationAddress || "Address shared privately"}</span></p>
            </div>
            {!["completed", "cancelled", "no_show"].includes(appointment.status) ? <form className={styles.appointmentForm} onSubmit={handleReschedule}><input type="datetime-local" value={appointmentDate} onChange={(event) => setAppointmentDate(event.target.value)} aria-label="Propose a new appointment time" /><button type="submit" disabled={!appointmentDate || busy === "appointment-reschedule"}>Propose new time</button></form> : null}
            <div className={styles.appointmentActions}>
              {!isClient && appointment.status === "requested" ? <button type="button" onClick={() => handleAppointmentStatus("confirmed")}>Confirm appointment</button> : null}
              {!isClient && appointment.status === "confirmed" ? <button type="button" onClick={() => handleAppointmentStatus("in_progress")}>Start work</button> : null}
              {!isClient && ["confirmed", "in_progress"].includes(appointment.status) ? <button type="button" onClick={() => handleAppointmentStatus("completed")}>Mark service complete</button> : null}
              {!["completed", "cancelled", "no_show"].includes(appointment.status) ? <button type="button" className={styles.secondaryAction} onClick={() => handleAppointmentStatus("cancelled")}>Cancel appointment</button> : null}
            </div>
          </section> : null}
          <div className={styles.sectionTitle}><i><Paperclip /></i><div><h2>Files &amp; delivery</h2><p>Keep briefs, work files and delivery notes attached to this order.</p></div></div>
          {deliverables.length ? <div className={styles.files}>{deliverables.map((item) => <article key={item.id}><i><FileText /></i><div><strong>{item.fileName || "Delivery note"}</strong><span>{item.uploaderName} · {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(item.createdAt)} {item.fileSize ? `· ${formatBytes(item.fileSize)}` : ""}</span>{item.description ? <p>{item.description}</p> : null}</div><div>{item.downloadUrl ? <a href={item.downloadUrl} target="_blank" rel="noreferrer" aria-label={`Download ${item.fileName}`}><Download /></a> : null}{item.uploadedBy === convexUser?._id && !["delivered", "completed"].includes(order.status) ? <button type="button" onClick={() => removeDeliverable({ deliverableId: item.id })}>Remove</button> : null}</div></article>)}</div> : <div className={styles.noFiles}><UploadCloud /><p>No files or delivery notes yet.</p></div>}
          {canAddWork ? <form className={styles.deliveryForm} onSubmit={handleAddDeliverable}><label><span>Add a file <em>optional · max 25 MB</em></span><input type="file" onChange={(event) => setFile(event.target.files?.[0] || null)} />{file ? <small>{file.name}</small> : null}</label><label><span>Note <em>optional</em></span><textarea value={deliveryNote} onChange={(event) => setDeliveryNote(event.target.value)} placeholder="Explain what you added or share delivery instructions." rows={3} maxLength={3000} /></label><button type="submit" disabled={busy === "deliverable" || (!file && !deliveryNote.trim())}>{busy === "deliverable" ? <LoaderCircle /> : <Paperclip />} Add to workspace</button></form> : null}
          {canDeliver ? <button className={styles.primaryAction} type="button" onClick={handleDeliver} disabled={busy === "deliver"}><CheckCircle2 />{busy === "deliver" ? "Submitting…" : "Submit work for review"}</button> : null}
          {canReview ? <div className={styles.reviewActions}><button type="button" onClick={handleApprove} disabled={busy === "approve"}><CheckCircle2 /> {busy === "approve" ? "Approving…" : "Approve delivery"}</button><form onSubmit={handleRevision}><textarea value={revision} onChange={(event) => setRevision(event.target.value)} rows={3} minLength={10} maxLength={3000} placeholder="Describe the revision clearly (minimum 10 characters)." /><button type="submit" disabled={revision.trim().length < 10 || busy === "revision"}>{busy === "revision" ? "Sending…" : "Request revision"}</button></form></div> : null}
        </section>

        <aside className={styles.chatCard}>
          <div className={styles.sectionTitle}><i><MessageSquare /></i><div><h2>Project conversation</h2><p>{conversation?.otherParticipant?.name || "Your project partner"}</p></div>{conversation?.otherParticipant?.image ? <Image src={conversation.otherParticipant.image} alt="" width={40} height={40} unoptimized /> : <span className={styles.avatar}><UserRound /></span>}</div>
          <div className={styles.messages}>{messages === undefined ? <LoaderCircle className={styles.spinner} /> : messages.length ? messages.map((item) => <article key={item._id} data-mine={item.senderId === convexUser?._id ? "true" : "false"}><strong>{item.sender?.name || "System"}</strong><p>{item.content || item.fileName}</p><small>{new Intl.DateTimeFormat("en", { timeStyle: "short" }).format(item.createdAt)}</small></article>) : <div className={styles.noMessages}><MessageSquare /><p>Start the conversation with a clear next step.</p></div>}</div>
          {conversation ? <form className={styles.messageForm} onSubmit={handleSend}><textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={3} maxLength={3000} placeholder="Write a project message…" /><button type="submit" disabled={!message.trim() || busy === "message"}>{busy === "message" ? <LoaderCircle /> : <Send />} Send</button></form> : <p className={styles.noConversation}>Conversation setup is still syncing. Refresh in a moment.</p>}
        </aside>
      </div>
    </div>
  );
}

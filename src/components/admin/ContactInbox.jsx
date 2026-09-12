"use client";
import { useState } from "react";
import { useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactInbox() {
  const { results, status, loadMore } = usePaginatedQuery(api.contact.listForAdmin, {}, { initialNumItems: 25 });
  const close = useMutation(api.contact.close);
  const [busy, setBusy] = useState(null);
  async function update(item) {
    setBusy(item._id);
    try { await close({ contactId: item._id, closed: item.status !== "closed" }); }
    catch { toast.error("Could not update this message."); }
    finally { setBusy(null); }
  }
  return <section className="my-8 space-y-4" aria-labelledby="contact-inbox-heading">
    <h2 id="contact-inbox-heading" className="text-xl font-semibold">Contact inbox</h2>
    <p className="text-sm text-slate-600">Website enquiries are kept here even if email delivery is delayed.</p>
    {status === "LoadingFirstPage" ? <p role="status">Loading enquiries…</p> : null}
    {status === "Exhausted" && !results.length ? <p>No contact enquiries yet.</p> : null}
    {results.map((item) => <article key={item._id} className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h3 className="font-semibold">{item.subject} · {item.name}</h3>
          <p className="text-sm text-slate-600">{item.email} · {new Date(item.createdAt).toLocaleDateString("en-GB")} · {item.status}</p></div>
        <Button variant="outline" disabled={busy === item._id} onClick={() => update(item)}>{item.status === "closed" ? "Reopen" : "Mark handled"}</Button>
      </div>
      <p className="mt-3 whitespace-pre-wrap break-words">{item.message}</p>
    </article>)}
    {status === "CanLoadMore" || status === "LoadingMore" ? <Button variant="outline" disabled={status === "LoadingMore"} onClick={() => loadMore(25)}>{status === "LoadingMore" ? "Loading…" : "Load more enquiries"}</Button> : null}
  </section>;
}

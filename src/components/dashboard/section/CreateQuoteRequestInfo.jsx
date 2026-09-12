"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, MapPin, ShieldCheck, Wrench } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { flattenLeafMarketplaceCategories } from "@/lib/marketplaceCategories";
import { Button } from "@/components/ui/button";
import { validatePublishingForm } from "@/lib/publishingValidation.mjs";
import useConvexUser from "@/hook/useConvexUser";
import { EMPTY_QUOTE_REQUEST, quoteRequestDraftKey, restoreQuoteRequestDraft } from "@/lib/quoteRequestDraft.mjs";
import styles from "./CreateQuoteRequestInfo.module.css";

export default function CreateQuoteRequestInfo() {
  const router = useRouter();
  const { convexUser } = useConvexUser();
  const draftKey = quoteRequestDraftKey(convexUser?._id);
  const createRequest = useMutation(api.marketplace.quotes.createRequest);
  const categories = useQuery(api.marketplace.categories.list, { locale: "en", serviceType: "local" });
  const options = useMemo(() => categories ? flattenLeafMarketplaceCategories(categories) : [], [categories]);
  const [busy, setBusy] = useState(false);
  const publishing = useRef(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState(EMPTY_QUOTE_REQUEST);
  const [loadedKey, setLoadedKey] = useState(null);
  const [draftRestored, setDraftRestored] = useState(false);
  const [storageError, setStorageError] = useState("");
  useEffect(() => {
    setForm(EMPTY_QUOTE_REQUEST);
    setDraftRestored(false);
    setSubmitError("");
    setStorageError("");
    if (!draftKey) { setLoadedKey(null); return; }
    try {
      const draft = restoreQuoteRequestDraft(localStorage.getItem(draftKey));
      if (draft) { setForm(draft); setDraftRestored(true); }
    } catch {
      setStorageError("Browser storage is unavailable. You can still publish, but keep this page open to preserve your work.");
    }
    setLoadedKey(draftKey);
  }, [draftKey]);
  const draftReady = Boolean(draftKey && loadedKey === draftKey);
  function saveForLater() {
    if (!draftReady || publishing.current) return;
    try {
      localStorage.setItem(draftKey, JSON.stringify({ version: 1, form }));
      router.push("/dashboard/quote-requests");
    } catch {
      setStorageError("Your browser could not save this draft. Keep this page open and try again, or publish when ready.");
    }
  }
  const set = (name, value) => setForm((current) => ({ ...current, [name]: value }));

  async function submit(event) {
    event.preventDefault();
    if (publishing.current || !draftReady) return;
    const error = validatePublishingForm(form, "quote");
    if (error) { setSubmitError(error); return; }
    publishing.current = true;
    setSubmitError("");
    setBusy(true);
    try {
      const requestId = await createRequest({
        categoryId: form.categoryId,
        title: form.title.trim(),
        description: form.description.trim(),
        locationCity: form.city.trim(),
        locationPostcode: form.postcode.trim(),
        locationCountry: form.country.trim(),
        budgetIndication: form.budget,
        preferredDate: form.preferredDate ? new Date(`${form.preferredDate}T09:00:00`).getTime() : undefined,
      });
      toast.success("Your local request is live.");
      try { localStorage.removeItem(draftKey); } catch {
        toast.error("Your request was published, but this browser could not remove the saved draft. Do not publish it again.");
      }
      router.push(`/local/quote-request/${requestId}`);
    } catch (error) { setSubmitError(error?.message || "The request could not be published."); }
    finally { publishing.current = false; setBusy(false); }
  }

  if (!draftReady) return <p role="status">Preparing your request…</p>;
  return <div className={styles.page}>
    <header><Button type="button" variant="ghost" disabled={busy} onClick={() => router.back()}><ArrowLeft />Back</Button><span>Local · Rotterdam–The Hague beta</span><h1>Tell local professionals what you need</h1><p>Describe the job once. Available professionals can claim the request and send a transparent quote.</p></header>
    <div className={styles.layout}><form onSubmit={submit} aria-busy={busy}>
      <p role="status">{draftRestored ? "Your saved draft has been restored. " : ""}Save for later keeps one draft for this account in this browser. Changes are saved only when you press Save for later; professionals cannot see the draft.</p>
      {storageError && <p role="alert">{storageError}</p>}
      <section><div className={styles.sectionHead}><i><Wrench /></i><div><h2>The job</h2><p>Enough detail helps the right professional respond.</p></div></div><div className={styles.fields}>
        <label><span>Service category</span><select disabled={busy} value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)} required><option value="">Choose a service</option>{options.map((item) => <option key={item._id} value={item._id}>{item.label}</option>)}</select></label>
        <label><span>Short title</span><input disabled={busy} value={form.title} onChange={(e) => set("title", e.target.value)} minLength={8} maxLength={120} placeholder="Annual air-conditioning maintenance" required /></label>
        <label className={styles.full}><span>Description</span><small>{form.description.length}/5,000</small><textarea disabled={busy} value={form.description} onChange={(e) => set("description", e.target.value)} rows={8} minLength={40} maxLength={5000} placeholder="What needs to be done, what is already known, access details and the result you expect…" required /></label>
      </div></section>
      <section><div className={styles.sectionHead}><i><MapPin /></i><div><h2>Location, timing & budget</h2><p>Exact contact details remain private until a professional claims the lead.</p></div></div><div className={styles.fields}>
        <label><span>City</span><input disabled={busy} value={form.city} onChange={(e) => set("city", e.target.value)} required /></label><label><span>Postcode</span><input disabled={busy} value={form.postcode} onChange={(e) => set("postcode", e.target.value)} placeholder="3011 AA" required /></label>
        <label><span>Country</span><input disabled={busy} value={form.country} onChange={(e) => set("country", e.target.value)} required /></label><label><span>Preferred date</span><input disabled={busy} type="date" value={form.preferredDate} onChange={(e) => set("preferredDate", e.target.value)} /></label>
        <label className={styles.full}><span>Budget indication</span><select disabled={busy} value={form.budget} onChange={(e) => set("budget", e.target.value)}><option>Under EUR250</option><option>EUR250 - EUR500</option><option>EUR500 - EUR1,000</option><option>EUR1,000 - EUR2,500</option><option>EUR2,500+</option></select></label>
      </div></section>
      <p role="alert" aria-live="polite">{submitError}</p><footer><Button type="button" variant="outline" disabled={busy} onClick={saveForLater}>Save for later</Button><Button type="submit"  disabled={busy}>{busy ? "Publishing…" : "Request quotes"}<ArrowRight /></Button></footer>
    </form><aside><div className={styles.summary}><span>Request preview</span><h2>{form.title || "Your local job"}</h2><p><MapPin />{form.postcode || form.city}, {form.country}</p><p><CalendarDays />{form.preferredDate || "Flexible date"}</p><strong>{form.budget}</strong></div><div className={styles.trust}><ShieldCheck /><div><strong>Privacy by default</strong><p>Your full description and contact details are only shared with the professionals who claim this request.</p></div></div><div className={styles.steps}><h3>What happens next?</h3>{["Professionals claim the request", "You compare clear quotes", "An accepted quote opens a private workspace"].map((item, index) => <p key={item}><CheckCircle2 /><span><b>{index + 1}</b>{item}</span></p>)}</div></aside></div>
  </div>;
}

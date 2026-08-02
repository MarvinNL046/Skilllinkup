"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, MapPin, ShieldCheck, Wrench } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { flattenLeafMarketplaceCategories } from "@/lib/marketplaceCategories";
import styles from "./CreateQuoteRequestInfo.module.css";

export default function CreateQuoteRequestInfo() {
  const router = useRouter();
  const createRequest = useMutation(api.marketplace.quotes.createRequest);
  const categories = useQuery(api.marketplace.categories.list, { locale: "en", serviceType: "local" });
  const options = useMemo(() => categories ? flattenLeafMarketplaceCategories(categories) : [], [categories]);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ categoryId: "", title: "", description: "", city: "Rotterdam", postcode: "", country: "Netherlands", budget: "EUR250 - EUR500", preferredDate: "" });
  const set = (name, value) => setForm((current) => ({ ...current, [name]: value }));

  async function submit(event) {
    event.preventDefault();
    if (!form.categoryId) return toast.error("Choose the type of local service you need.");
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
      router.push(`/local/quote-request/${requestId}`);
    } catch (error) { toast.error(error?.message || "The request could not be published."); }
    finally { setBusy(false); }
  }

  return <div className={styles.page}>
    <header><button type="button" onClick={() => router.back()}><ArrowLeft />Back</button><span>Local · Rotterdam–The Hague beta</span><h1>Tell local professionals what you need</h1><p>Describe the job once. Available professionals can claim the request and send a transparent quote.</p></header>
    <div className={styles.layout}><form onSubmit={submit}>
      <section><div className={styles.sectionHead}><i><Wrench /></i><div><h2>The job</h2><p>Enough detail helps the right professional respond.</p></div></div><div className={styles.fields}>
        <label><span>Service category</span><select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)} required><option value="">Choose a service</option>{options.map((item) => <option key={item._id} value={item._id}>{item.label}</option>)}</select></label>
        <label><span>Short title</span><input value={form.title} onChange={(e) => set("title", e.target.value)} minLength={8} maxLength={120} placeholder="Annual air-conditioning maintenance" required /></label>
        <label className={styles.full}><span>Description</span><small>{form.description.length}/5,000</small><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={8} minLength={40} maxLength={5000} placeholder="What needs to be done, what is already known, access details and the result you expect…" required /></label>
      </div></section>
      <section><div className={styles.sectionHead}><i><MapPin /></i><div><h2>Location, timing & budget</h2><p>Exact contact details remain private until a professional claims the lead.</p></div></div><div className={styles.fields}>
        <label><span>City</span><input value={form.city} onChange={(e) => set("city", e.target.value)} required /></label><label><span>Postcode</span><input value={form.postcode} onChange={(e) => set("postcode", e.target.value)} placeholder="3011 AA" required /></label>
        <label><span>Country</span><input value={form.country} onChange={(e) => set("country", e.target.value)} required /></label><label><span>Preferred date</span><input type="date" value={form.preferredDate} onChange={(e) => set("preferredDate", e.target.value)} /></label>
        <label className={styles.full}><span>Budget indication</span><select value={form.budget} onChange={(e) => set("budget", e.target.value)}><option>Under EUR250</option><option>EUR250 - EUR500</option><option>EUR500 - EUR1,000</option><option>EUR1,000 - EUR2,500</option><option>EUR2,500+</option></select></label>
      </div></section>
      <footer><button type="button" className={styles.secondary} onClick={() => router.push("/local")}>Cancel</button><button type="submit" disabled={busy}>{busy ? "Publishing…" : "Request quotes"}<ArrowRight /></button></footer>
    </form><aside><div className={styles.summary}><span>Request preview</span><h2>{form.title || "Your local job"}</h2><p><MapPin />{form.postcode || form.city}, {form.country}</p><p><CalendarDays />{form.preferredDate || "Flexible date"}</p><strong>{form.budget}</strong></div><div className={styles.trust}><ShieldCheck /><div><strong>Privacy by default</strong><p>Your full description and contact details are only shared with the professionals who claim this request.</p></div></div><div className={styles.steps}><h3>What happens next?</h3>{["Professionals claim the request", "You compare clear quotes", "An accepted quote opens a private workspace"].map((item, index) => <p key={item}><CheckCircle2 /><span><b>{index + 1}</b>{item}</span></p>)}</div></aside></div>
  </div>;
}

"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import ServiceImagePicker from "./ServiceImagePicker";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const enhanced = process.env.NEXT_PUBLIC_SERVICE_EDITOR_ENABLED === "1";
export default function ServiceEditor({ gig, onClose }) {
  const loaded = useQuery(api.marketplace.serviceEditor.get, enhanced ? { gigId: gig._id } : "skip");
  const data = enhanced ? loaded : gig;
  return <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}><DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto"><DialogHeader><DialogTitle>Edit service</DialogTitle><DialogDescription>Update your service, packages and gallery.</DialogDescription></DialogHeader>{data ? <ServiceForm gig={{ ...data, _id: gig._id }} onClose={onClose} /> : <p role="status">Loading service…</p>}</DialogContent></Dialog>;
}

function ServiceForm({ gig, onClose }) {
  const updateGig = useMutation(enhanced ? api.marketplace.serviceEditor.update : api.marketplace.gigs.update);
  const [title, setTitle] = useState(gig.title);
  const [description, setDescription] = useState(gig.description || "");
  const [packages, setPackages] = useState(gig.packages || []);
  const [imageUrls, setImageUrls] = useState(gig.imageUrls || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function save(event) {
    event.preventDefault();
    if (!title.trim() || !description.trim()) { setError("Add a title and description."); return; }
    setSaving(true); setError("");
    try {
      await updateGig({ gigId: gig._id, title: title.trim(), description: description.trim(), ...(enhanced ? { packages, imageUrls } : {}) });
      toast.success("Service updated"); onClose();
    } catch (cause) { setError(cause?.message || "Could not save your service. Try again."); }
    finally { setSaving(false); }
  }
  return <form onSubmit={save} className="grid gap-4">
        <div className="grid gap-2"><Label htmlFor="edit-service-title">Title</Label><Input id="edit-service-title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={160} required disabled={saving} /></div>
        <div className="grid gap-2"><Label htmlFor="edit-service-description">Description</Label><Textarea id="edit-service-description" value={description} onChange={(e) => setDescription(e.target.value)} rows={7} maxLength={10000} required disabled={saving} /></div>
        {packages.map((pkg, index) => <fieldset key={pkg.tier} disabled={saving} className="grid gap-3 rounded-lg border p-4"><legend className="px-2 text-sm font-medium capitalize">{pkg.tier} package</legend>
          {[["title", "Package name", "text"], ["description", "Package description", "text"], ["price", "Price (EUR)", "number"], ["deliveryDays", "Delivery days", "number"], ["revisionCount", "Revisions", "number"]].map(([field, label, type]) => <div key={field} className="grid gap-1"><Label htmlFor={`package-${pkg.tier}-${field}`}>{label}</Label><Input id={`package-${pkg.tier}-${field}`} type={type} required={field !== "revisionCount"} min={field === "revisionCount" ? 0 : type === "number" ? 1 : undefined} step={field === "price" ? "0.01" : type === "number" ? 1 : undefined} value={pkg[field] ?? ""} onChange={event => setPackages(current => current.map((p, i) => i === index ? { ...p, [field]: type === "number" ? event.target.value === "" ? undefined : Number(event.target.value) : event.target.value } : p))} /></div>)}
        </fieldset>)}
        {enhanced && <ServiceImagePicker value={imageUrls} onChange={setImageUrls} disabled={saving} onBusyChange={setUploading} />}
        {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
        <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={onClose} disabled={saving || uploading}>Cancel</Button><Button type="submit" disabled={saving || uploading}>{saving ? "Saving…" : "Save changes"}</Button></div>
      </form>;
}

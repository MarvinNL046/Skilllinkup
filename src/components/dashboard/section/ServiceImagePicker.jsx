"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

export default function ServiceImagePicker({ value, onChange, disabled, onBusyChange }) {
  const uploadUrl = useMutation(api.marketplace.serviceEditor.generateImageUploadUrl);
  const resolve = useMutation(api.marketplace.serviceEditor.resolveImageUpload);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function upload(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length) return;
    if (files.length + value.length > 6) { setError("Choose up to six images."); return; }
    if (files.some(f => !["image/jpeg", "image/png", "image/webp"].includes(f.type) || f.size > 8 * 1024 * 1024 || !f.size)) { setError("Choose JPG, PNG or WebP images up to 8 MB each."); return; }
    setBusy(true); onBusyChange?.(true); setError("");
    const next = [...value];
    try {
      for (const file of files) {
        const response = await fetch(await uploadUrl({}), { method: "POST", headers: { "Content-Type": file.type }, body: file });
        if (!response.ok) throw new Error("Upload failed. Please try again.");
        const { storageId } = await response.json();
        next.push(await resolve({ storageId }));
        onChange([...next]);
      }
    } catch (cause) { setError(cause.message || "Could not upload this image."); }
    finally { setBusy(false); onBusyChange?.(false); }
  }
  return <section className="grid gap-3" aria-label="Service gallery">
    <div><h3 className="text-base font-medium">Gallery</h3><p className="text-sm text-muted-foreground">Up to six images. JPG, PNG or WebP, maximum 8 MB each. The first image is your cover.</p></div>
    <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={upload} disabled={disabled || busy || value.length >= 6} aria-label="Upload service images" className="text-sm" />
    {busy && <p role="status" className="text-sm">Uploading images…</p>}
    <div className="flex flex-wrap gap-3">{value.map((url, index) => <div key={url} className="grid gap-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={`Service image ${index + 1}`} className="h-24 w-32 rounded-md border object-cover" />
      <Button type="button" variant="ghost" size="sm" disabled={disabled || busy} onClick={() => onChange(value.filter(item => item !== url))} aria-label={`Remove image ${index + 1}`}>Remove</Button>
    </div>)}</div>
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
  </section>;
}

"use client";
import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function PortfolioProjectModal({ project, open, onOpenChange }) {
  const tt = useTranslations("toasts");
  const createProject = useMutation(api.marketplace.portfolio.create);
  const updateProject = useMutation(api.marketplace.portfolio.update);
  const generateUploadUrl = useMutation(api.marketplace.portfolio.generateImageUploadUrl);

  const isEdit = !!project;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setTagsInput((project.tags || []).join(", "));
      setExternalUrl(project.externalUrl || "");
      setImageUrls(project.imageUrls || []);
    } else {
      setTitle("");
      setDescription("");
      setTagsInput("");
      setExternalUrl("");
      setImageUrls([]);
    }
  }, [project]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 5 - imageUrls.length);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const storageIds = await Promise.all(
        files.map(async (file) => {
          const uploadUrl = await generateUploadUrl();
          const res = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": file.type },
            body: file,
          });
          if (!res.ok) throw new Error("Upload failed");
          const { storageId } = await res.json();
          return storageId;
        })
      );
      setImageUrls((prev) => [...prev, ...storageIds].slice(0, 5));
    } catch {
      toast.error(tt("imageUploadFailed"));
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx) => setImageUrls((prev) => prev.filter((_, i) => i !== idx));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error(tt("titleRequired"));
      return;
    }
    setSaving(true);
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    try {
      if (isEdit) {
        await updateProject({
          projectId: project._id,
          title,
          description: description || undefined,
          imageUrls,
          tags,
          externalUrl: externalUrl || undefined,
        });
        toast.success(tt("projectUpdated"));
      } else {
        await createProject({
          title,
          description: description || undefined,
          imageUrls,
          tags,
          externalUrl: externalUrl || undefined,
        });
        toast.success(tt("projectAdded"));
      }
      onOpenChange?.(false);
    } catch (err) {
      toast.error(err.message || tt("failedToSave"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Project" : "Add Portfolio Project"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="portfolio-title">Title *</Label>
            <Input
              id="portfolio-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. E-commerce website redesign"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="portfolio-desc">Description</Label>
            <Textarea
              id="portfolio-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What did you build and what was the outcome?"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="portfolio-tags">Tags</Label>
            <Input
              id="portfolio-tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. React, UI Design, Figma"
            />
            <p className="text-xs text-[var(--text-tertiary)]">Separate with commas</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="portfolio-url">External Link</Label>
            <Input
              id="portfolio-url"
              type="url"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <Label>Images ({imageUrls.length}/5)</Label>
            <div className="flex flex-wrap gap-2">
              {imageUrls.map((url, idx) => (
                <div
                  key={idx}
                  className="relative h-20 w-20 overflow-hidden rounded-md border border-[var(--border-subtle)] bg-[var(--surface-2)] flex items-center justify-center"
                >
                  <span className="text-xs text-[var(--text-tertiary)]">img {idx + 1}</span>
                  <button
                    type="button"
                    className="absolute right-0 top-0 inline-flex h-5 w-5 items-center justify-center rounded-bl-md bg-destructive text-destructive-foreground text-[10px]"
                    onClick={() => removeImage(idx)}
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
              {imageUrls.length < 5 && (
                <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md border border-dashed border-[var(--border-default)] text-sm text-[var(--text-tertiary)] hover:bg-[var(--surface-2)]">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  {uploading ? "..." : "+ Add"}
                </label>
              )}
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange?.(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

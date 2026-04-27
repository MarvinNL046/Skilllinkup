"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Pencil, Trash2, Plus } from "lucide-react";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_FILES = 8;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export default function ServiceGallery() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    const isDup = (file, list) => list.some((f) => f.name === file.name);

    const accepted = [];
    for (const file of newFiles) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error(`${file.name}: unsupported file type`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast.error(`${file.name}: exceeds ${MAX_FILE_SIZE_MB}MB limit`);
        continue;
      }
      if (isDup(file, uploadedFiles) || isDup(file, accepted)) continue;
      accepted.push(file);
    }

    if (uploadedFiles.length + accepted.length > MAX_FILES) {
      const remaining = Math.max(0, MAX_FILES - uploadedFiles.length);
      toast.error(`Maximum ${MAX_FILES} images. Skipped ${accepted.length - remaining}.`);
      accepted.length = remaining;
    }

    if (accepted.length > 0) {
      setUploadedFiles((prev) => [...prev, ...accepted]);
    }
    event.target.value = "";
  };

  const handleFileDelete = (fileName) => {
    setUploadedFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
        <CardTitle className="text-lg font-semibold">Gallery</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-3 mb-6">
            {uploadedFiles.map((item, i) => (
              <div
                key={i}
                className="relative h-40 w-48 overflow-hidden rounded-md border border-[var(--border-subtle)] group"
              >
                <Image
                  fill
                  src={URL.createObjectURL(item)}
                  alt="gallery"
                  className="object-cover"
                />
                <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    aria-label="Edit"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--bg-elevated)]/90 text-foreground hover:bg-[var(--bg-elevated)]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete"
                    onClick={() => handleFileDelete(item.name)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-destructive/90 text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {uploadedFiles.length < MAX_FILES && (
              <label className="flex h-40 w-48 cursor-pointer items-center justify-center rounded-md border border-dashed border-[var(--border-default)] text-[var(--text-tertiary)] hover:bg-[var(--surface-2)] hover:text-foreground">
                <div className="text-center">
                  <Plus className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-xs">Add image</span>
                </div>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleFileUpload}
                  multiple
                />
              </label>
            )}
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-5">
            Up to {MAX_FILES} images. Max file size {MAX_FILE_SIZE_MB}MB. Supported
            formats: .jpg, .png, .webp.
          </p>
          <Button>
            Save
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

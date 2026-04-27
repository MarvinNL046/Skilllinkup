"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";

export default function UploadAttachment() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    const isDuplicate = (file, list) => list.some((f) => f.name === file.name);
    const uniqueNew = newFiles.filter((f) => !isDuplicate(f, uploadedFiles));
    setUploadedFiles((prev) => [...prev, ...uniqueNew]);
  };

  const handleFileDelete = (fileName) => {
    setUploadedFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
        <CardTitle className="text-lg font-semibold">Upload Attachments</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {uploadedFiles.map((item, i) => (
            <div key={i} className="relative">
              <div className="rounded-lg border border-[var(--border-subtle)] p-4 text-center bg-[var(--surface-2)]">
                <h6 className="text-sm font-semibold truncate">
                  {item.name.split(".")[0].substring(0, 15)}
                </h6>
                <p className="text-xs uppercase text-[var(--text-tertiary)] mt-1">
                  {item.name.split(".").pop()}
                </p>
                <span className="flaticon-page text-2xl text-[var(--text-tertiary)] mt-2 inline-block" />
              </div>
              <button
                type="button"
                onClick={() => handleFileDelete(item.name)}
                className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs"
                aria-label={`Remove ${item.name}`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <label className="flex h-full min-h-[80px] cursor-pointer items-center justify-center rounded-lg border border-dashed border-[var(--border-default)] text-sm text-primary hover:bg-[var(--surface-2)]">
            Upload Files
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileUpload}
              multiple
            />
          </label>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">Maximum file size: 10 MB</p>
        <div>
          <Button asChild>
            <Link href="/contact">
              Save &amp; Publish
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

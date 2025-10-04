"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Afbeelding" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>(value || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Alleen JPEG, PNG, WebP en GIF afbeeldingen zijn toegestaan');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Afbeelding mag maximaal 5MB zijn');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload mislukt');
      }

      setPreview(data.url);
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis bij het uploaden');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-heading font-semibold text-text-primary">
        {label}
      </label>

      {/* Preview */}
      {preview && (
        <div className="relative rounded-lg overflow-hidden border border-background-gray">
          <div className="relative w-full h-48">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* Upload Button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-background-gray text-sm font-heading font-semibold text-text-secondary hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploaden...
            </span>
          ) : preview ? (
            "📁 Andere afbeelding kiezen"
          ) : (
            "📁 Upload afbeelding"
          )}
        </button>
      </div>

      {/* Manual URL Input */}
      <div className="text-xs text-text-muted text-center">
        Of
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setPreview(e.target.value);
        }}
        placeholder="/images/posts/mijn-afbeelding.jpg"
        className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
      />

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Info */}
      <p className="text-xs text-text-muted">
        Toegestane formaten: JPEG, PNG, WebP, GIF • Max. 5MB
      </p>
    </div>
  );
}

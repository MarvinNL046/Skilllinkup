"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (value: string, file?: File) => void;
  helperText?: string;
  accept?: string;
  id?: string;
  isInvalid?: boolean;
  errorMessage?: string;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  helperText,
  accept = "image/*",
  id,
  isInvalid,
  errorMessage,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value ?? null);

  useEffect(() => {
    setPreview(value ?? null);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange(result, file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="form-style1 mb20">
      <label className="heading-color ff-heading fw500 mb10" htmlFor={id}>
        {label}
      </label>
      <div className="d-flex align-items-center gap-3">
        {preview && (
          <div className="position-relative" style={{ width: 72, height: 72 }}>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="rounded-circle object-fit-cover"
            />
          </div>
        )}
        <div>
          <input
            id={id}
            type="file"
            className={`form-control ${isInvalid ? "is-invalid" : ""}`}
            accept={accept}
            onChange={handleChange}
          />
          {helperText && <p className="text mt10 mb0">{helperText}</p>}
          {isInvalid && errorMessage && (
            <div className="invalid-feedback d-block">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}

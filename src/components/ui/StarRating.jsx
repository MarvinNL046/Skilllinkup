"use client";
import { useId } from "react";
import { Star } from "lucide-react";

export default function StarRating({ value = 0, onChange, readOnly = false, size = "md", label = "Rating", disabled = false }) {
  const id = useId();
  const sizeCls = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className="flex items-center gap-1" role={readOnly ? "img" : "radiogroup"} aria-label={readOnly ? `${label}: ${value} out of 5` : label}>
      {[1, 2, 3, 4, 5].map((star) => {
        const icon = <Star aria-hidden="true" className={`${sizeCls} text-warning ${star <= value ? "fill-warning" : ""}`} />;
        return readOnly ? <span key={star}>{icon}</span> : (
          <label key={star} className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary">
            <input className="sr-only" type="radio" name={id} value={star} checked={value === star}
              aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`} disabled={disabled}
              onChange={() => onChange?.(star)} />
            {icon}
          </label>
        );
      })}
    </div>
  );
}

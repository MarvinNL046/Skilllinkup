"use client";

/**
 * StarRating - Clickable 1-5 star selector.
 * Props:
 *   value     {number}   Current rating (1-5), 0 means none selected
 *   onChange  {function} Called with new rating value when a star is clicked
 *   readOnly  {boolean}  If true, stars are not clickable (display only)
 *   size      {string}   "sm" | "md" (default: "md")
 */
export default function StarRating({ value = 0, onChange, readOnly = false, size = "md" }) {
  const sizeCls = size === "sm" ? "fz12" : "fz18";

  return (
    <div className="d-flex align-items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= value;
        return (
          <i
            key={star}
            className={`${filled ? "fas" : "far"} fa-star review-color ${sizeCls}`}
            style={{ cursor: readOnly ? "default" : "pointer" }}
            onClick={() => {
              if (!readOnly && onChange) onChange(star);
            }}
            role={readOnly ? undefined : "button"}
            aria-label={readOnly ? undefined : `Rate ${star} star${star !== 1 ? "s" : ""}`}
          />
        );
      })}
    </div>
  );
}

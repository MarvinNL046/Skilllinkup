"use client";

/**
 * SkillLinkup DS Tabs — segmented control on a surface-2 track.
 * From the design system v2 (.sc-tabs). Use as:
 *   <Tabs value={tab} onChange={setTab} options={[
 *     { value: "all", label: "All" },
 *     { value: "online", label: "Online" },
 *   ]} />
 */
export default function Tabs({ value, onChange, options = [], ariaLabel }) {
  return (
    <div className="sc-tabs" role="tablist" aria-label={ariaLabel}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={opt.value === value}
          onClick={() => onChange?.(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

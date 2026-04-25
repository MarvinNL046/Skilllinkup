"use client";

/**
 * SkillLinkup DS Switch — controlled checkbox with primary-tinted track.
 * From the design system v2 (.sc-switch). Use as:
 *   <Switch checked={enabled} onChange={setEnabled} aria-label="Notifications" />
 */
export default function Switch({ checked, onChange, disabled, ...rest }) {
  return (
    <label className="sc-switch" style={disabled ? { opacity: 0.5, cursor: "not-allowed" } : undefined}>
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => !disabled && onChange?.(e.target.checked)}
        disabled={disabled}
        {...rest}
      />
      <span className="sc-switch__slider" />
    </label>
  );
}

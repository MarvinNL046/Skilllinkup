"use client";

/**
 * SkillLinkup DS Tooltip — hover/focus, dark on light. From the design
 * system v2 (.sc-tooltip). Use as:
 *   <Tooltip content="Verified within 24h">
 *     <button className="btn btn--secondary btn--sm">Hover me</button>
 *   </Tooltip>
 *
 * Always wrap a single focusable child so keyboard users get the
 * tooltip on focus too.
 */
export default function Tooltip({ content, children }) {
  return (
    <span className="sc-tooltip-wrap">
      {children}
      <span role="tooltip" className="sc-tooltip">
        {content}
      </span>
    </span>
  );
}

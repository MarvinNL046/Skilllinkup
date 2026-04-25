"use client";
import { useState } from "react";
import { X } from "lucide-react";

/**
 * Multi-tag input on the SkillLinkup Design System. Replaces the
 * comma-separated free-text inputs the audit flagged on
 * /create-projects ("Required Skills") and /add-services ("Tags").
 *
 * Usage:
 *   <TagsInput
 *     value={tags}                           // string[] OR comma-separated string
 *     onChange={setTags}                     // returns string[]
 *     placeholder="Add a skill"
 *     suggestions={["React", "Node", ...]}    // optional autocomplete
 *   />
 *
 * Submit a tag with Enter or comma. Backspace on empty input removes
 * the last tag. Click the × on a chip to remove.
 */
export default function TagsInput({
  value = [],
  onChange,
  placeholder = "Add a tag",
  suggestions = [],
  maxTags = 12,
}) {
  const tags = Array.isArray(value)
    ? value
    : (value || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);

  function commit(raw) {
    const clean = (raw || "").trim().replace(/,$/, "").trim();
    if (!clean) return;
    if (tags.length >= maxTags) return;
    if (tags.some((t) => t.toLowerCase() === clean.toLowerCase())) {
      setInput("");
      return;
    }
    onChange?.([...tags, clean]);
    setInput("");
  }

  function remove(i) {
    const next = tags.filter((_, idx) => idx !== i);
    onChange?.(next);
  }

  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit(input);
    } else if (e.key === "Backspace" && !input && tags.length) {
      remove(tags.length - 1);
    }
  }

  const visibleSuggestions = focused && input.trim()
    ? suggestions
        .filter(
          (s) =>
            s.toLowerCase().includes(input.trim().toLowerCase()) &&
            !tags.some((t) => t.toLowerCase() === s.toLowerCase())
        )
        .slice(0, 6)
    : [];

  return (
    <div style={{ position: "relative" }}>
      <div
        className="input"
        onClick={(e) => {
          // Focus the actual input when wrapper is clicked
          const el = e.currentTarget.querySelector("input");
          el?.focus();
        }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          minHeight: 44,
          padding: "8px 10px",
          alignItems: "center",
          cursor: "text",
        }}
      >
        {tags.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="tag tag--primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              paddingRight: 4,
            }}
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                remove(i);
              }}
              aria-label={`Remove ${tag}`}
              style={{
                width: 16,
                height: 16,
                display: "grid",
                placeItems: "center",
                border: "none",
                background: "transparent",
                color: "currentColor",
                cursor: "pointer",
                borderRadius: 999,
                padding: 0,
              }}
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            // commit on blur so the user doesn't lose what they typed
            if (input.trim()) commit(input);
            setTimeout(() => setFocused(false), 120);
          }}
          placeholder={tags.length === 0 ? placeholder : ""}
          style={{
            flex: 1,
            minWidth: 120,
            border: "none",
            outline: "none",
            background: "transparent",
            font: "inherit",
            color: "var(--text-primary)",
          }}
        />
      </div>

      {visibleSuggestions.length > 0 && (
        <ul
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            margin: 0,
            padding: "var(--space-1)",
            listStyle: "none",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-3)",
            zIndex: 30,
          }}
        >
          {visibleSuggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(s)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "var(--space-2) var(--space-3)",
                  border: "none",
                  background: "transparent",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  fontSize: "var(--text-body-sm)",
                  fontFamily: "inherit",
                  color: "var(--text-primary)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--surface-2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

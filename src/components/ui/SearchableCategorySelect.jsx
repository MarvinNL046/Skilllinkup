"use client";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

export default function SearchableCategorySelect({
  options,
  value,
  onChange,
  loading = false,
}) {
  const id = useId();
  const [search, setSearch] = useState("");
  const terms = search.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const matches = options.filter((option) =>
    terms.every((term) => option.label.toLocaleLowerCase().includes(term)),
  );
  const selected = options.find((option) => option._id === value);
  const selectedOutsideSearch =
    selected && !matches.some((option) => option._id === value);
  const groups = new Map();
  for (const option of matches) {
    const group = option.label.includes(" / ")
      ? option.label.split(" / ")[0]
      : "Other categories";
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(option);
  }
  return (
    <div className="grid min-w-0 gap-3">
      <label htmlFor={`${id}-search`}>Find a category</label>
      <div className="flex min-w-0 items-center gap-2">
        <input
          id={`${id}-search`}
          type="search"
          placeholder="Search, e.g. web design"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          disabled={loading}
          aria-describedby={`${id}-results`}
        />
        {search && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setSearch("")}
          >
            Clear
          </Button>
        )}
      </div>
      <label htmlFor={`${id}-category`}>Category</label>
      <select
        id={`${id}-category`}
        aria-label="Project category"
        value={value}
        disabled={loading}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={`${id}-results`}
      >
        <option value="">
          {loading ? "Loading categories…" : "Select a category"}
        </option>
        {selectedOutsideSearch && (
          <optgroup label="Current selection">
            <option value={selected._id}>{selected.label}</option>
          </optgroup>
        )}
        {[...groups].map(([group, items]) => (
          <optgroup key={group} label={group}>
            {items.map((option) => (
              <option key={option._id} value={option._id}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <small id={`${id}-results`} role="status">
        {loading
          ? "Loading categories…"
          : matches.length
            ? `${matches.length} matching ${matches.length === 1 ? "category" : "categories"}. Choose one from the list.`
            : "No matching categories. Try another search."}
        {selectedOutsideSearch ? " Your current selection is kept." : ""}
      </small>
    </div>
  );
}

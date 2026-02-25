"use client";

import { useState } from "react";

interface TagInputProps {
  label: string;
  value: string[];
  placeholder?: string;
  onChange: (value: string[]) => void;
}

export default function TagInput({
  label,
  value,
  placeholder = "Add a tag",
  onChange,
}: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const tag = input.trim();
    if (!tag || value.includes(tag)) return;
    onChange([...value, tag]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((item) => item !== tag));
  };

  return (
    <div className="form-style1 mb20">
      <label className="heading-color ff-heading fw500 mb10">{label}</label>
      <div className="d-flex gap-2">
        <input
          type="text"
          className="form-control"
          value={input}
          placeholder={placeholder}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              addTag();
            }
          }}
        />
        <button type="button" className="ud-btn btn-thm" onClick={addTag}>
          Add
        </button>
      </div>
      {value.length > 0 && (
        <div className="d-flex flex-wrap gap-2 mt15">
          {value.map((tag) => (
            <span key={tag} className="badge bdrs12 px-3 py-2 bgc-thm2 text-white">
              {tag}
              <button
                type="button"
                className="ms-2 btn-close btn-close-white"
                aria-label={`Remove ${tag}`}
                onClick={() => removeTag(tag)}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

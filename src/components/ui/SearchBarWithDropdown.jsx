"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function pathToServiceType(pathname) {
  if (pathname.startsWith("/local")) return "local";
  return "digital"; // /online/, /jobs/, default
}

const POPULAR = [
  "logo design",
  "web development",
  "video editing",
  "graphic design",
  "content writing",
];

// Bold the completion (non-typed) part — like Fiverr
function BoldMatch({ text, query }) {
  if (!query) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span><strong>{text}</strong></span>;
  return (
    <span>
      {text.slice(0, idx + query.length)}
      <strong>{text.slice(idx + query.length)}</strong>
    </span>
  );
}

export default function SearchBarWithDropdown({
  placeholder = "What service are you looking for today?",
  className = "",
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const serviceType = pathToServiceType(pathname);
  const wrapperRef = useRef(null);

  // 250ms debounce
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  // Sluit dropdown bij klik buiten
  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const active = debouncedQuery.trim().length >= 2;

  const gigResults = useQuery(
    api.marketplace.gigs.search,
    active ? { query: debouncedQuery.trim(), locale: "en" } : "skip"
  );

  const categoryResults = useQuery(
    api.marketplace.categories.search,
    active ? { query: debouncedQuery.trim(), locale: "en", serviceType } : "skip"
  );

  // Combine: categories first, then unique gig titles, max 8 total
  const suggestions = active ? (() => {
    const catNames = (categoryResults || []).map((c) => c.name);
    const gigTitles = [...new Set((gigResults || []).map((g) => g.title))];
    const seen = new Set(catNames.map((n) => n.toLowerCase()));
    const combined = [...catNames];
    for (const t of gigTitles) {
      if (!seen.has(t.toLowerCase())) combined.push(t);
    }
    return combined.slice(0, 8);
  })() : [];

  const isLoading = active && (gigResults === undefined || categoryResults === undefined);

  function navigate(q) {
    setIsOpen(false);
    setQuery(q);
    router.push(`/online/services?q=${encodeURIComponent(q)}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) navigate(query.trim());
  }

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
      style={{ minWidth: "min(300px, 100%)" }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          background: "#f4f4f5",
          borderRadius: 10,
          border: "none",
          overflow: "hidden",
        }}
      >
        <input
          type="text"
          className="form-control border-0"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          style={{
            flex: "1 1 0",
            minWidth: 0,
            width: "auto",
            background: "transparent",
            fontSize: 14,
            boxShadow: "none",
          }}
          autoComplete="off"
        />
        <button
          type="submit"
          aria-label="Search"
          style={{
            flex: "0 0 auto",
            alignSelf: "stretch",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            padding: "0 14px",
            cursor: "pointer",
            fontSize: 16,
            color: "#555",
          }}
        >
          <span className="flaticon-loupe" />
        </button>
      </form>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          {query.trim().length < 2 ? (
            // Popular right now
            <div style={{ padding: "12px 16px" }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#888",
                  letterSpacing: 1,
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>↗</span> POPULAR RIGHT NOW
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {POPULAR.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => navigate(term)}
                    style={{
                      background: "#f4f4f5",
                      border: "none",
                      borderRadius: 20,
                      padding: "6px 14px",
                      fontSize: 13,
                      cursor: "pointer",
                      color: "#222",
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : suggestions.length > 0 ? (
            // Autocomplete suggesties
            <ul style={{ margin: 0, padding: "8px 0", listStyle: "none" }}>
              {suggestions.map((title) => (
                <li key={title}>
                  <button
                    type="button"
                    onClick={() => navigate(title)}
                    className="search-suggestion-btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      width: "100%",
                      textAlign: "left",
                      padding: "9px 16px",
                      background: "none",
                      border: "none",
                      fontSize: 14,
                      cursor: "pointer",
                      color: "#222",
                    }}
                  >
                    <span
                      className="flaticon-loupe"
                      style={{ fontSize: 12, color: "#aaa" }}
                    />
                    <BoldMatch text={title} query={debouncedQuery} />
                  </button>
                </li>
              ))}
            </ul>
          ) : !isLoading ? (
            // Geen resultaten — toon zoekknop
            <button
              type="button"
              onClick={() => navigate(debouncedQuery.trim())}
              className="search-suggestion-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                textAlign: "left",
                padding: "12px 16px",
                background: "none",
                border: "none",
                fontSize: 14,
                cursor: "pointer",
                color: "#222",
              }}
            >
              <span className="flaticon-loupe" style={{ fontSize: 12, color: "#aaa" }} />
              Search for <strong className="ml5">"{debouncedQuery.trim()}"</strong>
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

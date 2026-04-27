"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      setVisible(true);
    }
  }, []);

  function handleAcceptAll() {
    localStorage.setItem(STORAGE_KEY, "all");
    setVisible(false);
    // PostHog opt-in: if PostHog is already loaded, opt the user back in
    if (typeof window !== "undefined" && window.posthog) {
      window.posthog.opt_in_capturing();
    }
  }

  function handleNecessaryOnly() {
    localStorage.setItem(STORAGE_KEY, "necessary");
    setVisible(false);
    // PostHog opt-out: disable analytics cookies when only necessary is chosen
    if (typeof window !== "undefined" && window.posthog) {
      window.posthog.opt_out_capturing();
    }
  }

  if (!mounted || !visible) return null;

  return (
    <>
      <style>{`
        @keyframes cookieSlideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .cookie-banner {
          animation: cookieSlideUp 0.35s ease forwards;
        }
        .cookie-btn-necessary:hover {
          background-color: #f3f4f6 !important;
          border-color: #9ca3af !important;
        }
        .cookie-btn-accept:hover {
          background-color: #1e6b02 !important;
        }
        .cookie-policy-link:hover {
          text-decoration: underline !important;
        }
      `}</style>

      <div
        className="cookie-banner"
        role="dialog"
        aria-label="Cookie consent"
        aria-live="polite"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10000,
          background: "#ffffff",
          borderTop: "1px solid #e5e7eb",
          boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.10)",
          padding: "14px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {/* Cookie icon + message */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flex: 1,
              minWidth: "220px",
            }}
          >
            <Cookie
              className="h-6 w-6 flex-shrink-0 text-primary"
              aria-hidden="true"
            />
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#374151",
                lineHeight: 1.5,
              }}
            >
              We use cookies to improve your experience.{" "}
              <Link
                href="/privacy-policy"
                className="cookie-policy-link"
                style={{
                  color: "var(--primary-600)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Action buttons */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <button
              onClick={handleNecessaryOnly}
              className="cookie-btn-necessary"
              style={{
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                background: "#f9fafb",
                border: "1.5px solid #d1d5db",
                borderRadius: "7px",
                cursor: "pointer",
                transition: "background-color 0.2s, border-color 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              Only Necessary
            </button>

            <button
              onClick={handleAcceptAll}
              className="cookie-btn-accept"
              style={{
                padding: "8px 18px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#ffffff",
                background: "var(--primary-600)",
                border: "1.5px solid var(--primary-600)",
                borderRadius: "7px",
                cursor: "pointer",
                transition: "background-color 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

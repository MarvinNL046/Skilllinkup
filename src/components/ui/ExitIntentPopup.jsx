"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";

const SESSION_KEY = "exitIntentShown";
const DELAY_MS = 5000;

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);
  const [readyToShow, setReadyToShow] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setReadyToShow(true);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseLeave = useCallback((e) => {
    if (e.clientY >= 0) return;

    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) return;

    sessionStorage.setItem(SESSION_KEY, "true");
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!mounted || !readyToShow) return;

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mounted, readyToShow, handleMouseLeave]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubscribe = () => {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're subscribed! We'll keep you updated.");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "exitFadeIn 0.25s ease forwards",
      }}
    >
      <style>{`
        @keyframes exitFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes exitScaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        .exit-intent-card {
          animation: exitScaleIn 0.3s ease forwards;
        }
        .exit-subscribe-btn:hover {
          background-color: #16a34a !important;
        }
        .exit-register-btn:hover {
          background-color: #ef2b70 !important;
          color: #fff !important;
          border-color: #ef2b70 !important;
        }
        .exit-no-thanks:hover {
          color: #ef2b70 !important;
        }
        .exit-close-btn:hover {
          color: #ef2b70 !important;
        }
      `}</style>

      {/* Modal card - stop propagation so clicking inside doesn't close */}
      <div
        className="exit-intent-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "40px 36px 32px",
          maxWidth: "480px",
          width: "90%",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Accent top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            borderRadius: "16px 16px 0 0",
            background: "linear-gradient(90deg, #ef2b70, #1e1541)",
          }}
        />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="exit-close-btn"
          aria-label="Close popup"
          style={{
            position: "absolute",
            top: "14px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "22px",
            lineHeight: 1,
            color: "#9ca3af",
            padding: "4px 8px",
            transition: "color 0.2s",
          }}
        >
          &times;
        </button>

        {/* Heading */}
        <h2
          style={{
            margin: "0 0 12px",
            fontSize: "22px",
            fontWeight: 700,
            color: "#1e1541",
            lineHeight: 1.3,
          }}
        >
          Wait! Before you go...
        </h2>

        {/* Subtext */}
        <p
          style={{
            margin: "0 0 24px",
            fontSize: "15px",
            color: "#4b5563",
            lineHeight: 1.6,
          }}
        >
          Join thousands of freelancers and clients on SkillLinkup. Get
          notified about new opportunities.
        </p>

        {/* Email input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
          placeholder="Enter your email"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "11px 14px",
            fontSize: "15px",
            border: "1.5px solid #d1d5db",
            borderRadius: "8px",
            outline: "none",
            marginBottom: "16px",
            color: "#1e1541",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#ef2b70")}
          onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
        />

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={handleSubscribe}
            className="exit-subscribe-btn"
            style={{
              flex: 1,
              padding: "11px 16px",
              background: "#22c55e",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            Subscribe
          </button>

          <Link
            href="/register"
            className="exit-register-btn"
            style={{
              flex: 1,
              padding: "11px 16px",
              background: "transparent",
              color: "#1e1541",
              border: "1.5px solid #1e1541",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
            }}
          >
            Create Free Account
          </Link>
        </div>

        {/* No thanks */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={handleClose}
            className="exit-no-thanks"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              color: "#9ca3af",
              textDecoration: "underline",
              padding: 0,
              transition: "color 0.2s",
            }}
          >
            No thanks, I&apos;ll pass
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../convex/_generated/api";

export default function WaitlistButton({ className = "ud-btn btn-thm bdrs12 text-white" }) {
  const t = useTranslations("waitlist");
  const joinWaitlist = useMutation(api.waitlist.join);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      await joinWaitlist({ email: email.trim() });
      setDone(true);
      setEmail("");
    } catch (err) {
      setError(t("errorGeneric"));
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      setDone(false);
      setError("");
      setEmail("");
    }, 300);
  }

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {t("joinWaitlist")}
      </button>

      {open && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
          onClick={handleClose}
        >
          <div
            className="bg-white bdrs12 p40"
            style={{ width: "100%", maxWidth: 420, margin: "0 16px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {!done ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb20">
                  <p className="mb-0 fw600 fz17">{t("joinTheWaitlist")}</p>
                  <button type="button" className="btn-close" onClick={handleClose} />
                </div>
                <p className="fz14 text-muted mb25">
                  {t("description")}
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className="form-control mb15"
                    placeholder={t("placeholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                  {error && <p className="text-danger fz13 mb10">{error}</p>}
                  <button
                    type="submit"
                    className="ud-btn btn-thm w-100"
                    disabled={loading}
                  >
                    {loading ? t("submitting") : t("joinNow")}
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-3">
                <div className="mb20" style={{ fontSize: 48 }}>🎉</div>
                <p className="mb10 fw600 fz17">{t("successTitle")}</p>
                <p className="fz14 text-muted mb25">
                  {t("successDescription")}
                </p>
                <button className="ud-btn btn-thm" onClick={handleClose}>
                  {t("close")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

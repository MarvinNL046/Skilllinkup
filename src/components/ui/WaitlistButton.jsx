"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useTranslations, useLocale } from "next-intl";
import { api } from "../../../convex/_generated/api";

/**
 * Primary CTA for the pre-launch phase. Opens a modal with email, optional
 * skill, optional userType, and a hidden honeypot. Shows a live counter as
 * social proof. After success, shows a share prompt instead of a closable
 * "done" — the ask is: forward the welcome email you just got.
 *
 * Backed by Convex `api.waitlist.join` (inserts row + schedules welcome
 * email via the internal email action).
 */
export default function WaitlistButton({ className = "ud-btn btn-thm bdrs12 text-white" }) {
  const t = useTranslations("waitlist");
  const locale = useLocale();
  const joinWaitlist = useMutation(api.waitlist.join);
  const count = useQuery(api.waitlist.getCount);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [userType, setUserType] = useState("");
  const [trap, setTrap] = useState(""); // honeypot — must stay empty
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    // Very light client-side check — server does the real validation.
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      setError(t("errorInvalidEmail"));
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await joinWaitlist({
        email: trimmed,
        name: name.trim() || undefined,
        skill: skill.trim() || undefined,
        userType: userType || undefined,
        source: typeof window !== "undefined" ? window.location.pathname : undefined,
        locale,
        trap,
      });
      if (result?.success === false && result?.error === "invalid_email") {
        setError(t("errorInvalidEmail"));
        return;
      }
      setDone(true);
      setEmail("");
      setName("");
      setSkill("");
      setUserType("");
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
      setName("");
      setSkill("");
      setUserType("");
    }, 300);
  }

  const counterLabel = () => {
    if (count === undefined) return t("counterLoading");
    if (count === 1) return t("counterSingular", { count });
    return t("counterPlural", { count });
  };

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
            style={{ width: "100%", maxWidth: 460, margin: "0 16px", maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {!done ? (
              <>
                <div className="d-flex justify-content-between align-items-start mb15">
                  <div>
                    <p className="mb0 fw600 fz17">{t("headline")}</p>
                    <p className="mb0 fz12 text-muted mt5">{counterLabel()}</p>
                  </div>
                  <button type="button" className="btn-close" onClick={handleClose} />
                </div>
                <p className="fz14 text-muted mb20" style={{ lineHeight: 1.5 }}>
                  {t("description")}
                </p>
                <form onSubmit={handleSubmit} autoComplete="off">
                  {/* Honeypot — visually hidden, not tabbable, not autofilled. */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-10000px",
                      top: "auto",
                      width: 1,
                      height: 1,
                      overflow: "hidden",
                    }}
                  >
                    <label>
                      Leave this field empty
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={trap}
                        onChange={(e) => setTrap(e.target.value)}
                      />
                    </label>
                  </div>

                  <input
                    type="email"
                    className="form-control mb12"
                    placeholder={t("placeholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />

                  <label className="fz12 fw500 text-muted mb5 d-block">{t("userTypeLabel")}</label>
                  <select
                    className="form-select mb12"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="">{t("userTypeSkip")}</option>
                    <option value="freelancer">{t("userTypeFreelancer")}</option>
                    <option value="client">{t("userTypeClient")}</option>
                    <option value="both">{t("userTypeBoth")}</option>
                  </select>

                  <label className="fz12 fw500 text-muted mb5 d-block">{t("skillLabel")}</label>
                  <input
                    type="text"
                    className="form-control mb15"
                    placeholder={t("skillPlaceholder")}
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    maxLength={120}
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
                <p className="fz14 text-muted mb20">{t("successDescription")}</p>
                <p className="fz13 text-muted mb25" style={{ lineHeight: 1.5 }}>{t("successShare")}</p>
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

"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useTranslations, useLocale } from "next-intl";
import { X, ArrowRight, Check, Sparkles } from "lucide-react";
import { api } from "../../../convex/_generated/api";

/**
 * Primary CTA for the pre-launch phase. Redesigned 2026-04-24 against the
 * SkillLinkup Design System (tokens.css + components.css). Uses the
 * design-system button & modal classes rather than Bootstrap.
 */
export default function WaitlistButton({
  className = "btn btn--primary",
  label,
}) {
  const t = useTranslations("waitlist");
  const locale = useLocale();
  const joinWaitlist = useMutation(api.waitlist.join);
  const count = useQuery(api.waitlist.getCount);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [userType, setUserType] = useState("");
  const [trap, setTrap] = useState(""); // honeypot
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
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
        {label ?? t("joinWaitlist")}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: "oklch(22% 0.02 60 / 0.45)", backdropFilter: "blur(4px)" }}
          onClick={handleClose}
        >
          <div
            className="modal"
            style={{ maxWidth: 480 }}
            onClick={(e) => e.stopPropagation()}
          >
            {!done ? (
              <>
                <div className="modal__header">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className="flex items-center gap-1.5 mb-1"
                        style={{
                          fontSize: "var(--text-caption)",
                          fontWeight: 600,
                          color: "var(--secondary-700)",
                          textTransform: "uppercase",
                          letterSpacing: "var(--tracking-wider)",
                        }}
                      >
                        <Sparkles size={13} strokeWidth={2.2} />
                        <span>{counterLabel()}</span>
                      </div>
                      <h3 className="h3" style={{ margin: 0 }}>
                        {t("headline")}
                      </h3>
                    </div>
                    <button
                      type="button"
                      className="btn btn--ghost btn--icon btn--sm"
                      onClick={handleClose}
                      aria-label="Close"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="modal__body">
                  <p className="body-sm" style={{ color: "var(--text-secondary)", marginBottom: 20 }}>
                    {t("description")}
                  </p>

                  <form onSubmit={handleSubmit} autoComplete="off">
                    {/* Honeypot — visually hidden, not tabbable */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: -10000,
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

                    <div className="field" style={{ marginBottom: 12 }}>
                      <input
                        type="email"
                        className="input"
                        placeholder={t("placeholder")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>

                    <div className="field" style={{ marginBottom: 12 }}>
                      <label className="field__label">{t("userTypeLabel")}</label>
                      <select
                        className="input"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                      >
                        <option value="">{t("userTypeSkip")}</option>
                        <option value="freelancer">{t("userTypeFreelancer")}</option>
                        <option value="client">{t("userTypeClient")}</option>
                        <option value="both">{t("userTypeBoth")}</option>
                      </select>
                    </div>

                    <div className="field" style={{ marginBottom: 16 }}>
                      <label className="field__label">{t("skillLabel")}</label>
                      <input
                        type="text"
                        className="input"
                        placeholder={t("skillPlaceholder")}
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        maxLength={120}
                      />
                    </div>

                    {error && (
                      <p className="field__hint field__hint--error" style={{ marginBottom: 10 }}>
                        {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="btn btn--primary btn--lg"
                      style={{ width: "100%" }}
                      disabled={loading}
                    >
                      {loading ? t("submitting") : t("joinNow")}
                      <ArrowRight size={18} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="modal__body" style={{ textAlign: "center", paddingTop: "var(--space-7)" }}>
                <div
                  className="inline-flex items-center justify-center mb-4"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "var(--radius-full)",
                    background: "var(--secondary-50)",
                    color: "var(--secondary-700)",
                  }}
                >
                  <Check size={28} strokeWidth={2.4} />
                </div>
                <h3 className="h3" style={{ margin: "0 0 8px" }}>
                  {t("successTitle")}
                </h3>
                <p className="body-sm" style={{ color: "var(--text-secondary)", marginBottom: 16 }}>
                  {t("successDescription")}
                </p>
                <p
                  className="body-sm"
                  style={{
                    color: "var(--text-tertiary)",
                    lineHeight: "var(--leading-relaxed)",
                    marginBottom: 24,
                  }}
                >
                  {t("successShare")}
                </p>
                <button className="btn btn--secondary" onClick={handleClose}>
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

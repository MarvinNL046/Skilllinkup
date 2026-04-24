"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Mail, Clock, MapPin, ArrowRight } from "lucide-react";

/**
 * /contact form + contact-method summary on the SkillLinkup DS.
 * Uses .input class (sonner toast stack is themed via DS tokens).
 */
export default function ContactInfo1() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const t = useTranslations("contact");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !subject || !message.trim()) {
      toast.error(t("fillAllFields"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error(t("invalidEmail"));
      return;
    }

    setSending(true);
    const loadingToast = toast.loading(t("sendingMessage"));

    try {
      const res = await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      toast.dismiss(loadingToast);

      if (!res.ok) {
        throw new Error("Server responded with an error");
      }

      toast.success(t("messageSent"));
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      toast.dismiss(loadingToast);
      toast.error(t("sendFailed"));
    } finally {
      setSending(false);
    }
  }

  const contactFacts = [
    { icon: Mail, title: t("emailLabel"), value: "info@skilllinkup.com" },
    { icon: Clock, title: t("responseTime"), value: t("responseTimeDesc") },
    { icon: MapPin, title: t("location"), value: t("locationDesc") },
  ];

  const labelStyle = {
    display: "block",
    fontFamily: "var(--font-display)",
    fontSize: "var(--text-body-sm)",
    fontWeight: 500,
    color: "var(--text-primary)",
    marginBottom: "var(--space-2)",
  };

  return (
    <section style={{ padding: "var(--space-10) 0 var(--space-16)" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--space-10)",
          }}
        >
          {/* Left — contact facts */}
          <div>
            <div style={{ marginBottom: "var(--space-8)" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h2)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  margin: 0,
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("getInTouch")}
              </h2>
              <p className="body-md" style={{ color: "var(--text-secondary)", margin: 0 }}>
                {t("getInTouchDesc")}
              </p>
            </div>

            <div style={{ display: "grid", gap: "var(--space-5)" }}>
              {contactFacts.map(({ icon: Icon, title, value }) => (
                <div
                  key={title}
                  style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-4)" }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "var(--radius-md)",
                      background: "var(--primary-50)",
                      color: "var(--primary-600)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-h5)",
                        fontWeight: 500,
                        marginBottom: 2,
                      }}
                    >
                      {title}
                    </div>
                    <div className="body-md" style={{ color: "var(--text-secondary)" }}>
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div
            className="card"
            style={{
              padding: "var(--space-8)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                marginBottom: "var(--space-2)",
              }}
            >
              {t("sendUsMessage")}
            </h2>
            <p
              className="body-md"
              style={{ color: "var(--text-secondary)", marginBottom: "var(--space-6)" }}
            >
              {t("sendUsMessageDesc")}
            </p>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "var(--space-4)",
                  marginBottom: "var(--space-4)",
                }}
              >
                <div>
                  <label style={labelStyle}>{t("name")}</label>
                  <input
                    type="text"
                    className="input"
                    placeholder={t("namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{t("email")}</label>
                  <input
                    type="email"
                    className="input"
                    placeholder={t("emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "var(--space-4)" }}>
                <label style={labelStyle}>{t("subject")}</label>
                <select
                  className="input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="">{t("selectTopic")}</option>
                  <option value="general">{t("topicGeneral")}</option>
                  <option value="account">{t("topicAccount")}</option>
                  <option value="freelancer">{t("topicFreelancer")}</option>
                  <option value="client">{t("topicClient")}</option>
                  <option value="payment">{t("topicPayment")}</option>
                  <option value="partnership">{t("topicPartnership")}</option>
                  <option value="bug">{t("topicBug")}</option>
                </select>
              </div>

              <div style={{ marginBottom: "var(--space-6)" }}>
                <label style={labelStyle}>{t("message")}</label>
                <textarea
                  className="input"
                  rows={6}
                  placeholder={t("messagePlaceholder")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ minHeight: 140, resize: "vertical" }}
                />
              </div>

              <button
                type="submit"
                className="btn btn--primary btn--lg"
                disabled={sending}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {sending ? t("sending") : t("sendMessage")}
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { about, category, support } from "@/data/footer";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Linkedin, Instagram, Mail } from "lucide-react";
import { api } from "../../../convex/_generated/api";

/**
 * Footer — redesigned 2026-04-24 against the SkillLinkup Design System.
 * Newsletter sits up top with token-driven .input + .btn--primary.
 * The form pipes to Convex `waitlist.join` so any email captured from
 * the footer lands in the same source of truth as the hero CTA — no
 * parallel list to maintain.
 */
export default function Footer14() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const t = useTranslations("footer");
  const tw = useTranslations("waitlist");
  const locale = useLocale();
  const joinWaitlist = useMutation(api.waitlist.join);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error(tw("errorInvalidEmail"));
      return;
    }
    setLoading(true);
    try {
      await joinWaitlist({
        email: email.trim(),
        source: "footer-newsletter",
        locale,
      });
      toast.success(tw("successTitle"));
      setEmail("");
    } catch {
      toast.error(tw("errorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg-sunken)",
        borderTop: "1px solid var(--border-subtle)",
        marginTop: "var(--space-24)",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: "var(--container-xl)", padding: "var(--space-16) var(--space-6)" }}
      >
        {/* Newsletter block */}
        <div
          style={{
            display: "grid",
            gap: "var(--space-8)",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            alignItems: "center",
            paddingBottom: "var(--space-12)",
            marginBottom: "var(--space-12)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div>
            <h3 className="h3" style={{ margin: 0, marginBottom: "var(--space-2)" }}>
              {t("subscribe")}
            </h3>
            <p className="body-sm" style={{ color: "var(--text-secondary)", margin: 0 }}>
              {tw("description")}
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            style={{ display: "flex", gap: "var(--space-2)", alignItems: "stretch" }}
          >
            <input
              type="email"
              className="input"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ flex: 1 }}
            />
            <button
              type="submit"
              className="btn btn--primary"
              disabled={loading}
              style={{ flexShrink: 0 }}
            >
              {loading ? tw("submitting") : tw("joinNow")}
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* Link columns + brand */}
        <div
          style={{
            display: "grid",
            gap: "var(--space-8)",
            gridTemplateColumns: "2fr repeat(3, 1fr)",
          }}
          className="footer-columns"
        >
          <div>
            <Link
              href="/"
              style={{ display: "inline-block", marginBottom: "var(--space-4)" }}
              aria-label="SkillLinkup home"
            >
              <Image
                width={156}
                height={36}
                src="/images/logo/skilllinkup-transparant-rozepunt.webp"
                alt="SkillLinkup"
              />
            </Link>
            <p
              className="body-sm"
              style={{
                color: "var(--text-secondary)",
                maxWidth: 380,
                margin: 0,
                marginBottom: "var(--space-4)",
              }}
            >
              {t("tagline") ||
                "SkillLinkup — where freelancers, local professionals and clients meet."}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="mailto:info@skilllinkup.com"
                className="btn btn--ghost btn--icon btn--sm"
                aria-label="Email us"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://linkedin.com/company/skilllinkup"
                className="btn btn--ghost btn--icon btn--sm"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://instagram.com/skilllinkup"
                className="btn btn--ghost btn--icon btn--sm"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <FooterColumn title={t("aboutUs")} items={about} />
          <FooterColumn title={t("categories")} items={category} />
          <FooterColumn title={t("support")} items={support} />
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-4)",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "var(--space-8)",
            marginTop: "var(--space-12)",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <p className="caption" style={{ margin: 0 }}>
            © {year} SkillLinkup. {t("allRightsReserved")}
          </p>
          <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
            <Link href="/terms" className="caption" style={{ textDecoration: "none", color: "var(--text-tertiary)" }}>
              Terms
            </Link>
            <Link href="/privacy-policy" className="caption" style={{ textDecoration: "none", color: "var(--text-tertiary)" }}>
              Privacy
            </Link>
            <Link href="/cookie-policy" className="caption" style={{ textDecoration: "none", color: "var(--text-tertiary)" }}>
              Cookies
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.footer-columns) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 520px) {
          :global(.footer-columns) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h6
        className="overline"
        style={{ margin: 0, marginBottom: "var(--space-4)", color: "var(--text-secondary)" }}
      >
        {title}
      </h6>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.path}
              className="body-sm"
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color var(--dur-base) var(--ease-standard)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

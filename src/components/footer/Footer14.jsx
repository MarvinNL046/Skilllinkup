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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <footer className="bg-[var(--bg-sunken)] border-t border-[var(--border-subtle)] mt-24">
      <div className="container max-w-screen-xl mx-auto px-6 py-16">
        {/* Newsletter block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-12 mb-12 border-b border-[var(--border-subtle)]">
          <div>
            <h3 className="text-2xl font-semibold mb-2">{t("subscribe")}</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-0">
              {tw("description")}
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-2 items-stretch">
            <Input
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={loading} className="flex-shrink-0">
              {loading ? tw("submitting") : tw("joinNow")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Link columns + brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8">
          <div>
            <Link
              href="/"
              className="inline-block mb-4"
              aria-label="SkillLinkup home"
            >
              <Image
                width={156}
                height={36}
                src="/images/logo/skilllinkup-transparant-rozepunt.webp"
                alt="SkillLinkup"
              />
            </Link>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm mb-4">
              {t("tagline") ||
                "SkillLinkup — where freelancers, local professionals and clients meet."}
            </p>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="icon" aria-label="Email us">
                <a href="mailto:info@skilllinkup.com">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
                <a
                  href="https://linkedin.com/company/skilllinkup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" aria-label="Instagram">
                <a
                  href="https://instagram.com/skilllinkup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <FooterColumn title={t("aboutUs")} items={about} />
          <FooterColumn title={t("categories")} items={category} />
          <FooterColumn title={t("support")} items={support} />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap gap-4 justify-between items-center pt-8 mt-12 border-t border-[var(--border-subtle)]">
          <p className="text-xs text-[var(--text-tertiary)] mb-0">
            © {year} SkillLinkup. {t("allRightsReserved")}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/terms"
              className="text-xs text-[var(--text-tertiary)] hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="/privacy-policy"
              className="text-xs text-[var(--text-tertiary)] hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/cookie-policy"
              className="text-xs text-[var(--text-tertiary)] hover:text-foreground"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h6 className="text-xs uppercase tracking-wider font-semibold text-[var(--text-secondary)] mb-4">
        {title}
      </h6>
      <ul className="list-none p-0 m-0 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.path}
              className="text-sm text-[var(--text-secondary)] hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { trackConversion } from '@/lib/analytics';

export function Newsletter() {
  const t = useTranslations('homepage.newsletter');

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(t('successMessage'));
        setEmail("");
        // Track successful newsletter signup
        trackConversion('newsletter_signup', {
          location: 'newsletter_section',
        });
      } else {
        setStatus("error");
        setMessage(data.message || t('errorMessage'));
      }
    } catch (error) {
      setStatus("error");
      setMessage(t('failedMessage'));
    }
  };

  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Heading */}
          <h2 className="mb-4 text-3xl font-heading font-bold text-white sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mb-8 text-base text-white/90 sm:text-lg">
            {t('description')}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder')}
                required
                disabled={status === "loading"}
                className="flex-1 rounded-lg border-0 bg-white px-5 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 shadow-lg"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-lg bg-secondary hover:bg-secondary-medium px-8 py-3 font-heading font-semibold text-white focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
              >
                {status === "loading" ? t('loading') : t('subscribe')}
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <p
                className={`mt-4 text-sm font-medium ${
                  status === "success"
                    ? "text-white"
                    : "text-white/90"
                }`}
              >
                {message}
              </p>
            )}

            {/* Trust Badge */}
            <p className="mt-4 text-sm text-white/80">
              {t('trustBadge')}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

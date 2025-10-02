"use client";

import { useState } from "react";

export function Newsletter() {
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
        setMessage("Thanks for subscribing! Check your email to confirm.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again later.");
    }
  };

  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Icon */}
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10">
            <svg
              className="h-8 w-8 text-primary-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl">
            Get Weekly Freelance Tips
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/90">
            Join 1,000+ freelancers who receive our weekly newsletter with platform
            reviews, success stories, and insider tips.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === "loading"}
                className="flex-1 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-md bg-background px-6 py-3 font-medium text-foreground shadow-lg hover:bg-background/90 focus:outline-none focus:ring-2 focus:ring-background/20 disabled:opacity-50 transition-all"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <p
                className={`mt-4 text-sm ${
                  status === "success"
                    ? "text-primary-foreground"
                    : "text-red-200"
                }`}
              >
                {message}
              </p>
            )}

            {/* Trust Badge */}
            <p className="mt-4 text-sm text-primary-foreground/70">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

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
    <section className="bg-gradient-to-r from-primary to-primary-dark py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Heading */}
          <h2 className="mb-4 text-3xl font-heading font-bold text-white sm:text-4xl">
            Get Weekly Freelance Tips
          </h2>
          <p className="mb-8 text-base text-white/90 sm:text-lg">
            Join 1,000+ freelancers receiving weekly platform reviews and insider tips.
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
                className="flex-1 rounded-lg border-0 bg-white px-5 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 shadow-lg"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-lg bg-secondary hover:bg-secondary-medium px-8 py-3 font-heading font-semibold text-white focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
              >
                {status === "loading" ? "..." : "Subscribe"}
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
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

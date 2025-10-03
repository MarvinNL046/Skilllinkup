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
    <section className="bg-blue-600 dark:bg-blue-700 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Heading */}
          <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
            Get Weekly Freelance Tips
          </h2>
          <p className="mb-6 text-sm text-blue-100 sm:text-base">
            Join 1,000+ freelancers receiving weekly platform reviews and insider tips.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === "loading"}
                className="flex-1 rounded-lg border-0 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-lg bg-gray-900 px-6 py-2.5 font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 transition-colors"
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <p
                className={`mt-3 text-sm ${
                  status === "success"
                    ? "text-white font-medium"
                    : "text-red-100"
                }`}
              >
                {message}
              </p>
            )}

            {/* Trust Badge */}
            <p className="mt-3 text-xs text-blue-100">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useTranslations } from "next-intl";
import { UserCheck, Handshake, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    Icon: UserCheck,
    titleKey: "step1Title",
    descKey: "step1Desc",
    fallbackTitle: "Show your skill",
    fallbackDesc:
      "Join the waitlist and tell us what you offer — design, development, writing, whatever you're great at.",
    tone: "primary",
  },
  {
    Icon: Handshake,
    titleKey: "step2Title",
    descKey: "step2Desc",
    fallbackTitle: "We build the match",
    fallbackDesc:
      "We assemble the network before going live — so day one has real freelancers, real clients, real demand.",
    tone: "secondary",
  },
  {
    Icon: Rocket,
    titleKey: "step3Title",
    descKey: "step3Desc",
    fallbackTitle: "Launch together",
    fallbackDesc:
      "When we hit critical mass, everyone on the waitlist gets the launch email. No marketing spam in between.",
    tone: "primary",
  },
];

export default function NeedSomething2() {
  const t = useTranslations("howItWorks");

  return (
    <section className="py-24">
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs uppercase tracking-wider font-semibold text-primary mb-3">
            {t("eyebrow", { default: "How it works" })}
          </span>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight max-w-3xl mx-auto">
            {t("title", { default: "A platform built network-first." })}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto mt-4">
            {t("subtitle", {
              default:
                "We're not pretending to be live yet. Here's what happens between now and launch.",
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STEPS.map((step, i) => {
            const toneClass =
              step.tone === "primary"
                ? "bg-primary/10 text-primary"
                : "bg-secondary/20 text-secondary-700";
            return (
              <Card key={i}>
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={cn(
                        "inline-flex items-center justify-center h-12 w-12 rounded-md",
                        toneClass
                      )}
                    >
                      <step.Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <span
                      className="text-3xl font-semibold leading-none text-[var(--text-tertiary)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium tracking-tight m-0">
                    {t(step.titleKey, { default: step.fallbackTitle })}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0">
                    {t(step.descKey, { default: step.fallbackDesc })}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

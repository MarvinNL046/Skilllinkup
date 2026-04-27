"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Award, DollarSign, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    Icon: Award,
    title: "Proof of quality",
    description:
      "Check any pro's work samples, client reviews, and identity verification.",
  },
  {
    Icon: DollarSign,
    title: "No cost until you hire",
    description:
      "Interview potential fits for your job, negotiate rates, and only pay for work you approve.",
  },
  {
    Icon: ShieldCheck,
    title: "Safe and secure",
    description:
      "Focus on your work knowing we help protect your data and privacy. We're here with 24/7 support if you need it.",
  },
];

export default function CtaBanner1() {
  const path = usePathname();
  const bgClass =
    path === "/" || path === "/about-1"
      ? "bg-warning/10"
      : path === "/become-seller"
      ? "bg-secondary/20"
      : "";

  return (
    <section>
      <div
        className={cn(
          "mx-auto max-w-screen-2xl pt-20 lg:pt-32 pb-16 lg:pb-24 relative overflow-hidden",
          bgClass
        )}
      >
        <div className="container">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-5">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                A whole world of freelance talent at your fingertips
              </h2>
              <div className="space-y-6">
                {FEATURES.map(({ Icon, title, description }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold mb-1">{title}</h4>
                      <p className="text-sm text-[var(--text-secondary)] mb-0">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Image
          height={500}
          width={500}
          className="absolute right-0 top-0 h-full w-auto object-cover hidden xl:block opacity-90"
          src="/images/about/about-5.jpg"
          alt="cta banner"
        />
      </div>
    </section>
  );
}

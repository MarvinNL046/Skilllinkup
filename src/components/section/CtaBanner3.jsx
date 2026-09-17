import Image from "next/image";
import { BadgeCheck, DollarSign, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: BadgeCheck,
    title: "Compare with context",
    body: "Review a professional's work samples, experience and scope before you start a conversation.",
  },
  {
    icon: DollarSign,
    title: "Free during the private beta",
    body: "There are no platform fees in the beta and Skilllinkup does not process payments. You agree on scope and price directly.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by default",
    body: "You choose what your profile shares. If something needs attention, contact our support team by email.",
  },
];

export default function CtaBanner3() {
  return (
    <section className="py-14">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-7">
              A whole world of freelance talent at your fingertips
            </h2>
            <div className="space-y-6">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary flex-shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-medium mb-1">{title}</div>
                    <p className="text-base text-[var(--text-secondary)] mb-0">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Image
              height={700}
              width={700}
              className="w-full h-auto rounded-3xl"
              src="/images/about/about-6.png"
              alt="Diverse freelancers collaborating remotely on laptops and screens"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import { Grid3x3, UserPlus, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const STEPS = [
  {
    icon: Grid3x3,
    title: "Compare platforms",
    body: "Browse our reviews of 19+ freelance platforms. Find the one that matches your skills and goals.",
  },
  {
    icon: UserPlus,
    title: "Create your profile",
    body: "Sign up, showcase your portfolio, and list your services. Let clients discover what you can do.",
  },
  {
    icon: ShieldCheck,
    title: "Get paid securely",
    body: "Work with confidence. Our escrow system ensures you get paid for every completed project.",
  },
];

export default function CtaBanner4() {
  return (
    <section className="py-14">
      <div className="container">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs uppercase tracking-wider font-semibold text-primary">
            How it works
          </span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mt-2 mb-3">
            Get started in three simple steps
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <Card key={title} className="relative">
              <CardContent className="p-7">
                <div
                  className="absolute top-5 right-6 text-4xl font-medium leading-none text-[var(--surface-2)]"
                  style={{ fontFamily: "var(--font-display)" }}
                  aria-hidden="true"
                >
                  0{i + 1}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary mb-5">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium tracking-tight mb-3">{title}</h3>
                <p className="text-base text-[var(--text-secondary)] mb-0">{body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

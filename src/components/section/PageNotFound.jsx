"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PageNotFound() {
  const t = useTranslations("errorPages");

  return (
    <section
      className="py-16 flex items-center"
      style={{ minHeight: "calc(100vh - 240px)" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-center">
            <Image
              height={500}
              width={500}
              className="w-full h-auto max-w-md mx-auto"
              src="/images/icon/error-page-img.svg"
              alt=""
            />
          </div>

          <div>
            <div
              className="font-medium leading-none tracking-tight mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(5rem, 10vw, 8rem)",
              }}
            >
              40<span className="text-primary">4</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-medium mb-3">
              {t("notFoundTitle")}
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mb-6">
              {t("notFoundDescription")}
            </p>
            <Button asChild size="lg">
              <Link href="/">
                {t("goBackHome")}
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

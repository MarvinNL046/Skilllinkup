"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import PayoutForm from "../element/PayoutForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const METHODS = ["Paypal", "Bank Transfer", "Payoneer"];

export default function PaymentMethod() {
  const t = useTranslations("payouts");
  const [methodSelect, setMethodSelect] = useState("Paypal");

  return (
    <div className="space-y-6">
      <div>
        <h5 className="text-lg font-semibold pb-4 border-b border-[var(--border-subtle)]">
          {t("payoutMethods")}
        </h5>
      </div>

      <div className="space-y-2 max-w-md">
        <Label htmlFor="payout-method">{t("selectDefaultMethod")}</Label>
        <Select value={methodSelect} onValueChange={setMethodSelect}>
          <SelectTrigger id="payout-method">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {METHODS.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <h5 className="text-lg font-semibold mb-4">{t("payoutDetails")}</h5>
        <div
          role="tablist"
          aria-label={t("payoutDetails")}
          className="flex flex-wrap gap-1 mb-6 border-b border-[var(--border-subtle)]"
        >
          {METHODS.map((item) => {
            const active = methodSelect === item;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMethodSelect(item)}
                className={cn(
                  "px-4 py-3 text-sm font-medium border-b-2 transition-colors min-h-[44px]",
                  active
                    ? "border-primary text-primary"
                    : "border-transparent text-[var(--text-secondary)] hover:text-foreground"
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
        {(methodSelect === "Paypal" ||
          methodSelect === "Bank Transfer" ||
          methodSelect === "Payoneer") && <PayoutForm />}
      </div>
    </div>
  );
}

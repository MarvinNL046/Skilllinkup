"use client";

import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

export default function PayoutForm() {
  const t = useTranslations("payouts");

  function handleSave(e) {
    e.preventDefault();
    toast.success(t("payoutSaved"));
  }

  const FIELDS = [
    { id: "bank-name", label: t("bankName"), placeholder: t("bankNamePlaceholder") },
    {
      id: "bank-account",
      label: t("bankAccountNumber"),
      placeholder: t("bankAccountPlaceholder"),
    },
    {
      id: "account-holder",
      label: t("accountHolderName"),
      placeholder: t("accountHolderPlaceholder"),
    },
    {
      id: "routing",
      label: t("routingNumber"),
      placeholder: t("routingPlaceholder"),
    },
    { id: "iban", label: t("bankIBAN"), placeholder: t("ibanPlaceholder") },
    { id: "swift", label: t("swiftCode"), placeholder: t("swiftPlaceholder") },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {FIELDS.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input id={field.id} placeholder={field.placeholder} />
          </div>
        ))}
      </div>
      <div>
        <Button type="submit">
          {t("saveDetail")}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

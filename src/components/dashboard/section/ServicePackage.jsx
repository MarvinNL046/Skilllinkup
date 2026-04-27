"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Pencil } from "lucide-react";

const TIERS = [
  { id: "basic", name: "Basic", description: "I will redesign your current landing page or create one for you (upto 4 sections)" },
  { id: "standard", name: "Standard", description: "4 High Quality Desktop Pages." },
  { id: "premium", name: "Premium", description: "4 High Quality Desktop and Mobile Pages." },
];

const ROWS = [
  { feature: "Source file", values: { basic: { type: "check", checked: false }, standard: { type: "check", checked: true }, premium: { type: "check", checked: true } } },
  { feature: "Prototype", values: { basic: { type: "check", checked: false }, standard: { type: "check", checked: true }, premium: { type: "check", checked: true } } },
  { feature: "Responsive design", values: { basic: { type: "check", checked: false }, standard: { type: "check", checked: true }, premium: { type: "check", checked: true } } },
  { feature: "Number of pages", values: { basic: { type: "value", text: "2" }, standard: { type: "value", text: "4" }, premium: { type: "value", text: "6" } } },
  { feature: "Revisions", values: { basic: { type: "value", text: "1" }, standard: { type: "value", text: "3" }, premium: { type: "value", text: "5" } } },
  { feature: "Delivery Time", values: { basic: { type: "value", text: "2 Days" }, standard: { type: "value", text: "3 Days" }, premium: { type: "value", text: "4 Days" } } },
  { feature: "Total", values: { basic: { type: "value", text: "$29" }, standard: { type: "value", text: "$49" }, premium: { type: "value", text: "$89" } } },
];

function CellEdit({ children }) {
  return (
    <span className="flex items-center justify-between gap-2">
      {children}
      <button
        type="button"
        aria-label="Edit"
        className="text-[var(--text-tertiary)] hover:text-foreground"
      >
        <Pencil className="h-4 w-4" />
      </button>
    </span>
  );
}

export default function ServicePackage() {
  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
        <CardTitle className="text-lg font-semibold">Packages</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="max-w-5xl">
          <div className="rounded-md border border-[var(--border-subtle)] mb-6 overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[var(--border-subtle)]">
                <tr>
                  <th className="p-4 text-left" />
                  {TIERS.map((tier) => (
                    <th key={tier.id} scope="col" className="p-4 text-left min-w-[180px]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-semibold">{tier.name}</span>
                        <button
                          type="button"
                          aria-label={`Edit ${tier.name}`}
                          className="text-[var(--text-tertiary)] hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm font-normal text-[var(--text-secondary)]">
                        {tier.description}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={
                      idx % 2 === 0 ? "bg-[var(--surface-2)]/50" : ""
                    }
                  >
                    <th
                      scope="row"
                      className="p-4 text-left font-medium text-sm whitespace-nowrap"
                    >
                      {row.feature}
                    </th>
                    {TIERS.map((tier) => {
                      const cell = row.values[tier.id];
                      return (
                        <td key={tier.id} className="p-4 text-sm">
                          {cell.type === "check" ? (
                            <Checkbox defaultChecked={cell.checked} />
                          ) : (
                            <CellEdit>{cell.text}</CellEdit>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button>
            Save
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

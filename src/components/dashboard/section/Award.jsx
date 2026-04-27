"use client";
import { Tooltip } from "react-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ArrowRight } from "lucide-react";

const awards = [
  {
    id: 1,
    period: "2012 - 2014",
    title: "UI UX Design",
    org: "Udemy",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
  },
  {
    id: 2,
    period: "2008 - 2012",
    title: "App Design",
    org: "Google",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
  },
];

export default function Award() {
  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="border-b border-[var(--border-subtle)] pb-4 sm:flex sm:flex-row sm:items-center sm:justify-between space-y-0">
        <CardTitle className="text-lg font-semibold">Awards</CardTitle>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <Plus className="h-4 w-4" />
          Add Awards
        </button>
      </CardHeader>
      <CardContent className="pt-6 space-y-8">
        {awards.map((award) => (
          <div key={award.id} className="relative">
            <div className="absolute right-0 top-0 flex gap-2">
              <button
                type="button"
                id={`award-edit-${award.id}`}
                aria-label="Edit award"
                className="text-[var(--text-tertiary)] hover:text-foreground"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <Tooltip anchorSelect={`#award-edit-${award.id}`}>Edit</Tooltip>
              <button
                type="button"
                id={`award-delete-${award.id}`}
                aria-label="Delete award"
                className="text-[var(--text-tertiary)] hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <Tooltip anchorSelect={`#award-delete-${award.id}`}>Delete</Tooltip>
            </div>
            <Badge variant="muted" className="mb-2">
              {award.period}
            </Badge>
            <h5 className="text-base font-semibold mt-2">{award.title}</h5>
            <h6 className="text-sm text-primary font-medium mt-1">{award.org}</h6>
            <p className="text-sm text-[var(--text-secondary)] mt-2 mb-0">
              {award.description}
            </p>
          </div>
        ))}
        <div>
          <Button asChild>
            <a href="#">
              Save
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

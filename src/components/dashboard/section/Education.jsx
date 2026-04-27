"use client";
import { Tooltip } from "react-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ArrowRight, GraduationCap } from "lucide-react";

const educationItems = [
  {
    id: 1,
    period: "2012 - 2014",
    title: "Bachlors in Fine Arts",
    school: "Modern College",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
  },
  {
    id: 2,
    period: "2008 - 2012",
    title: "Computer Science",
    school: "Harvartd University",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
  },
];

export default function Education() {
  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="border-b border-[var(--border-subtle)] pb-4 sm:flex sm:flex-row sm:items-center sm:justify-between space-y-0">
        <CardTitle className="text-lg font-semibold">Education</CardTitle>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </button>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {educationItems.map((item) => (
          <div key={item.id} className="relative flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="absolute right-0 top-0 flex gap-2">
                <button
                  type="button"
                  id={`edu-edit-${item.id}`}
                  aria-label="Edit"
                  className="text-[var(--text-tertiary)] hover:text-foreground"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <Tooltip anchorSelect={`#edu-edit-${item.id}`}>Edit</Tooltip>
                <button
                  type="button"
                  id={`edu-delete-${item.id}`}
                  aria-label="Delete"
                  className="text-[var(--text-tertiary)] hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <Tooltip anchorSelect={`#edu-delete-${item.id}`}>Delete</Tooltip>
              </div>
              <Badge variant="muted">{item.period}</Badge>
              <h5 className="text-base font-semibold mt-2">{item.title}</h5>
              <h6 className="text-sm text-primary font-medium mt-1">{item.school}</h6>
              <p className="text-sm text-[var(--text-secondary)] mt-2 mb-0">
                {item.description}
              </p>
            </div>
          </div>
        ))}
        <div>
          <Button>
            Save
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";
import { useState } from "react";
import SelectInput from "../option/SelectInput";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SKILL_ROWS = [
  {
    skillKey: "skill1",
    pointKey: "point1",
    skillLabel: "Skills 1",
    skillDefault: { option: "Designer", value: null },
    pointDefault: { option: "80", value: null },
    skillData: [
      { option: "Designer", value: "designer" },
      { option: "UI/UX", value: "ui-ux" },
    ],
    pointData: [
      { option: "80", value: "80" },
      { option: "90", value: "90" },
    ],
  },
  {
    skillKey: "skill2",
    pointKey: "point2",
    skillLabel: "Skills 2",
    skillDefault: { option: "Developer", value: null },
    pointDefault: { option: "70", value: null },
    skillData: [
      { option: "Developer", value: "developer" },
      { option: "Programmer", value: "programmer" },
    ],
    pointData: [
      { option: "70", value: "70" },
      { option: "80", value: "80" },
    ],
  },
  {
    skillKey: "skill3",
    pointKey: "point3",
    skillLabel: "Skills 3",
    skillDefault: { option: "Video Editor", value: null },
    pointDefault: { option: "75", value: null },
    skillData: [
      { option: "Video Editor", value: "video-editor" },
      { option: "Programmer", value: "programmer" },
    ],
    pointData: [
      { option: "75", value: "75" },
      { option: "80", value: "80" },
    ],
  },
];

export default function Skill() {
  const [state, setState] = useState(() => {
    const init = {};
    for (const row of SKILL_ROWS) {
      init[row.skillKey] = row.skillDefault;
      init[row.pointKey] = row.pointDefault;
    }
    return init;
  });

  const setField = (key) => (option, value) =>
    setState((prev) => ({ ...prev, [key]: { option, value } }));

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
        <CardTitle className="text-lg font-semibold">Skills</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 max-w-3xl">
        <form className="space-y-5">
          {SKILL_ROWS.map((row) => (
            <div key={row.skillKey} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectInput
                label={row.skillLabel}
                defaultSelect={state[row.skillKey]}
                data={row.skillData}
                handler={setField(row.skillKey)}
              />
              <SelectInput
                label="Point"
                defaultSelect={state[row.pointKey]}
                data={row.pointData}
                handler={setField(row.pointKey)}
              />
            </div>
          ))}
          <div>
            <Button asChild>
              <Link href="/contact">
                Save
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

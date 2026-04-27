"use client";
import { useState } from "react";
import SelectInput from "../option/SelectInput";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  { option: "Select", value: "select" },
  { option: "Graphics & Design", value: "graphics-design" },
  { option: "Digital Marketing", value: "digital-marketing" },
  { option: "Writing & Translation", value: "writing-translation" },
  { option: "Video & Animation", value: "video-animation" },
  { option: "Music & Audio", value: "music-audio" },
  { option: "Programming & Tech", value: "programming-tech" },
  { option: "Business", value: "business" },
  { option: "Lifestyle", value: "lifestyle" },
  { option: "Trending", value: "trending" },
];

const FREE_TYPES = [
  { option: "Select", value: "select" },
  { option: "Full Time", value: "full-time" },
  { option: "Part Time", value: "part-time" },
  { option: "Project Based", value: "project-base" },
  { option: "Other", value: "other" },
];

const PRICE_TYPES = [
  { option: "Select", value: "select" },
  { option: "Low($)", value: "low" },
  { option: "Mid($$)", value: "mid" },
  { option: "High($$$)", value: "high" },
];

const DURATIONS = [
  { option: "Select", value: "select" },
  { option: "1 Day", value: "1-day" },
  { option: "2 Day", value: "2-day" },
  { option: "3 Day", value: "3-day" },
  { option: "1 Week", value: "1-week" },
];

const LEVELS = [
  { option: "Select", value: "select" },
  { option: "Entry Level", value: "entry-level" },
  { option: "Standard Level", value: "standard-level" },
  { option: "Expert Level", value: "expert-level" },
];

const COUNTRIES = [
  { option: "United States", value: "usa" },
  { option: "Canada", value: "canada" },
  { option: "United Kingdom", value: "uk" },
  { option: "Australia", value: "australia" },
  { option: "Germany", value: "germany" },
  { option: "Japan", value: "japan" },
];

const CITIES = [
  { option: "New York", value: "new-york" },
  { option: "Toronto", value: "toronto" },
  { option: "London", value: "london" },
  { option: "Sydney", value: "sydney" },
  { option: "Berlin", value: "berlin" },
  { option: "Tokyo", value: "tokyo" },
];

const LANGUAGES = [
  { option: "English", value: "english" },
  { option: "French", value: "french" },
  { option: "German", value: "german" },
  { option: "Japanese", value: "japanese" },
];

const LAN_LEVELS = [
  { option: "Beginner", value: "beginner" },
  { option: "Intermediate", value: "intermediate" },
  { option: "Advanced", value: "advanced" },
  { option: "Fluent", value: "fluent" },
];

const SKILLS = [
  { option: "Select", value: "select" },
  { option: "Figma", value: "figma" },
  { option: "Adobe XD", value: "adobe-xd" },
  { option: "CSS", value: "css" },
  { option: "HTML", value: "html" },
  { option: "Bootstrap", value: "bootstrap" },
];

export default function BasicInformation2() {
  const [state, setState] = useState({
    category: { option: "Select", value: "select" },
    freeType: { option: "Select", value: "select" },
    priceType: { option: "Select", value: "select" },
    projectDuration: { option: "Select", value: "select" },
    level: { option: "Select", value: "select" },
    country: { option: "United States", value: "usa" },
    city: { option: "New York", value: "new-york" },
    language: { option: "Select", value: null },
    lanLevel: { option: "Select", value: null },
    skill: { option: "Nothing selected", value: null },
  });

  const setField = (key) => (option, value) =>
    setState((prev) => ({ ...prev, [key]: { option, value } }));

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
        <CardTitle className="text-lg font-semibold">Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 max-w-4xl">
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input id="title" placeholder="i will" />
          </div>
          <SelectInput
            label="Category"
            defaultSelect={state.category}
            handler={setField("category")}
            data={CATEGORIES}
          />
          <SelectInput
            label="Freelancer Type"
            defaultSelect={state.freeType}
            handler={setField("freeType")}
            data={FREE_TYPES}
          />
          <SelectInput
            label="Price type"
            defaultSelect={state.priceType}
            handler={setField("priceType")}
            data={PRICE_TYPES}
          />
          <div className="space-y-2">
            <Label htmlFor="cost">Cost</Label>
            <Input id="cost" placeholder="$" />
          </div>
          <SelectInput
            label="Project Duration"
            defaultSelect={state.projectDuration}
            handler={setField("projectDuration")}
            data={DURATIONS}
          />
          <SelectInput
            label="Level"
            defaultSelect={state.level}
            handler={setField("level")}
            data={LEVELS}
          />
          <SelectInput
            label="Country"
            defaultSelect={state.country}
            handler={setField("country")}
            data={COUNTRIES}
          />
          <SelectInput
            label="City"
            defaultSelect={state.city}
            handler={setField("city")}
            data={CITIES}
          />
          <SelectInput
            label="Language"
            defaultSelect={state.language}
            handler={setField("language")}
            data={LANGUAGES}
          />
          <SelectInput
            label="Languages Level"
            defaultSelect={state.lanLevel}
            handler={setField("lanLevel")}
            data={LAN_LEVELS}
          />
          <div className="sm:col-span-2">
            <SelectInput
              label="Skills"
              defaultSelect={state.skill}
              handler={setField("skill")}
              data={SKILLS}
            />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="project-detail">Project Detail</Label>
            <Textarea id="project-detail" rows={6} placeholder="Description" />
          </div>
          <div className="sm:col-span-2">
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

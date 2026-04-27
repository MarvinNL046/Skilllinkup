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

const ENG_LEVELS = [
  { option: "Select", value: "select" },
  { option: "Fluent", value: "fluent" },
  { option: "Mid Level", value: "mid-level" },
  { option: "Conversational", value: "conversational" },
  { option: "Other", value: "other" },
];

const RES_TIMES = [
  { option: "Select", value: "select" },
  { option: "Response Time One", value: "response-time-one" },
  { option: "Response Time Two", value: "response-time-two" },
  { option: "Response Time Three", value: "response-time-three" },
];

const DELIVERY_TIMES = [
  { option: "Select", value: "select" },
  { option: "Delivery Time One", value: "delivery-time-one" },
  { option: "Delivery Time Two", value: "delivery-time-two" },
  { option: "Delivery Time Three", value: "delivery-time-three" },
];

const SKILLS = [
  { option: "Select", value: "select" },
  { option: "Figma", value: "figma" },
  { option: "Adobe XD", value: "adobe-xd" },
  { option: "CSS", value: "css" },
  { option: "HTML", value: "html" },
  { option: "Bootstrap", value: "bootstrap" },
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

export default function BasicInformation() {
  const [state, setState] = useState({
    category: { option: "Select", value: "select" },
    engLevel: { option: "Select", value: "select" },
    resTime: { option: "Select", value: "select" },
    deliveryTime: { option: "Select", value: "select" },
    skill: { option: "Nothing selected", value: null },
    country: { option: "United States", value: "usa" },
    city: { option: "New York", value: "new-york" },
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
          <div className="space-y-2">
            <Label htmlFor="title">Service Title</Label>
            <Input id="title" placeholder="i will" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" placeholder="$10" />
          </div>
          <SelectInput
            label="Category"
            defaultSelect={state.category}
            handler={setField("category")}
            data={CATEGORIES}
          />
          <SelectInput
            label="English Level"
            defaultSelect={state.engLevel}
            handler={setField("engLevel")}
            data={ENG_LEVELS}
          />
          <SelectInput
            label="Response Time"
            defaultSelect={state.resTime}
            handler={setField("resTime")}
            data={RES_TIMES}
          />
          <SelectInput
            label="Delivery Time"
            defaultSelect={state.deliveryTime}
            handler={setField("deliveryTime")}
            data={DELIVERY_TIMES}
          />
          <div className="sm:col-span-2">
            <SelectInput
              label="Skills"
              defaultSelect={state.skill}
              handler={setField("skill")}
              data={SKILLS}
            />
          </div>
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
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="services-detail">Services Detail</Label>
            <Textarea id="services-detail" rows={6} placeholder="Description" />
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

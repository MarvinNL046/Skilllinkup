"use client";
import { useState } from "react";
import HeroSearch1 from "../element/HeroSearch1";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ROLES = [
  { value: "any", label: "City, state, or zip" },
  { value: "miami", label: "Miami" },
  { value: "new-york", label: "New York" },
];

export default function Breadcumb14() {
  const [selectedRole, setSelectedRole] = useState("any");

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl mx-4 lg:mx-5 px-6 lg:px-8 pt-16 sm:pt-32 pb-16 sm:pb-32 rounded-2xl relative flex items-center bg-[var(--surface-2)] overflow-hidden">
        <Image
          height={300}
          width={532}
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block opacity-80 pointer-events-none"
          src="/images/vector-img/vector-service-v1.png"
          alt=""
          aria-hidden="true"
        />
        <div className="container relative">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-3">Employer List</h2>
            <p className="text-base text-[var(--text-secondary)] mb-8">
              Discover top companies and employers hiring on SkillLinkup.
            </p>

            <div className="bg-[var(--bg-elevated)] rounded-md p-3 grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-3 items-center shadow-sm">
              <div className="md:border-r md:border-[var(--border-subtle)] md:pr-3">
                <HeroSearch1 />
              </div>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="secondary">Search</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import listingStore from "@/store/listingStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const CATEGORIES = [
  "Graphics & Design",
  "Digital Marketing",
  "Writing & Translation",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
];

export default function Breadcumb12() {
  const t = useTranslations("jobsHub");
  const getSearch = listingStore((state) => state.getSearch);
  const setSearch = listingStore((state) => state.setSearch);
  const setCategory = listingStore((state) => state.setCategory);
  const getCategory = listingStore((state) => state.getCategory);

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl mx-4 lg:mx-5 px-6 lg:px-8 pt-32 pb-32 rounded-2xl relative overflow-hidden flex items-center bg-[var(--surface-2)]">
        <Image
          height={226}
          width={198}
          className="absolute top-0 left-0 hidden md:block opacity-40 pointer-events-none"
          src="/images/vector-img/left-top.png"
          alt=""
          aria-hidden="true"
        />
        <Image
          height={181}
          width={255}
          className="absolute bottom-0 right-0 hidden md:block opacity-40 pointer-events-none"
          src="/images/vector-img/right-bottom.png"
          alt=""
          aria-hidden="true"
        />
        <div className="container relative">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-3">{t("jobList")}</h2>
            <p className="text-base text-[var(--text-secondary)] mb-8">
              {t("jobListText")}
            </p>

            <div className="bg-[var(--bg-elevated)] rounded-md p-3 grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-3 items-center shadow-sm">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="md:border-r md:border-[var(--border-subtle)] md:pr-3"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
                  <Input
                    type="text"
                    name="search"
                    placeholder={t("searchPlaceholder")}
                    value={getSearch}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 border-0 focus-visible:ring-0"
                  />
                </div>
              </form>

              <Select
                value={getCategory[0] || ""}
                onValueChange={(value) => {
                  listingStore
                    .getState()
                    .getCategory.forEach(() => setCategory(""));
                  if (value) setCategory(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("allCategories")} />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  const el = document.querySelector("[data-listing-results]");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("search")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

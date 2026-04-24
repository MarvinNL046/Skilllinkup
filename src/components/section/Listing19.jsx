"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import useConvexProjects from "@/hook/useConvexProjects";
import ListingOption2 from "../element/ListingOption2";
import Pagination1 from "./Pagination1";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import ListingSidebarModal2 from "../modal/ListingSidebarModal2";
import ProjectCard3 from "../card/ProjectCard3";
import ListingSidebar6 from "../sidebar/ListingSidebar6";
import EmptyState from "@/components/ui/EmptyState";

export default function Listing19() {
  const t = useTranslations("projects");
  const searchParams = useSearchParams();
  const setSearch = listingStore((state) => state.setSearch);
  const getCategory = listingStore((state) => state.getCategory);
  const getProjectType = listingStore((state) => state.getProjectType);
  const getPrice = priceStore((state) => state.priceRange);
  const getDesginTool = listingStore((state) => state.getDesginTool);
  const getLocation = listingStore((state) => state.getLocation);
  const getSearch = listingStore((state) => state.getSearch);
  const getSpeak = listingStore((state) => state.getSpeak);
  const getBestSeller = listingStore((state) => state.getBestSeller);
  const getEnglishLevel = listingStore((state) => state.getEnglishLevel);

  // Sync URL search params to Zustand store on mount
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearch(q);
  }, [searchParams, setSearch]);

  // category filter
  const categoryFilter = (item) =>
    getCategory?.length !== 0 ? getCategory.includes(item.category) : true;

  // project-type filter
  const projectTypeFilter = (item) =>
    getProjectType?.length !== 0
      ? getProjectType.includes(item.projectType)
      : item;

  // price filter
  const priceFilter = (item) =>
    getPrice.min <= item.price.min && getPrice.max >= item.price.max;

  // skill filter
  const skillFilter = (item) =>
    getDesginTool?.length !== 0
      ? getDesginTool.includes(item.skills?.split(" ").join("-").toLowerCase())
      : item;

  // location filter
  const locationFilter = (item) =>
    getLocation?.length !== 0
      ? getLocation.includes(item.location.split(" ").join("-").toLowerCase())
      : item;

  // search filter
  const searchFilter = (item) =>
    getSearch !== ""
      ? (item.title || "").toLowerCase().includes(getSearch.toLowerCase()) ||
        (item.category || "").toLowerCase().includes(getSearch.toLowerCase()) ||
        (item.location || "").toLowerCase().includes(getSearch.toLowerCase())
      : true;

  // speak filter
  const speakFilter = (item) =>
    getSpeak?.length !== 0
      ? getSpeak.includes(item.language?.split(" ").join("-").toLowerCase())
      : item;

  // english level filter
  const englishLevelFilter = (item) =>
    getEnglishLevel?.length !== 0
      ? getEnglishLevel.includes(item.englishLevel)
      : item;

  // sort by filter
  const sortByFilter = (item) =>
    getBestSeller === "best-seller" ? true : item.sort === getBestSeller;

  const project1 = useConvexProjects();

  if (project1 === undefined) {
    return (
      <section style={{ padding: "var(--space-14) 0" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "var(--space-12) 0",
            }}
          >
            <div
              role="status"
              aria-label={t("loading")}
              style={{
                width: 28,
                height: 28,
                border: "3px solid var(--border-subtle)",
                borderTopColor: "var(--primary-600)",
                borderRadius: "999px",
                animation: "spin 0.9s linear infinite",
              }}
            />
          </div>
        </div>
      </section>
    );
  }

  const filtered = project1
    .slice(0, 8)
    .filter(categoryFilter)
    .filter(projectTypeFilter)
    .filter(priceFilter)
    .filter(skillFilter)
    .filter(locationFilter)
    .filter(searchFilter)
    .filter(speakFilter)
    .filter(englishLevelFilter)
    .filter(sortByFilter);

  return (
    <>
      <section style={{ padding: "var(--space-10) 0 var(--space-16)" }}>
        <div className="container">
          <div
            className="listing-layout"
            style={{ display: "grid", gap: "var(--space-8)", alignItems: "start" }}
          >
            <aside style={{ minWidth: 0 }}>
              <ListingSidebar6 />
            </aside>
            <div style={{ minWidth: 0 }}>
              <ListingOption2 itemLength={filtered.length} itemLabel={t("itemLabel")} />
              {filtered.length === 0 ? (
                <EmptyState
                  icon="📋"
                  title={t("noProjectsTitle")}
                  description={t("noProjectsDescription")}
                  actionLabel={t("noProjectsAction")}
                  actionHref="/create-projects"
                />
              ) : (
                <div style={{ display: "grid", gap: "var(--space-4)" }}>
                  {filtered.map((item, i) => (
                    <ProjectCard3 key={i} data={item} />
                  ))}
                </div>
              )}
              <div style={{ marginTop: "var(--space-8)" }}>
                <Pagination1 itemCount={filtered.length} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal2 />
    </>
  );
}

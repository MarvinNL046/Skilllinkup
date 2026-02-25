"use client";

import { useMemo } from "react";
import ProjectCard, { ProjectCardData } from "@/components/marketplace/ProjectCard";
import FilterSidebar from "@/components/marketplace/FilterSidebar";
import { useListingStore } from "@/store/listingStore";
import { usePriceStore } from "@/store/priceStore";

interface ProjectsClientProps {
  projects: ProjectCardData[];
  categories: { name: string; slug: string }[];
}

export default function ProjectsClient({ projects, categories }: ProjectsClientProps) {
  const selectedCategories = useListingStore((state) => state.category);
  const selectedLocations = useListingStore((state) => state.location);
  const search = useListingStore((state) => state.search);
  const priceRange = usePriceStore((state) => state.priceRange);

  const locations = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((project) => {
      if (project.locationCountry) {
        set.add(project.locationCountry);
      }
    });
    return Array.from(set);
  }, [projects]);

  const maxPrice = useMemo(
    () =>
      projects.reduce((max, p) => {
        const upper = p.budgetMax ?? p.budgetMin ?? 0;
        return Math.max(max, upper);
      }, 0),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          project.title.toLowerCase().includes(q) ||
          project.category.toLowerCase().includes(q) ||
          project.clientName.toLowerCase().includes(q) ||
          project.requiredSkills.some((skill) => skill.toLowerCase().includes(q))
        );
      })
      .filter((project) =>
        selectedCategories.length === 0
          ? true
          : selectedCategories.includes(project.categorySlug)
      )
      .filter((project) => {
        const budgetMin = project.budgetMin ?? 0;
        const budgetMax = project.budgetMax ?? budgetMin;
        return budgetMin >= priceRange[0] && budgetMax <= priceRange[1];
      })
      .filter((project) =>
        selectedLocations.length === 0
          ? true
          : Boolean(project.locationCountry) &&
            selectedLocations.includes(project.locationCountry!)
      );
  }, [projects, search, selectedCategories, priceRange, selectedLocations]);

  return (
    <section className="pt30 pb90">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-xl-3">
            <FilterSidebar
              categories={categories}
              locations={locations}
              maxPrice={maxPrice}
            />
          </div>
          <div className="col-lg-8 col-xl-9">
            <div className="row align-items-center mb20">
              <div className="col-sm-6">
                <h4 className="mb0">{filteredProjects.length} Projects</h4>
              </div>
            </div>
            <div className="row">
              {filteredProjects.map((project) => (
                <div key={project.slug} className="col-sm-6 col-xl-4">
                  <ProjectCard data={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

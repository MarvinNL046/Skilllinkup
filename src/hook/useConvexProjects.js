"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Static fallback data
const defaultProjects = [
  {
    id: 1,
    img: "/images/listings/g-1.jpg",
    title: "Website Design Project",
    location: "Remote",
    brief: "Looking for a talented designer to create a modern website.",
    tags: ["React", "Next.js", "Tailwind"],
    price: { min: 500, max: 2000 },
  },
];

function mapConvexProject(project, index) {
  return {
    id: index + 1,
    _id: project._id,
    img: "/images/listings/g-1.jpg",
    title: project.title || "Untitled Project",
    location: project.locationCity
      ? `${project.locationCity}, ${project.locationCountry || ""}`
      : project.workType === "remote" ? "Remote" : "On-site",
    brief: project.description ? project.description.substring(0, 150) + "..." : "",
    tags: project.requiredSkills || [],
    price: {
      min: project.budgetMin || 0,
      max: project.budgetMax || 0,
    },
    slug: project.slug,
    clientName: project.clientName,
    clientAvatar: project.clientAvatar,
    bidCount: project.bidCount || 0,
    status: project.status,
  };
}

export default function useConvexProjects() {
  const convexProjects = useQuery(api.marketplace.projects.list, { locale: "en" });

  if (convexProjects && convexProjects.length > 0) {
    return convexProjects.map(mapConvexProject);
  }

  return defaultProjects;
}

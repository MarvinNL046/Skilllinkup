"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Validate image URL — only allow known-good paths and external URLs
function validImg(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (trimmed.length < 5) return null;
  if (trimmed.startsWith("/images/posts/")) return null;
  if (trimmed.startsWith("http") || trimmed.startsWith("/images/blog/")) return trimmed;
  return null;
}

function isValidImageUrl(url) {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (trimmed.length < 5) return false;
  return trimmed.startsWith("/") || trimmed.startsWith("http");
}

function mapConvexPost(post, index) {
  return {
    id: index + 1,
    _id: post._id,
    img: validImg(post.featureImg) || "/images/blog/default-blog-feature.jpg",
    date: post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Recent",
    title: post.title || "Untitled Post",
    brief: post.excerpt || "",
    description: post.content || "",
    category: post.category?.name || "General",
    author: {
      img: isValidImageUrl(post.author?.image) ? post.author.image : "/images/blog/default-avatar.png",
      name: post.author?.name || "Author",
    },
    slug: post.slug,
  };
}

export default function useConvexBlog() {
  const convexPosts = useQuery(api.posts.list, { locale: "en" });

  if (convexPosts === undefined) return undefined; // loading
  if (convexPosts && convexPosts.length > 0) {
    return convexPosts.map(mapConvexPost);
  }

  return []; // no posts yet
}

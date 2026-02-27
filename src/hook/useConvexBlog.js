"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Check if image URL points to an existing path (not /images/posts/ which doesn't exist)
function validImg(url) {
  if (!url) return null;
  if (url.startsWith("/images/posts/")) return null;
  return url;
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
      img: post.author?.image || "/images/blog/default-avatar.png",
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

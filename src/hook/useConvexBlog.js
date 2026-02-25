"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { blog1 } from "@/data/blog";

function mapConvexPost(post, index) {
  return {
    id: index + 1,
    _id: post._id,
    img: post.featureImg || "/images/blog/blog-1.jpg",
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
      img: post.author?.image || "/images/blog/author-md-1.png",
      name: post.author?.name || "Author",
    },
    slug: post.slug,
  };
}

export default function useConvexBlog() {
  const convexPosts = useQuery(api.posts.list, { locale: "en" });

  if (convexPosts && convexPosts.length > 0) {
    return convexPosts.map(mapConvexPost);
  }

  return blog1;
}

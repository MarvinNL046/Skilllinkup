"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FALLBACK_IMG = "/images/blog/default-blog-feature.jpg";
const FALLBACK_AVATAR = "/images/blog/default-avatar.png";

function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").slice(0, 200);
}

export default function BlogCard4({ data }) {
  const postUrl = data.slug ? `/post/${data.slug}` : `/post/${data.id}`;
  const excerpt = data.brief || stripHtml(data.description);
  const [imgSrc, setImgSrc] = useState(data.img || FALLBACK_IMG);
  const [avatarSrc, setAvatarSrc] = useState(data.author?.img || FALLBACK_AVATAR);

  return (
    <article className="mb-5">
      <Image
        height={398}
        width={736}
        className="w-full rounded-md object-cover h-auto"
        src={imgSrc}
        alt={data.title}
        onError={() => setImgSrc(FALLBACK_IMG)}
      />
      <div className="pt-5">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <Image
            height={40}
            width={40}
            className="rounded-full object-contain h-10 w-10"
            src={avatarSrc}
            alt="avatar"
            onError={() => setAvatarSrc(FALLBACK_AVATAR)}
          />
          <span className="text-sm text-[var(--text-secondary)]">
            {data.author?.name || "Author"}
          </span>
          <span className="text-sm text-[var(--text-tertiary)]">·</span>
          <span className="text-sm text-[var(--text-secondary)]">
            {data.category}
          </span>
          <span className="text-sm text-[var(--text-tertiary)]">·</span>
          <span className="text-sm text-[var(--text-secondary)]">{data.date}</span>
        </div>
        <h3 className="text-2xl font-semibold mb-2">
          <Link href={postUrl} className="hover:text-primary">
            {data.title}
          </Link>
        </h3>
        <p className="text-base text-[var(--text-secondary)] mb-6">{excerpt}</p>
        <Button asChild variant="outline">
          <Link href={postUrl}>
            Read More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

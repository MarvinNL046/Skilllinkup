"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const FALLBACK_IMG = "/images/blog/default-blog-feature.jpg";
const FALLBACK_AVATAR = "/images/blog/default-avatar.png";

function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").slice(0, 200);
}

export default function BlogCard4({ data, index }) {
  const postUrl = data.slug ? `/post/${data.slug}` : `/post/${data.id}`;
  const excerpt = data.brief || stripHtml(data.description);
  const [imgSrc, setImgSrc] = useState(data.img || FALLBACK_IMG);
  const [avatarSrc, setAvatarSrc] = useState(data.author?.img || FALLBACK_AVATAR);

  return (
    <>
      <div
        className={`blog-style1 large-size mb20 ${
          index === data.id ? "mb50" : ""
        }`}
      >
        <div className="blog-img">
          <Image
            height={398}
            width={736}
            className="w-100 bdrs4 object-fit-cover"
            style={{ height: "auto" }}
            src={imgSrc}
            alt={data.title}
            onError={() => setImgSrc(FALLBACK_IMG)}
          />
        </div>
        <div className="blog-content px-0 pt20 pb-0">
          <div className="blog-single-meta mb25">
            <div className="post-author d-sm-flex align-items-center">
              <Image
                height={60}
                width={60}
                className="mr10 object-fit-contain"
                src={avatarSrc}
                alt="avatar"
                onError={() => setAvatarSrc(FALLBACK_AVATAR)}
              />
              <a className="pr15 body-light-color">{data.author?.name || "Author"}</a>
              <a className="ml15 pr15 body-light-color">{data.category}</a>
              <a className="ml15 body-light-color">{data.date}</a>
            </div>
          </div>
          <h3 className="title mt-1 mb10">
            <Link href={postUrl}>{data.title}</Link>
          </h3>
          <p className="text mb25">{excerpt}</p>
          <Link
            href={postUrl}
            className="ud-btn btn-light-thm"
          >
            Read More
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>
    </>
  );
}

"use client";
import { use, useState } from "react";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import useConvexPost from "@/hook/useConvexPost";
import EmptyState from "@/components/ui/EmptyState";
import { useTranslations } from "next-intl";

const FALLBACK_IMG = "/images/blog/default-blog-feature.jpg";
const FALLBACK_AVATAR = "/images/blog/default-avatar.png";

function PostContent({ slug }) {
  const tc = useTranslations("common");
  const t = useTranslations("blogPost");
  const post = useConvexPost(slug);
  const [featSrc, setFeatSrc] = useState(FALLBACK_IMG);
  const [avatarSrc, setAvatarSrc] = useState(FALLBACK_AVATAR);
  const [initialized, setInitialized] = useState(false);

  // Sync image state when post data arrives
  // Skip /images/posts/ URLs as those files don't exist on production
  if (post && !initialized) {
    if (post.featureImg && !post.featureImg.startsWith("/images/posts/")) {
      setFeatSrc(post.featureImg);
    }
    if (post.author?.image) setAvatarSrc(post.author.image);
    setInitialized(true);
  }

  // Loading
  if (post === undefined) {
    return (
      <section className="pt-14 pb-24">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-thm" role="status">
              <span className="visually-hidden">{tc("loading")}</span>
            </div>
            <p className="body-color mt-3">{tc("loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  // Not found
  if (post === null) {
    return (
      <section className="pt-14 pb-24">
        <div className="container">
          <EmptyState
            icon="📝"
            title={t("postNotFound")}
            description={t("postNotFoundDescription")}
            actionLabel={t("backToBlog")}
            actionHref="/blog"
          />
        </div>
      </section>
    );
  }

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : t("recent");

  const authorName = post.author?.name || "SkillLinkup";
  const categoryName = post.category?.name || t("general");

  return (
    <section className="our-blog pt-10 pb-24">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-5">
          <Link href="/" className="body-color text-sm">{t("home")}</Link>
          <span className="body-color text-sm mx-1">/</span>
          <Link href="/blog" className="body-color text-sm">{t("blog")}</Link>
          <span className="body-color text-sm mx-1">/</span>
          <span className="dark-color text-sm font-medium">{post.title}</span>
        </nav>

        {/* Title & Meta */}
        <div className="row wow fadeInUp" data-wow-delay="100ms">
          <div className="col-lg-12">
            <h1 className="blog-title mb-4" style={{ fontSize: "2rem" }}>
              {post.title}
            </h1>
            <div className="blog-single-meta mb-8">
              <div className="post-author sm:flex items-center">
                <Image
                  height={40}
                  width={40}
                  className="mr-2.5 object-fit-contain rounded-circle"
                  src={avatarSrc}
                  alt={authorName}
                  onError={() => setAvatarSrc(FALLBACK_AVATAR)}
                />
                <span className="pr-4 body-light-color">{authorName}</span>
                <span className="ml-4 pr-4 body-light-color">{categoryName}</span>
                <span className="ml-4 body-light-color">{date}</span>
                {post.readTime && (
                  <span className="ml-4 body-light-color">
                    {t("minRead", { minutes: post.readTime })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Image */}
        <div className="row mb-8">
          <div className="col-lg-12">
            <Image
              height={530}
              width={1200}
              className="w-full bdrs12 object-fit-cover"
              style={{ maxHeight: "500px" }}
              src={featSrc}
              alt={post.title}
              onError={() => setFeatSrc(FALLBACK_IMG)}
            />
          </div>
        </div>

        {/* Content */}
        <div className="row">
          <div className="col-xl-8 offset-xl-2">
            <div className="ui-content">
              {post.content && (
                <div
                  className="blog-post-content text-base body-color lh-lg"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                />
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="bdrt1 mt-10 pt-8 flex items-center flex-wrap gap-2">
                <span className="dark-color font-medium me-2">{t("tags")}</span>
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="badge"
                    style={{
                      background: "#f5f5f5",
                      color: "#666",
                      fontSize: "0.85rem",
                      fontWeight: 400,
                      padding: "6px 14px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Back to blog */}
            <div className="mt-10 pt-5 bdrt1">
              <Link href="/blog" className="ud-btn btn-light-thm">
                <i className="fal fa-arrow-left-long me-2" />
                {t("backToBlog")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BlogPostPage({ params }) {
  const { id } = use(params);

  return (
    <>
      <Header20 />
      <PostContent slug={id} />
      <Footer14 />
    </>
  );
}

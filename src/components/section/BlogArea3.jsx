"use client";
import useConvexBlog from "@/hook/useConvexBlog";
import BlogCard4 from "../card/BlogCard4";
import EmptyState from "@/components/ui/EmptyState";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FileText } from "lucide-react";

export default function BlogArea3() {
  const t = useTranslations("blogListing");
  const tc = useTranslations("common");
  const blog1 = useConvexBlog();

  // Loading state
  if (blog1 === undefined) {
    return (
      <section className="our-blog pt-10 pb-24">
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

  // Empty state
  if (blog1.length === 0) {
    return (
      <section className="our-blog pt-10 pb-24">
        <div className="container">
          <EmptyState
            Icon={FileText}
            title={t("noPosts")}
            description={t("noPostsDescription")}
            actionLabel={t("browsePlatforms")}
            actionHref="/platforms"
          />
        </div>
      </section>
    );
  }

  const blogData = blog1.slice(0, 6);
  const lastIndex = blogData[blogData.length - 1]?.id;

  return (
    <>
      <section className="our-blog pt-10 pb-24">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-8">
              {blogData.map((item, i) => (
                <BlogCard4 key={i} data={item} index={lastIndex} />
              ))}
            </div>
            <div className="col-lg-4">
              <div className="blog-sidebar ms-lg-auto">
                <div className="sidebar-widget mb-8">
                  <h4 className="title">{t("aboutBlog")}</h4>
                  <p className="body-color text-sm mt-2.5">
                    {t("aboutBlogDescription")}
                  </p>
                </div>
                <div className="sidebar-widget mb-8">
                  <h4 className="title">{t("quickLinks")}</h4>
                  <ul className="list-unstyled mt-4">
                    <li className="mb-2.5">
                      <Link href="/platforms" className="body-color text-sm">
                        <i className="far fa-angle-right me-2" />
                        {t("comparePlatforms")}
                      </Link>
                    </li>
                    <li className="mb-2.5">
                      <Link href="/services" className="body-color text-sm">
                        <i className="far fa-angle-right me-2" />
                        {t("browseServices")}
                      </Link>
                    </li>
                    <li className="mb-2.5">
                      <Link href="/become-seller" className="body-color text-sm">
                        <i className="far fa-angle-right me-2" />
                        {t("becomeSeller")}
                      </Link>
                    </li>
                    <li className="mb-2.5">
                      <Link href="/contact" className="body-color text-sm">
                        <i className="far fa-angle-right me-2" />
                        {t("contactUs")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

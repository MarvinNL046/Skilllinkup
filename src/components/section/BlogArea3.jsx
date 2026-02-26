"use client";
import useConvexBlog from "@/hook/useConvexBlog";
import BlogCard4 from "../card/BlogCard4";
import EmptyState from "@/components/ui/EmptyState";
import Link from "next/link";

export default function BlogArea3() {
  const blog1 = useConvexBlog();

  // Loading state
  if (blog1 === undefined) {
    return (
      <section className="our-blog pt40 pb90">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-thm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="body-color mt-3">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (blog1.length === 0) {
    return (
      <section className="our-blog pt40 pb90">
        <div className="container">
          <EmptyState
            icon="📝"
            title="No blog posts yet"
            description="We're working on helpful articles for freelancers and clients. Check back soon!"
            actionLabel="Browse Platforms"
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
      <section className="our-blog pt40 pb90">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-8">
              {blogData.map((item, i) => (
                <BlogCard4 key={i} data={item} index={lastIndex} />
              ))}
            </div>
            <div className="col-lg-4">
              <div className="blog-sidebar ms-lg-auto">
                <div className="sidebar-widget mb30">
                  <h4 className="title">About the Blog</h4>
                  <p className="body-color fz14 mt10">
                    Tips, guides, and insights to help you succeed as a
                    freelancer or find the right talent for your projects.
                  </p>
                </div>
                <div className="sidebar-widget mb30">
                  <h4 className="title">Quick Links</h4>
                  <ul className="list-unstyled mt15">
                    <li className="mb10">
                      <Link href="/platforms" className="body-color fz14">
                        <i className="far fa-angle-right me-2" />
                        Compare Platforms
                      </Link>
                    </li>
                    <li className="mb10">
                      <Link href="/services" className="body-color fz14">
                        <i className="far fa-angle-right me-2" />
                        Browse Services
                      </Link>
                    </li>
                    <li className="mb10">
                      <Link href="/become-seller" className="body-color fz14">
                        <i className="far fa-angle-right me-2" />
                        Become a Seller
                      </Link>
                    </li>
                    <li className="mb10">
                      <Link href="/contact" className="body-color fz14">
                        <i className="far fa-angle-right me-2" />
                        Contact Us
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

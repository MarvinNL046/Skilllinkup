"use client";
import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import PopularServiceSlideCard1 from "@/components/card/PopularServiceSlideCard1";
import TrendingServiceCard1 from "@/components/card/TrendingServiceCard1";
import EmptyState from "@/components/ui/EmptyState";
import Link from "next/link";

function mapGigToProduct(gig, index) {
  return {
    id: index + 1,
    _id: gig._id,
    img: gig.firstImage?.url || "/images/listings/g-1.jpg",
    img2: gig.firstImage?.url || "/images/listings/g-1.jpg",
    category: gig.category?.name || "Uncategorized",
    title: gig.title || "Untitled Service",
    rating: gig.ratingAverage || 0,
    review: gig.ratingCount || 0,
    author: {
      img: gig.freelancerProfile?.avatarUrl || "/images/team/fl-1.png",
      name: gig.freelancerProfile?.displayName || "Freelancer",
    },
    price: gig.minPrice || 0,
    slug: gig.slug,
  };
}

function CategoryContent({ slug }) {
  const result = useQuery(api.marketplace.gigs.listByCategory, {
    categorySlug: slug,
    locale: "en",
  });

  // Loading
  if (result === undefined) {
    return (
      <section className="pt30 pb90">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-thm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { category, gigs } = result;

  // Category not found
  if (!category) {
    return (
      <section className="pt30 pb90">
        <div className="container">
          <EmptyState
            icon="🔍"
            title="Category not found"
            description="This category doesn't exist."
            actionLabel="Browse All Services"
            actionHref="/online/services"
          />
        </div>
      </section>
    );
  }

  const products = gigs.map(mapGigToProduct);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <section className="pt30 pb90">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb20">
          <Link href="/" className="body-color fz14">Home</Link>
          <span className="body-color fz14 mx-1">/</span>
          <Link href="/online/services" className="body-color fz14">Services</Link>
          <span className="body-color fz14 mx-1">/</span>
          <span className="dark-color fz14 fw500">{category.name}</span>
        </nav>

        {/* Title */}
        <div className="row mb30">
          <div className="col-12">
            <h1 className="title mb5" style={{ fontSize: "1.8rem" }}>
              {category.icon && <span className={`${category.icon} mr10`} />}
              {category.name}
            </h1>
            {category.description && (
              <p className="body-color">{category.description}</p>
            )}
          </div>
        </div>

        {/* Subcategories */}
        {hasChildren && (
          <div className="row mb30">
            <div className="col-12">
              <div className="d-flex flex-wrap gap-2">
                {category.children.map((child) => (
                  <Link
                    key={child._id}
                    href={`/online/services/${child.slug}`}
                    className="ud-btn btn-light-thm bdrs60 fz14"
                    style={{ padding: "8px 20px" }}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Gigs listing */}
        {products.length === 0 ? (
          <EmptyState
            icon="🚀"
            title={`No services in ${category.name} yet`}
            description="Be the first to offer your services in this category"
            actionLabel="Become a Seller"
            actionHref="/become-seller"
          />
        ) : (
          <>
            <p className="body-color mb20">
              {products.length} service{products.length !== 1 ? "s" : ""} found
            </p>
            <div className="row">
              {products.map((item, i) => (
                <div key={i} className="col-sm-6 col-xl-4">
                  {item?.gallery ? (
                    <PopularServiceSlideCard1 data={item} />
                  ) : (
                    <TrendingServiceCard1 data={item} />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default function CategoryPage({ params }) {
  const { slug } = use(params);

  return <CategoryContent slug={slug} />;
}

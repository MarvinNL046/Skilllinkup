"use client";
import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import PopularServiceSlideCard1 from "@/components/card/PopularServiceSlideCard1";
import TrendingServiceCard1 from "@/components/card/TrendingServiceCard1";
import EmptyState from "@/components/ui/EmptyState";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Search as SearchIcon, Rocket } from "lucide-react";

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
      img: gig.freelancerProfile?.avatarUrl || "/images/team/default-avatar.svg",
      name: gig.freelancerProfile?.displayName || "Freelancer",
    },
    price: gig.minPrice || 0,
    slug: gig.slug,
  };
}

function CategoryContent({ slug }) {
  const t = useTranslations("common");
  const result = useQuery(api.marketplace.gigs.listByCategory, {
    categorySlug: slug,
    locale: "en",
  });

  // Loading
  if (result === undefined) {
    return (
      <section className="pt-8 pb-24">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-thm" role="status">
              <span className="visually-hidden">{t("loading")}</span>
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
      <section className="pt-8 pb-24">
        <div className="container">
          <EmptyState
            Icon={SearchIcon}
            title="Category not found"
            description="This category doesn't exist."
            actionLabel="Browse All Services"
            actionHref="/services"
          />
        </div>
      </section>
    );
  }

  const products = gigs.map(mapGigToProduct);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <section className="pt-8 pb-24">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-5">
          <Link href="/" className="body-color text-sm">Home</Link>
          <span className="body-color text-sm mx-1">/</span>
          <Link href="/services" className="body-color text-sm">Services</Link>
          <span className="body-color text-sm mx-1">/</span>
          <span className="dark-color text-sm font-medium">{category.name}</span>
        </nav>

        {/* Title */}
        <div className="row mb-8">
          <div className="col-12">
            <h1 className="title mb-1" style={{ fontSize: "1.8rem" }}>
              {category.icon && <span className={`${category.icon} mr-2.5`} />}
              {category.name}
            </h1>
            {category.description && (
              <p className="body-color">{category.description}</p>
            )}
          </div>
        </div>

        {/* Subcategories */}
        {hasChildren && (
          <div className="row mb-8">
            <div className="col-12">
              <div className="flex flex-wrap gap-2">
                {category.children.map((child) => (
                  <Link
                    key={child._id}
                    href={`/services/${child.slug}`}
                    className="ud-btn btn-light-thm bdrs60 text-sm"
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
            Icon={Rocket}
            title={`No services in ${category.name} yet`}
            description="Be the first to offer your services in this category"
            actionLabel="Become a Seller"
            actionHref="/become-seller"
          />
        ) : (
          <>
            <p className="body-color mb-5">
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

  return (
    <>
      <Header20 />
      <CategoryContent slug={slug} />
      <Footer14 />
    </>
  );
}

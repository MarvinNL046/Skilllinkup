import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { getPublishedPlatforms, getPlatformCategories } from "../../lib/queries";
import { PlatformFilters } from "../../components/platform-filters";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const metadata = {
  title: "All Platforms - SkillLinkup",
  description: "Browse all freelance platform reviews, comparisons, and ratings.",
};

export default async function PlatformsPage() {
  let platforms: Awaited<ReturnType<typeof getPublishedPlatforms>> = [];
  let platformCategories: Awaited<ReturnType<typeof getPlatformCategories>> = [];

  try {
    platforms = await getPublishedPlatforms(50);
    platformCategories = await getPlatformCategories();
  } catch (error) {
    console.error('Error fetching platforms:', error);
  }

  // Add "All Platforms" category
  const categories = [
    { category: "All Platforms", count: platforms.length },
    ...platformCategories,
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-background-light to-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-heading font-bold text-text-primary sm:text-5xl mb-4">
                All Freelance Platforms
              </h1>
              <p className="text-lg text-text-secondary mb-6">
                Compare {platforms.length}+ platforms to find the perfect match for your skills and goals
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <PlatformFilters platforms={platforms} categories={categories} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

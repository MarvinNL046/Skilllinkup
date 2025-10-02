import InstagramOne from '../src/common/components/instagram/InstagramOne';
import FooterOne from '../src/common/elements/footer/FooterOne';
import HeaderOne from '../src/common/elements/header/HeaderOne';
import { getPublishedPosts, getFeaturedPosts } from '../lib/queries';
import PostSectionEight from '../src/common/components/post/PostSectionEight';
import PostSectionTwo from '../src/common/components/post/PostSectionTwo';
import PostSectionThree from '../src/common/components/post/PostSectionThree';
import CategoryList from '../src/common/components/category/CategoryList';
import PostSectionFour from '../src/common/components/post/PostSectionFour';
import SocialOne from '../src/common/components/social/SocialOne';
import PostSectionSix from '../src/common/components/post/PostSectionSix';
import { DEFAULTS } from '../lib/defaults';
import { safeImage, safeText, safeArray, safeNumber, safeBoolean } from '../lib/safe';

export const metadata = {
  title: 'SkillLinkup - SEO Tips & Insights',
  description: 'Learn SEO strategies, tips and techniques to grow your online presence with SkillLinkup',
}

// Force dynamic rendering to avoid database queries during build
export const dynamic = 'force-dynamic';

/**
 * Normalize post data to prevent undefined/null crashes
 * Single source of truth for data transformation with safe helpers
 */
function normalizePost(post: any) {
  if (!post || typeof post !== 'object') {
    return null; // Invalid post, will be filtered out
  }

  return {
    id: safeText(post.id, ''),
    title: safeText(post.title, DEFAULTS.title),
    featureImg: safeImage(post.feature_img || post.featureImg, DEFAULTS.featureImg),
    postFormat: safeText(post.post_format, DEFAULTS.postFormat),
    featured: safeBoolean(post.featured, false),
    slidePost: safeBoolean(post.featured, false),
    date: post.published_at ? new Date(post.published_at).toISOString() : new Date().toISOString(),
    slug: safeText(post.slug, ''),
    cate: safeText(post.category_name, DEFAULTS.category),
    cate_img: DEFAULTS.categoryImg,
    author_img: safeImage(post.author_avatar || post.author_img, DEFAULTS.authorImg),
    author_name: safeText(post.author_name, DEFAULTS.authorName),
    post_views: safeNumber(post.views, DEFAULTS.views),
    read_time: safeNumber(post.read_time, DEFAULTS.readTime),
    author_social: safeArray(post.author_social),
    excerpt: safeText(post.excerpt, DEFAULTS.excerpt),
    content: safeText(post.content, DEFAULTS.content),
  };
}

export default async function HomePage() {
  let dbPosts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  let featuredPosts: Awaited<ReturnType<typeof getFeaturedPosts>> = [];

  try {
    // Fetch posts from database
    dbPosts = await getPublishedPosts(20, 0);
    featuredPosts = await getFeaturedPosts(5);
  } catch (error) {
    console.error('Error fetching posts from database:', error);
    // Continue with empty arrays - components will handle gracefully
  }

  // Normalize and filter invalid posts
  const safePosts = Array.isArray(dbPosts) ? dbPosts : [];
  const allPosts = safePosts
    .map(normalizePost)
    .filter((post): post is NonNullable<typeof post> => post !== null);

  const videoPost = allPosts.filter(post => post.postFormat === "video");

  // Serialize-safe data for client components (prevents JSON.stringify crashes)
  const serializablePosts = allPosts.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    featureImg: post.featureImg,
    cate: post.cate,
    author_name: post.author_name,
    date: post.date,
  }));

  // Show loading/empty state if no posts
  if (!allPosts || allPosts.length === 0) {
    return (
      <>
        <HeaderOne
          pClass=""
          darkLogo="/images/logo/logo-black.webp"
          lightLogo="/images/logo/logo-white.webp"
          postData={[]}
        />
        <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-center">
            <h2>Welcome to SkillLinkup</h2>
            <p>Content is being loaded. Please check back soon!</p>
          </div>
        </div>
        <FooterOne />
      </>
    );
  }

  return (
    <>
      <HeaderOne
        pClass=""
        darkLogo="/images/logo/logo-black.webp"
        lightLogo="/images/logo/logo-white.webp"
        postData={serializablePosts}
      />
      {/* Hero Section: 1 grote featured post + 4 kleine posts */}
      <PostSectionEight postData={allPosts} />

      {/* What's New at Bloger - Tab sectie met carousel */}
      <PostSectionTwo postData={allPosts} adBanner={true} headingTitle="What's new at Bloger" />

      {/* Most Popular - Tab sectie */}
      <PostSectionSix postData={allPosts} />

      {/* Featured Video sectie */}
      <PostSectionThree
        postData={videoPost}
        heading="Featured Video"
        adBanner={false}
        bgColor="bg-color-grey"
      />

      {/* Trending Topics - Category carousel */}
      <CategoryList cateData={allPosts}/>

      {/* Main Content + Sidebar */}
      <PostSectionFour postData={allPosts} adBanner={true} />

      {/* Social Banner */}
      <SocialOne />

      {/* Instagram Grid */}
      <InstagramOne parentClass="bg-color-grey"/>

      <FooterOne />
    </>
  );
}

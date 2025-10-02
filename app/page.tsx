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

// Fallback constants for safe rendering
const DEFAULT_FEATURE_IMG = '/images/posts/lifestyle-post-01.webp';
const DEFAULT_AUTHOR_IMG = '/images/posts/author/author-image-1.png';

export const metadata = {
  title: 'SkillLinkup - SEO Tips & Insights',
  description: 'Learn SEO strategies, tips and techniques to grow your online presence with SkillLinkup',
}

// Force dynamic rendering to avoid database queries during build
export const dynamic = 'force-dynamic';

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

  // Transform database posts to component format with safe defaults
  const allPosts = dbPosts.map(post => ({
    id: post?.id || '',
    title: post?.title || 'Untitled',
    featureImg: post?.feature_img || DEFAULT_FEATURE_IMG,
    postFormat: post?.post_format || 'standard',
    featured: post?.featured || false,
    slidePost: post?.featured || false,
    date: post?.published_at ? new Date(post.published_at).toISOString() : new Date().toISOString(),
    slug: post?.slug || '',
    cate: post?.category_name || 'Uncategorized',
    cate_img: '',
    author_img: post?.author_avatar || DEFAULT_AUTHOR_IMG,
    author_name: post?.author_name || 'Anonymous',
    post_views: post?.views || 0,
    read_time: post?.read_time || 5,
    author_social: [], // Components expect an array
    excerpt: post?.excerpt || '',
    content: post?.content || '',
  }));

  const videoPost = allPosts.filter(post => post.postFormat === "video");

  // Show loading/empty state if no posts
  if (allPosts.length === 0) {
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
        postData={allPosts}
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

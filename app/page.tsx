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

export const metadata = {
  title: 'SkillLinkup - SEO Tips & Insights',
  description: 'Learn SEO strategies, tips and techniques to grow your online presence with SkillLinkup',
}

export default async function HomePage() {
  // Fetch posts from database
  const dbPosts = await getPublishedPosts(20, 0);
  const featuredPosts = await getFeaturedPosts(5);

  // Transform database posts to component format
  const allPosts = dbPosts.map(post => ({
    id: post.id,
    title: post.title,
    featureImg: post.feature_img || '/images/post-images/post-grid-01.jpg',
    postFormat: post.post_format || 'standard',
    featured: post.featured,
    slidePost: post.featured,
    date: post.published_at ? new Date(post.published_at).toISOString() : new Date().toISOString(),
    slug: post.slug,
    cate: post.category_name || 'Uncategorized',
    cate_img: '',
    author_img: post.author_avatar || '/images/post-images/author/author-image-1.png',
    author_name: post.author_name || 'Anonymous',
    post_views: post.views || 0,
    read_time: post.read_time || 5,
    author_social: {},
  }));

  const videoPost = allPosts.filter(post => post.postFormat === "video");

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

import { getAllPosts, getPostBySlug } from '../../../lib/api';
import HeaderOne from '../../../src/common/elements/header/HeaderOne';
import FooterOne from '../../../src/common/elements/footer/FooterOne';
import PostFormatStandard from '../../../src/common/components/post/format/PostFormatStandard';
import PostFormatVideo from '../../../src/common/components/post/format/PostFormatVideo';
import PostFormatAudio from '../../../src/common/components/post/format/PostFormatAudio';
import PostFormatGallery from '../../../src/common/components/post/format/PostFormatGallery';
import PostFormatQuote from '../../../src/common/components/post/format/PostFormatQuote';
import { DEFAULTS } from '../../../lib/defaults';
import { safeImage, safeText, safeArray } from '../../../lib/safe';

export async function generateStaticParams() {
  const posts = getAllPosts(['slug']);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const post = getPostBySlug(slug, ['title', 'excerpt', 'featureImg']);

    if (!post) {
      return {
        title: 'Post Not Found - SkillLinkup',
        description: 'The requested post could not be found.',
        openGraph: { images: [DEFAULTS.ogImg] },
        twitter: { images: [DEFAULTS.ogImg] },
      };
    }

    // Safe fallback for all metadata fields using safe helpers
    const title = safeText(post.title, DEFAULTS.title);
    const description = safeText(post.excerpt || post.title, 'SkillLinkup blog post');
    const ogImage = safeImage(post.featureImg, DEFAULTS.ogImg);

    return {
      title: `${title} - SkillLinkup`,
      description,
      openGraph: {
        title,
        description,
        images: [ogImage], // Always a valid string
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image' as const,
        title,
        description,
        images: [ogImage], // Always a valid string
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'SkillLinkup',
      description: 'SEO Tips & Insights',
      openGraph: { images: [DEFAULTS.ogImg] },
      twitter: { images: [DEFAULTS.ogImg] },
    };
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: any;
  let allPosts: any[] = [];

  try {
    post = getPostBySlug(slug, [
      'title',
      'date',
      'slug',
      'author_name',
      'author_img',
      'author_designation',
      'author_bio',
      'author_social',
      'content',
      'featureImg',
      'postFormat',
      'cate',
      'cate_img',
      'post_views',
      'read_time',
      'tags',
      'excerpt',
    ]);

    allPosts = getAllPosts([
      'id',
      'title',
      'slug',
      'featureImg',
      'date',
      'cate',
      'author_name',
      'post_views',
      'read_time',
    ]);
  } catch (error) {
    console.error('Error loading post:', error);
  }

  // Handle missing post
  if (!post) {
    return (
      <>
        <HeaderOne
          pClass=""
          darkLogo="/images/logo/logo-black.webp"
          lightLogo="/images/logo/logo-white.webp"
          postData={[]}
        />
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Post Not Found</h2>
            <p>The requested post could not be found.</p>
          </div>
        </div>
        <FooterOne />
      </>
    );
  }

  // Normalize post data with safe defaults using safe helpers
  const normalizedPost = {
    ...post,
    title: safeText(post.title, DEFAULTS.title),
    featureImg: safeImage(post.featureImg, DEFAULTS.featureImg),
    author_img: safeImage(post.author_img, DEFAULTS.authorImg),
    author_name: safeText(post.author_name, DEFAULTS.authorName),
    author_social: safeArray(post.author_social),
    excerpt: safeText(post.excerpt, DEFAULTS.excerpt),
    content: safeText(post.content, DEFAULTS.content),
  };

  // Select the appropriate post format component based on postFormat
  const renderPostFormat = () => {
    const postFormat = normalizedPost.postFormat?.toLowerCase() || 'standard';

    switch (postFormat) {
      case 'video':
        return <PostFormatVideo postData={normalizedPost} allData={allPosts} />;
      case 'audio':
        return <PostFormatAudio postData={normalizedPost} allData={allPosts} />;
      case 'gallery':
        return <PostFormatGallery postData={normalizedPost} allData={allPosts} />;
      case 'quote':
        return <PostFormatQuote postData={normalizedPost} allData={allPosts} />;
      case 'standard':
      default:
        return <PostFormatStandard postData={normalizedPost} allData={allPosts} />;
    }
  };

  return (
    <>
      <HeaderOne
        pClass=""
        darkLogo="/images/logo/logo-black.webp"
        lightLogo="/images/logo/logo-white.webp"
        postData={allPosts}
      />
      {renderPostFormat()}
      <FooterOne />
    </>
  );
}

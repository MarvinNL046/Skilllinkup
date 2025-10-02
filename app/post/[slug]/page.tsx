import { getAllPosts, getPostBySlug } from '../../../lib/api';
import HeaderOne from '../../../src/common/elements/header/HeaderOne';
import FooterOne from '../../../src/common/elements/footer/FooterOne';
import PostFormatStandard from '../../../src/common/components/post/format/PostFormatStandard';
import PostFormatVideo from '../../../src/common/components/post/format/PostFormatVideo';
import PostFormatAudio from '../../../src/common/components/post/format/PostFormatAudio';
import PostFormatGallery from '../../../src/common/components/post/format/PostFormatGallery';
import PostFormatQuote from '../../../src/common/components/post/format/PostFormatQuote';

export async function generateStaticParams() {
  const posts = getAllPosts(['slug']);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, ['title', 'excerpt']);

  return {
    title: `${post.title} - SkillLinkup`,
    description: post.excerpt || post.title,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, [
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

  const allPosts = getAllPosts([
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

  // Select the appropriate post format component based on postFormat
  const renderPostFormat = () => {
    const postFormat = post.postFormat?.toLowerCase() || 'standard';

    switch (postFormat) {
      case 'video':
        return <PostFormatVideo postData={post} allData={allPosts} />;
      case 'audio':
        return <PostFormatAudio postData={post} allData={allPosts} />;
      case 'gallery':
        return <PostFormatGallery postData={post} allData={allPosts} />;
      case 'quote':
        return <PostFormatQuote postData={post} allData={allPosts} />;
      case 'standard':
      default:
        return <PostFormatStandard postData={post} allData={allPosts} />;
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

#!/usr/bin/env node

/**
 * Translate Blog Page Strings (EN → NL)
 * Uses @iamtraction/google-translate (FREE, no API key!)
 */

import translate from '@iamtraction/google-translate';

const blogData = {
  metadata: {
    title: "Blog - SkillLinkup",
    description: "Read our latest articles about freelance platforms, tips, and industry insights."
  },
  hero: {
    title: "Blog & Resources",
    subtitle: "Expert insights, platform reviews, and practical tips to help you succeed as a freelancer"
  },
  postCard: {
    minRead: "min read",
    views: "views"
  },
  emptyState: {
    message: "No blog posts found. Check back soon!"
  },
  loadMore: {
    button: "Load More Posts"
  },
  categories: {
    heading: "Browse by Category",
    postCount: {
      one: "article",
      other: "articles"
    }
  }
};

async function translateBlogPage() {
  console.log('🌍 Starting Blog Page translation (EN → NL)...\n');

  try {
    // Metadata
    console.log('📦 Translating metadata...');
    const metadataTitle = await translate(blogData.metadata.title, { from: 'en', to: 'nl' });
    const metadataDesc = await translate(blogData.metadata.description, { from: 'en', to: 'nl' });
    await sleep(500);

    // Hero
    console.log('🎯 Translating hero section...');
    const heroTitle = await translate(blogData.hero.title, { from: 'en', to: 'nl' });
    await sleep(500);
    const heroSubtitle = await translate(blogData.hero.subtitle, { from: 'en', to: 'nl' });
    await sleep(500);

    // Post Card
    console.log('📄 Translating post card labels...');
    const minRead = await translate(blogData.postCard.minRead, { from: 'en', to: 'nl' });
    await sleep(500);
    const views = await translate(blogData.postCard.views, { from: 'en', to: 'nl' });
    await sleep(500);

    // Empty State
    console.log('📭 Translating empty state...');
    const emptyMessage = await translate(blogData.emptyState.message, { from: 'en', to: 'nl' });
    await sleep(500);

    // Load More
    console.log('🔄 Translating load more button...');
    const loadMoreBtn = await translate(blogData.loadMore.button, { from: 'en', to: 'nl' });
    await sleep(500);

    // Categories
    console.log('📂 Translating categories section...');
    const categoriesHeading = await translate(blogData.categories.heading, { from: 'en', to: 'nl' });
    await sleep(500);
    const postCountOne = await translate(blogData.categories.postCount.one, { from: 'en', to: 'nl' });
    await sleep(500);
    const postCountOther = await translate(blogData.categories.postCount.other, { from: 'en', to: 'nl' });
    await sleep(500);

    console.log('\n✅ Translation complete!\n');
    console.log('📋 Add this to messages/nl.json under "blogPage":');
    console.log('='.repeat(60));
    console.log(JSON.stringify({
      blogPage: {
        metadata: {
          title: metadataTitle.text,
          description: metadataDesc.text
        },
        hero: {
          title: heroTitle.text,
          subtitle: heroSubtitle.text
        },
        postCard: {
          minRead: minRead.text,
          views: views.text
        },
        emptyState: {
          message: emptyMessage.text
        },
        loadMore: {
          button: loadMoreBtn.text
        },
        categories: {
          heading: categoriesHeading.text,
          postCount: `{count, plural, one {${postCountOne.text}} other {${postCountOther.text}}}`
        }
      }
    }, null, 2));
    console.log('='.repeat(60));

  } catch (error) {
    console.error('❌ Translation failed:', error.message);
    process.exit(1);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

translateBlogPage();

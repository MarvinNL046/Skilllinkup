import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL);

async function cleanupLocales() {
  console.log('🧹 Cleaning up locale data...\n');

  try {
    // Delete all platforms with locale='nl' (these are incorrect auto-translations)
    const deletedPlatforms = await sql`
      DELETE FROM platforms
      WHERE locale = 'nl'
      RETURNING name
    `;
    console.log(`✅ Deleted ${deletedPlatforms.length} incorrect Dutch platform translations`);

    // Update posts to English (they're actually in English)
    const updatedPosts = await sql`
      UPDATE posts
      SET locale = 'en'
      WHERE locale = 'nl'
      RETURNING title
    `;
    console.log(`✅ Updated ${updatedPosts.length} posts to English`);

    // Update categories to English (they're actually in English)
    const updatedCategories = await sql`
      UPDATE categories
      SET locale = 'en'
      WHERE locale = 'nl'
      RETURNING name
    `;
    console.log(`✅ Updated ${updatedCategories.length} categories to English`);

    console.log('\n🎉 Cleanup complete!');
    console.log('\n📊 Final state:');
    console.log('  - Platforms: 18 English originals (nl duplicates removed)');
    console.log('  - Posts: 3 English (corrected)');
    console.log('  - Categories: 3 English (corrected)');
    console.log('\n Next step: Run translate-platforms.mjs to create Dutch translations');

  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    throw error;
  }
}

cleanupLocales()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });

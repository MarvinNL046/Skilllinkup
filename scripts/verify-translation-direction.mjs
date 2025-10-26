import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL);

async function verifyTranslation() {
  console.log('🔍 Verifying translation direction (EN → NL)...\n');

  // Get one platform in both languages
  const fiverr = await sql`
    SELECT locale, name, description
    FROM platforms
    WHERE slug = 'fiverr'
    ORDER BY locale
  `;

  console.log('📊 Sample platform: Fiverr\n');

  fiverr.forEach(platform => {
    console.log(`Language: ${platform.locale.toUpperCase()}`);
    console.log(`Name: ${platform.name}`);
    console.log(`Description: ${platform.description?.substring(0, 200)}...`);
    console.log('---\n');
  });

  console.log('\n✅ Verification complete!');
  console.log('Expected: EN has original English, NL has Dutch translation');
}

verifyTranslation()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Failed:', error);
    process.exit(1);
  });

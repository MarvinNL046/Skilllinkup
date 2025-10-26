import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function checkPlatforms() {
  console.log('🔍 Checking platforms database...\n');
  
  // Total count
  const total = await sql`SELECT COUNT(*) as count FROM platforms WHERE status = 'published'`;
  console.log(`📊 Total published platforms: ${total[0].count}`);
  
  // Count by locale
  const byLocale = await sql`
    SELECT locale, COUNT(*) as count 
    FROM platforms 
    WHERE status = 'published'
    GROUP BY locale
    ORDER BY locale
  `;
  console.log(`\n📍 By locale:`);
  byLocale.forEach(row => {
    console.log(`   ${row.locale}: ${row.count} platforms`);
  });
  
  // Check for duplicates within same locale (same slug + locale)
  const duplicates = await sql`
    SELECT slug, locale, COUNT(*) as count
    FROM platforms
    WHERE status = 'published'
    GROUP BY slug, locale
    HAVING COUNT(*) > 1
  `;
  
  if (duplicates.length > 0) {
    console.log(`\n⚠️  Found ${duplicates.length} duplicate slug+locale combinations:`);
    duplicates.forEach(dup => {
      console.log(`   - ${dup.slug} (${dup.locale}): ${dup.count} records`);
    });
  } else {
    console.log(`\n✅ No duplicates found within same locale`);
  }
  
  // Show sample platforms
  const sample = await sql`
    SELECT name, slug, locale, status
    FROM platforms
    WHERE status = 'published'
    ORDER BY name, locale
    LIMIT 20
  `;
  console.log(`\n📋 Sample platforms (first 20):`);
  sample.forEach(p => {
    console.log(`   - ${p.name} (${p.slug}) [${p.locale}]`);
  });
}

checkPlatforms().catch(console.error);

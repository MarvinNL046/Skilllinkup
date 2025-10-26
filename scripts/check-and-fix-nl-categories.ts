import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = neon(connectionString);

async function checkAndFixCategories() {
  console.log('🔍 Checking existing categories...\n');

  // Query all categories
  const categories = await sql`
    SELECT id, name, slug, locale, tenant_id, description
    FROM categories
    ORDER BY locale, slug;
  `;

  console.log('📊 Existing categories:');
  console.table(categories.map((c: any) => ({
    name: c.name,
    slug: c.slug,
    locale: c.locale,
  })));

  // Group by locale
  const byLocale = categories.reduce((acc: any, cat: any) => {
    if (!acc[cat.locale]) acc[cat.locale] = [];
    acc[cat.locale].push(cat);
    return acc;
  }, {});

  console.log('\n📈 Summary:');
  console.log(`EN categories: ${byLocale['en']?.length || 0}`);
  console.log(`NL categories: ${byLocale['nl']?.length || 0}`);

  // If NL categories are missing, create them
  if (!byLocale['nl'] || byLocale['nl'].length === 0) {
    console.log('\n⚠️  No NL categories found. Creating Dutch versions...\n');

    const enCategories = byLocale['en'] || [];

    // Dutch translations for each category
    const nlTranslations: Record<string, { name: string; description: string }> = {
      'ai': {
        name: 'AI',
        description: 'Kunstmatige intelligentie en machine learning tools en platforms'
      },
      'guides-tutorials': {
        name: 'Gidsen & Tutorials',
        description: 'Stapsgewijze handleidingen en tutorials voor freelancers'
      },
      'remote-work-trends-2025': {
        name: 'Remote Werk Trends 2025',
        description: 'De nieuwste trends in remote werken en digitale samenwerking'
      }
    };

    for (const enCat of enCategories) {
      const translation = nlTranslations[enCat.slug];

      if (translation) {
        console.log(`Creating NL category for: ${enCat.slug}`);

        await sql`
          INSERT INTO categories (tenant_id, name, slug, description, locale, created_at, updated_at)
          VALUES (
            ${enCat.tenant_id},
            ${translation.name},
            ${enCat.slug},
            ${translation.description},
            'nl',
            NOW(),
            NOW()
          )
        `;

        console.log(`✅ Created: ${translation.name} (nl)`);
      } else {
        console.log(`⚠️  No translation found for slug: ${enCat.slug}`);
      }
    }

    console.log('\n✨ NL categories created successfully!');
  } else {
    console.log('\n✅ NL categories already exist.');
  }

  // Verify final state
  console.log('\n🔍 Final verification...\n');
  const finalCategories = await sql`
    SELECT name, slug, locale
    FROM categories
    ORDER BY locale, slug;
  `;

  console.table(finalCategories);

  process.exit(0);
}

checkAndFixCategories().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});

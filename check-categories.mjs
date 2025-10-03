import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);

async function checkCategories() {
  try {
    console.log('📚 Checking categories in database...\n');

    const categories = await sql`
      SELECT id, name, slug, description, color, created_at
      FROM categories
      ORDER BY name
    `;

    if (categories.length === 0) {
      console.log('⚠️  No categories found in database');
      return;
    }

    console.log(`✅ Found ${categories.length} categories:\n`);

    categories.forEach(cat => {
      console.log(`📁 ${cat.name} (${cat.slug})`);
      console.log(`   Color: ${cat.color}`);
      console.log(`   Description: ${cat.description || 'No description'}`);
      console.log(`   Created: ${new Date(cat.created_at).toLocaleDateString()}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error checking categories:', error.message);
    process.exit(1);
  }
}

checkCategories();

import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import translate from '@iamtraction/google-translate';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

// Helper function to add delay between translations (avoid rate limiting)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function addDutchTools() {
  try {
    console.log('🇳🇱 Creating Dutch versions of tools...\n');

    // Get English tools
    const enTools = await sql`
      SELECT * FROM tools WHERE locale = 'en' ORDER BY name
    `;

    console.log(`Found ${enTools.length} English tools to translate\n`);

    for (const tool of enTools) {
      console.log(`Translating: ${tool.name}...`);

      try {
        // Translate name and description with delay
        const nameTr = await translate(tool.name, { from: 'en', to: 'nl' });
        await delay(1000); // 1 second delay

        const descTr = await translate(tool.description || '', { from: 'en', to: 'nl' });
        await delay(1000); // 1 second delay

        // Insert Dutch version
        await sql`
          INSERT INTO tools (
            owner_id, name, slug, description, category, icon, color,
            tool_url, is_available, featured, sort_order, views, status, locale
          ) VALUES (
            ${tool.owner_id},
            ${nameTr.text},
            ${tool.slug},
            ${descTr.text},
            ${tool.category},
            ${tool.icon},
            ${tool.color},
            ${tool.tool_url},
            ${tool.is_available},
            ${tool.featured},
            ${tool.sort_order},
            ${tool.views},
            ${tool.status},
            'nl'
          )
        `;

        console.log(`  ✅ Created: ${nameTr.text}\n`);
      } catch (translateError) {
        console.error(`  ❌ Translation failed for ${tool.name}:`, translateError.message);
        console.log(`  ⏭️  Skipping to next tool...\n`);
        continue;
      }
    }

    console.log('🎉 All Dutch tools created!\n');

    // Show summary
    const summary = await sql`
      SELECT locale, COUNT(*) as count
      FROM tools
      GROUP BY locale
      ORDER BY locale
    `;

    console.log('📊 Tools by locale:');
    summary.forEach(s => console.log(`   ${s.locale}: ${s.count} tools`));

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addDutchTools();

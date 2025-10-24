import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || '';

if (!connectionString) {
  throw new Error('DATABASE_URL or NETLIFY_DATABASE_URL environment variable is required');
}

const sql = neon(connectionString);

async function updateInvoiceAvailability() {
  console.log('🔄 Updating Invoice Generator availability...\n');

  try {
    // Update Invoice Generator to be available
    const result = await sql`
      UPDATE tools
      SET is_available = true,
          updated_at = NOW()
      WHERE slug = 'invoice-generator'
      RETURNING name, slug, is_available
    `;

    if (result.length > 0) {
      console.log('✅ Database updated successfully:');
      console.log(`   ${result[0].name} (${result[0].slug})`);
      console.log(`   is_available: ${result[0].is_available}\n`);
    } else {
      console.log('⚠️  No rows updated. Invoice Generator might not exist in database yet.\n');
    }

    // Verify all tools status
    const verify = await sql`
      SELECT name, slug, is_available, status
      FROM tools
      WHERE category = 'tool'
      ORDER BY sort_order
    `;

    console.log('📊 Current tools status:');
    verify.forEach(tool => {
      const icon = tool.is_available ? '✅' : '❌';
      console.log(`   ${icon} ${tool.name} (${tool.slug})`);
    });

  } catch (error) {
    console.error('❌ Error updating database:', error);
    process.exit(1);
  }
}

updateInvoiceAvailability()
  .then(() => {
    console.log('\n✨ Update complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });

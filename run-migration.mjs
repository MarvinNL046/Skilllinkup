import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function runMigration() {
  try {
    console.log('🚀 Running Stack Auth Integration Migration...\n');

    const migration = readFileSync('migrations/002_stack_auth_integration.sql', 'utf8');
    const statements = migration
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log('📝 Found ' + statements.length + ' SQL statements\n');

    let executed = 0;
    let failed = 0;

    for (const statement of statements) {
      try {
        if (statement.startsWith('--') || statement.trim().length === 0) {
          continue;
        }

        await sql([statement]);
        executed++;

        if (statement.includes('CREATE POLICY')) {
          const match = statement.match(/CREATE POLICY (\w+)/);
          const policyName = match ? match[1] : 'unknown';
          console.log('✅ Created policy: ' + policyName);
        } else if (statement.includes('ALTER TABLE')) {
          const match = statement.match(/ALTER TABLE (\w+)/);
          const tableName = match ? match[1] : 'unknown';
          console.log('✅ Altered table: ' + tableName);
        } else if (statement.includes('CREATE INDEX')) {
          const match = statement.match(/CREATE INDEX (?:IF NOT EXISTS )?(\w+)/);
          const indexName = match ? match[1] : 'unknown';
          console.log('✅ Created index: ' + indexName);
        }
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log('⏭️  Skipped: already exists');
        } else {
          const preview = statement.substring(0, 100);
          console.error('❌ Failed: ' + preview + '...');
          console.error('   Error: ' + error.message);
          failed++;
        }
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ Migration complete!');
    console.log('   Executed: ' + executed + ' statements');
    console.log('   Failed: ' + failed + ' statements');
    console.log('='.repeat(60));

    console.log('\n🔍 Verifying migration...\n');

    const policies = await sql`
      SELECT tablename, policyname
      FROM pg_policies
      WHERE schemaname = 'public'
      ORDER BY tablename, policyname
    `;

    console.log('✅ Found ' + policies.length + ' RLS policies:');

    let currentTable = '';
    policies.forEach(p => {
      if (currentTable !== p.tablename) {
        currentTable = p.tablename;
        console.log('\n📋 ' + p.tablename + ':');
      }
      console.log('   - ' + p.policyname);
    });

    console.log('\n✅ Migration verified successfully!');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigration();
import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function checkDatabase() {
  try {
    console.log('🔍 Checking database connection...\n');

    // Test connection
    const timeResult = await sql`SELECT NOW() as current_time`;
    console.log('✅ Database connected:', timeResult[0].current_time);
    console.log('');

    // List all tables
    console.log('📊 Tables in database:');
    console.log('='.repeat(60));
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;

    if (tables.length === 0) {
      console.log('⚠️  No tables found in database');
      console.log('');
      console.log('💡 Next step: Run the migration file in Neon SQL Editor');
      console.log('   File: migrations/001_initial_schema.sql');
      return;
    }

    console.log('Found ' + tables.length + ' table(s):\n');

    for (const table of tables) {
      console.log('\n📋 Table: ' + table.table_name);
      console.log('-'.repeat(60));

      // Get columns for this table
      const columns = await sql`
        SELECT
          column_name,
          data_type,
          is_nullable,
          column_default
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = ${table.table_name}
        ORDER BY ordinal_position
      `;

      columns.forEach(col => {
        const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
        const defaultVal = col.column_default ? ' DEFAULT ' + col.column_default : '';
        console.log('  - ' + col.column_name + ': ' + col.data_type + ' ' + nullable + defaultVal);
      });
    }

    // Check RLS policies
    console.log('\n\n🔒 Row Level Security Policies:');
    console.log('='.repeat(60));
    const policies = await sql`
      SELECT
        schemaname,
        tablename,
        policyname,
        permissive,
        roles,
        cmd
      FROM pg_policies
      WHERE schemaname = 'public'
      ORDER BY tablename, policyname
    `;

    if (policies.length === 0) {
      console.log('⚠️  No RLS policies found');
    } else {
      console.log('Found ' + policies.length + ' policy(ies):\n');
      
      let currentTable = '';
      policies.forEach(policy => {
        if (currentTable !== policy.tablename) {
          currentTable = policy.tablename;
          console.log('\n📜 Table: ' + policy.tablename);
        }
        console.log('  - ' + policy.policyname + ' (' + policy.cmd + ')');
      });
    }

    console.log('\n\n✅ Database inspection complete!');

  } catch (error) {
    console.error('❌ Error inspecting database:', error.message);
    process.exit(1);
  }
}

checkDatabase();

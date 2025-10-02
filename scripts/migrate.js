#!/usr/bin/env node
const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
const { migrate } = require('drizzle-orm/neon-http/migrator');
require('dotenv').config({ path: '.env.local' });

async function runMigrations() {
  console.log('🔄 Running database migrations...\n');

  try {
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);

    console.log('📝 Applying migrations from drizzle/migrations...\n');

    await migrate(db, { migrationsFolder: './drizzle/migrations' });

    console.log('✅ All migrations completed successfully!\n');
    console.log('📊 Created tables:');
    console.log('  - tenants (multi-tenancy core)');
    console.log('  - users (tenant users with roles)');
    console.log('  - categories (post categories)');
    console.log('  - posts (blog content)');
    console.log('  - media (file uploads)');
    console.log('  - comments (post comments)');
    console.log('  - analytics (usage tracking)\n');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

runMigrations();

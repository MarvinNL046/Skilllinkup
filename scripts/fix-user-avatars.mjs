#!/usr/bin/env node

/**
 * Fix NULL User Avatars
 * Updates users with missing avatars to use default fallback
 */

import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

// Load .env.local
config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL not configured');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function fixUserAvatars() {
  console.log('🔧 Fixing NULL user avatars...\n');

  try {
    // Show what will be fixed
    const toFix = await sql`
      SELECT id, name, email, avatar, role
      FROM users
      WHERE avatar IS NULL OR TRIM(avatar) = '';
    `;

    if (toFix.length === 0) {
      console.log('✅ No users need fixing!');
      return;
    }

    console.log(`Found ${toFix.length} user(s) to fix:\n`);
    toFix.forEach(user => {
      console.log(`   - ${user.name} (${user.email})`);
      console.log(`     role: ${user.role}`);
      console.log(`     Current avatar: ${user.avatar === null ? 'NULL' : `'${user.avatar}'`}`);
    });
    console.log('');

    // Apply fix
    const fixed = await sql`
      UPDATE users
      SET avatar = '/images/posts/author/author-image-1.png'
      WHERE avatar IS NULL OR TRIM(avatar) = ''
      RETURNING id, name, email, avatar;
    `;

    console.log(`✅ Fixed ${fixed.length} user(s)!\n`);
    console.log('Updated users:');
    fixed.forEach(user => {
      console.log(`   - ${user.name} (${user.email})`);
      console.log(`     New avatar: '${user.avatar}'`);
    });
    console.log('');

    console.log('🎉 All done! Run health check to verify:');
    console.log('   npm run db:health');
  } catch (error) {
    console.error('❌ Fix failed:', error.message);
    process.exit(1);
  }
}

fixUserAvatars();

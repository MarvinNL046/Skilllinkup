// scripts/check-existing-platforms.ts
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || '');

async function checkPlatforms() {
  const platforms = await sql`SELECT id, name, owner_id FROM platforms LIMIT 3`;

  if (platforms.length === 0) {
    console.log('❌ No platforms found');
  } else {
    console.log(`✅ Found ${platforms.length} platforms:\n`);
    platforms.forEach(p => {
      console.log(`   ${p.name}`);
      console.log(`   ID: ${p.id}`);
      console.log(`   Owner ID: ${p.owner_id}\n`);
    });
  }
}

checkPlatforms();

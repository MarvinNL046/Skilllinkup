// scripts/get-owner-id.ts
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || '';
const sql = neon(connectionString);

async function getOwnerId() {
  // Get the first user as owner
  const users = await sql`SELECT id, email, name FROM users LIMIT 1`;

  if (users.length === 0) {
    console.log('❌ No users found in database');
    return;
  }

  const owner = users[0];
  console.log('✅ Found owner:');
  console.log(`   ID: ${owner.id}`);
  console.log(`   Email: ${owner.email}`);
  console.log(`   Name: ${owner.name}`);
  console.log('\nUse this ID in the import script.');
}

getOwnerId().catch(console.error);

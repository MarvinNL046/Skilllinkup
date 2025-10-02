import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '../drizzle/schema';

// Use DATABASE_URL for local development and Netlify production
const connectionString = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || '';

if (!connectionString) {
  throw new Error(
    'DATABASE_URL or NETLIFY_DATABASE_URL environment variable is required'
  );
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });

// Export schema for direct access
export { schema };

import "server-only";
import { drizzle } from 'drizzle-orm/neon-http';
import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import * as schema from '../drizzle/schema';

// Use DATABASE_URL for local development and production
const connectionString = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || '';

// Lazy initialization: don't throw at import time (breaks edge runtime during build).
// Instead, initialize on first actual usage.
let _sql: NeonQueryFunction<false, false>| null = null;
let _db: ReturnType<typeof drizzle>| null = null;

function getSql(): NeonQueryFunction<false, false>{
 if (!_sql) {
 if (!connectionString) {
 throw new Error(
 'Database URL not configured. Please set DATABASE_URL or NETLIFY_DATABASE_URL environment variable.'
 );
 }
 _sql = neon(connectionString);
 }
 return _sql;
}

// Raw SQL client for direct queries
// Wrapped in a function-proxy so tagged template calls (sql`...`) work lazily
export const sql: NeonQueryFunction<false, false>= new Proxy(
 (() =>{}) as unknown as NeonQueryFunction<false, false>,
 {
 apply(_target, _thisArg, args) {
 return Reflect.apply(getSql(), undefined, args);
 },
 get(_target, prop, receiver) {
 return Reflect.get(getSql(), prop, receiver);
 },
 }
);

// Drizzle ORM client (used by app queries)
export const db: ReturnType<typeof drizzle>= new Proxy(
 {} as ReturnType<typeof drizzle>,
 {
 get(_target, prop, receiver) {
 if (!_db) {
 _db = drizzle(getSql(), { schema });
 }
 return Reflect.get(_db, prop, receiver);
 },
 }
);

// Export schema for direct access
export { schema };

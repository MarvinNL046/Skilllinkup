import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

export const sql = neon(process.env.DATABASE_URL);

// Test database connection
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Database connected:', result[0].current_time);
    return { success: true, time: result[0].current_time };
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return { success: false, error };
  }
}

// Get all users from Stack Auth
export async function getUsers() {
  try {
    const result = await sql`
      SELECT id, display_name, primary_email, created_at 
      FROM users 
      ORDER BY created_at DESC
    `;
    return result;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

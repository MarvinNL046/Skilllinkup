// Helper to get user contact info for sending emails
import { sql } from '@/lib/db';

export interface UserContact {
  id: string;
  email: string;
  name: string;
}

/**
 * Get user contact info by user ID.
 * Returns null if user not found or has no email.
 */
export async function getUserContact(userId: string): Promise<UserContact | null> {
  const rows = await sql`
    SELECT id, email, name FROM users WHERE id = ${userId} LIMIT 1
  `;

  if (!rows || rows.length === 0) return null;

  const user = rows[0];
  const email = user.email as string | null;
  if (!email) return null;

  return {
    id: String(user.id),
    email,
    name: (user.name as string) || email,
  };
}

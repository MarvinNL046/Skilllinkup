import { NextResponse } from 'next/server';
import { testConnection, getUsers } from '../../../lib/db';

export async function GET() {
  try {
    // Test connection
    const connectionTest = await testConnection();
    
    if (!connectionTest.success) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed',
        details: connectionTest.error
      }, { status: 500 });
    }

    // Get users
    const users = await getUsers();

    return NextResponse.json({
      success: true,
      connection: connectionTest,
      users: users,
      userCount: users.length,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

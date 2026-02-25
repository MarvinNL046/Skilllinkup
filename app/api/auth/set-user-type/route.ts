import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if (!email) {
      return NextResponse.json({ error: 'No email on account' }, { status: 400 });
    }

    const { userType } = await request.json();
    if (!['client', 'freelancer'].includes(userType)) {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
    }

    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        ...(clerkUser.publicMetadata || {}),
        userType,
        onboardingCompleted: false,
      },
    });

    return NextResponse.json({ success: true, userType });
  } catch (error) {
    console.error('[set-user-type] Error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

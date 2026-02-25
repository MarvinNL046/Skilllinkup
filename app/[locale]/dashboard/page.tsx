import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: PageProps) {
  const { locale } = await params;

  const user = await getCurrentUser();
  if (!user) {
    redirect('/sign-in');
  }

  if (user.userType === 'freelancer') {
    redirect(`/${locale}/dashboard/seller`);
  }

  // Default: client/buyer dashboard
  redirect(`/${locale}/dashboard/projects`);
}

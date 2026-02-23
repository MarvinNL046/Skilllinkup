import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { MessagesLayout } from './MessagesLayout';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function MessagesPage({ params }: PageProps) {
  const { locale } = await params;

  const user = await getCurrentUser();
  if (!user) {
    redirect(`/${locale}/auth/signin`);
  }

  const t = await getTranslations('messages');

  return (
    <MessagesLayout
      locale={locale}
      currentUserId={user.id}
      pageTitle={t('title')}
      emptyStateText={t('selectConversation')}
    />
  );
}

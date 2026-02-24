import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { MessagesLayout } from '../seller/messages/MessagesLayout';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardMessagesPage({ params }: PageProps) {
  const { locale } = await params;

  const user = await getCurrentUser();
  if (!user) {
    redirect('/handler/sign-in');
  }

  const t = await getTranslations('messages');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-4">
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
          {t('title')}
        </h1>
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm" style={{ height: 'calc(100vh - 12rem)' }}>
        <MessagesLayout
          locale={locale}
          currentUserId={user.id}
          pageTitle={t('title')}
          emptyStateText={t('selectConversation')}
        />
      </div>
    </div>
  );
}

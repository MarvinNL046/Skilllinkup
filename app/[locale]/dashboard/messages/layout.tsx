import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface MessagesLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function DashboardMessagesLayout({
  children,
  params,
}: MessagesLayoutProps) {
  // locale available if needed for future use
  await params;

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950">
        {children}
      </main>
      <Footer />
    </>
  );
}

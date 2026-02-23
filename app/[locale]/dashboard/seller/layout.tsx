import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SellerSidebar } from '@/components/dashboard/SellerSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function SellerDashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { locale } = await params;

  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950">
        <SellerSidebar locale={locale} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}

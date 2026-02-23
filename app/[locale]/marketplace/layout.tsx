import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background-light dark:bg-secondary-dark">
        {children}
      </main>
      <Footer />
    </>
  );
}

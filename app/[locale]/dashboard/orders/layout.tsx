import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface OrdersLayoutProps {
 children: React.ReactNode;
}

export default function ClientOrdersLayout({ children }: OrdersLayoutProps) {
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

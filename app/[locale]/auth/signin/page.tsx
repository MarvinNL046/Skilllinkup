import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SignInForm } from '@/components/auth/SignInForm';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SignInPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center py-16 px-4">
        <SignInForm locale={locale} />
      </main>
      <Footer />
    </>
  );
}

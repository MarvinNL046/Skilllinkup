import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SignUpForm } from '@/components/auth/SignUpForm';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SignUpPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center py-16 px-4">
        <SignUpForm locale={locale} />
      </main>
      <Footer />
    </>
  );
}

import { notFound } from 'next/navigation';
import SeoPage from '@/components/seo/SeoPage';
import { findSeoPage, seoMetadata } from '@/content/seo';

async function getPage(params) {
  const { locale, category, slug } = await params;
  return findSeoPage(`/${locale}/guides/${category}/${slug}`);
}
export async function generateMetadata({ params }) {
  const page = await getPage(params);
  if (!page) notFound();
  return seoMetadata(page);
}
export default async function HistoricalGuide({ params }) {
  const page = await getPage(params);
  if (!page) notFound();
  return <SeoPage page={page} />;
}

import SeoPage from '@/components/seo/SeoPage';
import { findSeoPage, seoMetadata } from '@/content/seo';

const page = findSeoPage('/platforms/upwork');
export const metadata = seoMetadata(page);
export default function UpworkReview() {
  return <SeoPage page={page} />;
}

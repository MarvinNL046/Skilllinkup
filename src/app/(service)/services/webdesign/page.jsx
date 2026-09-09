import SeoPage from '@/components/seo/SeoPage';
import { findSeoPage, seoMetadata } from '@/content/seo';
const content = findSeoPage('/services/webdesign');
export const metadata = seoMetadata(content);
export default function Page() { return <SeoPage page={content} />; }

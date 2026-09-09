import Link from 'next/link';
import Header20 from '@/components/header/Header20';
import Footer14 from '@/components/footer/Footer14';
import InvoiceGenerator from '@/components/seo/InvoiceGenerator';
import { SeoWaitlistCTA } from '@/components/seo/SeoPage';
import styles from '@/components/seo/SeoPage.module.css';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
export const metadata = { title: 'Create an Invoice — Free Freelance Invoice Tool', description: 'Enter your invoice details, preview line items and totals, then print or save a PDF. No account required; invoice entries are not sent to SkillLinkup.', alternates: { canonical: `${base}/en/tools/invoice-generator` }, openGraph: { title: 'Create a Freelance Invoice', description: 'A free browser invoice tool from SkillLinkup.', url: `${base}/en/tools/invoice-generator`, images: [`${base}/seo-og`] } };
export default function InvoiceToolPage() {
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebApplication', name: 'SkillLinkup Freelance Invoice Generator', url: `${base}/en/tools/invoice-generator`, applicationCategory: 'BusinessApplication', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Resources', item: `${base}/resources` }, { '@type': 'ListItem', position: 2, name: 'Freelance invoice generator', item: `${base}/resources/freelance-invoice-generator` }, { '@type': 'ListItem', position: 3, name: 'Create an invoice', item: `${base}/en/tools/invoice-generator` }] },
  ] };
  return <><Header20 /><main className={styles.page} lang="en"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/resources">Resources</Link><span>/</span><Link href="/resources/freelance-invoice-generator">Freelance invoice generator</Link><span>/</span><span>Create an invoice</span></nav><h1>Create your freelance invoice</h1><p className={styles.intro}>Add the agreed work, check the amounts and export a document you can send to your client.</p><InvoiceGenerator /><p className={styles.intro}><Link href="/resources/freelance-invoicing-guide">Check the freelance invoicing guide before sending.</Link></p><SeoWaitlistCTA skill="Freelancing" role="freelancer" /></main><Footer14 /></>;
}

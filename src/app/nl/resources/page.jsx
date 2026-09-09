import Link from 'next/link';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../../messages/nl.json';
import Header20 from '@/components/header/Header20';
import Footer14 from '@/components/footer/Footer14';
import { seoPages } from '@/content/seo';
import styles from '@/components/seo/SeoPage.module.css';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
export const metadata = { title: 'Gidsen voor freelancers', description: 'Praktische Nederlandstalige gidsen over freelanceplatforms, kosten en je profiel.', alternates: { canonical: `${base}/nl/resources` } };
export default function DutchResources() {
  return <NextIntlClientProvider locale="nl" messages={messages}><Header20 /><main className={styles.page} lang="nl"><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Gidsen</span></nav><h1>Gidsen voor freelancers</h1><p className={styles.intro}>Maak je aanbod duidelijk en kies een werkwijze die bij je opdrachten past.</p><div className={styles.cards}>{seoPages.filter(p => p.locale === 'nl').map(p => <Link href={p.path} key={p.path}>{p.title}<span>{p.description}</span></Link>)}<Link href="/nl/resources/platforms-for-copywriters">Platformen voor copywriters<span>De bestaande gids voor freelance copywriters.</span></Link></div><p className={styles.intro}><Link href="/resources">Browse all English resources</Link></p></main><Footer14 /></NextIntlClientProvider>;
}

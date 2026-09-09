import Link from 'next/link';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import nlMessages from '../../../messages/nl.json';
import Header20 from '@/components/header/Header20';
import Footer14 from '@/components/footer/Footer14';
import WaitlistButton from '@/components/ui/WaitlistButton';
import { findSeoPage, seoPages } from '@/content/seo';
import styles from './SeoPage.module.css';

export function SeoWaitlistCTA({ skill = '', role = '', locale = 'en' }) {
  const nl = locale === 'nl';
  return <section className={styles.cta} aria-label={nl ? 'SkillLinkup wachtlijst' : 'SkillLinkup waitlist'}>
    <span className={styles.eyebrow}>{nl ? 'We bereiden de lancering voor' : 'Preparing for launch'}</span>
    <h2>{nl ? 'Je volgende project begint met een duidelijke vraag.' : 'Your next project starts with a clear brief.'}</h2>
    <p>{nl ? 'Meld je aan voor een bericht over de lancering van SkillLinkup. Vertel wat je zoekt of aanbiedt. Je boekt geen project en een match is niet gegarandeerd.' : 'Join the SkillLinkup waitlist for a launch update. Tell us what you need or offer. No project commitment and no guaranteed match.'}</p>
    <WaitlistButton label={nl ? 'Meld je aan voor de wachtlijst' : 'Join the waitlist'} initialSkill={skill} initialUserType={role} />
  </section>;
}

export function SeoServiceLinks() {
  return <section className={styles.hub}><h2>Plan your freelance project</h2><p>Start with the right scope, portfolio questions and handover checklist.</p><div className={styles.cards}>{seoPages.filter(p => p.type === 'service').map(p => <Link key={p.path} href={p.path}>{p.title}<span>{p.description}</span></Link>)}</div></section>;
}

export default function SeoPage({ page, children }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const locale = page.locale || 'en';
  const nl = locale === 'nl';
  const hub = page.path.startsWith('/platforms/') ? 'Platforms' : page.type === 'guide' ? (nl ? 'Gidsen' : 'Resources') : 'Services';
  const hubPath = page.path.startsWith('/platforms/') ? '/platforms' : page.type === 'guide' ? (nl ? '/nl/resources' : '/resources') : '/services';
  const role = page.role || (page.type === 'service' ? 'client' : '');
  const translations = page.translationKey ? seoPages.filter(p => p.translationKey === page.translationKey && p.path !== page.path) : [];
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': page.type === 'guide' ? 'Article' : 'WebPage', headline: page.title, name: page.title, description: page.description, url: `${base}${page.path}`, inLanguage: locale, ...(page.type === 'guide' ? { author: { '@type': 'Organization', name: 'SkillLinkup', url: base } } : {}) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: base }, { '@type': 'ListItem', position: 2, name: hub, item: `${base}${hubPath}` }, { '@type': 'ListItem', position: 3, name: page.title, item: `${base}${page.path}` }] },
  ] };
  return <NextIntlClientProvider locale={locale} messages={nl ? nlMessages : enMessages}>
    <Header20 /><main className={styles.page} lang={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href={hubPath}>{hub}</Link><span>/</span><span>{page.skill || page.title}</span></nav>
      <section className={styles.hero}><div>
        <span className={styles.eyebrow}>{page.type === 'guide' ? (nl ? 'Praktische gids · Door SkillLinkup' : 'The project notebook · By SkillLinkup') : 'A clearer start for your project'}</span>
        <h1>{page.title}</h1><p className={styles.intro}>{page.intro}</p>
        {page.reviewed && <p className={styles.note}>{nl ? 'Bronnen gecontroleerd:' : 'Sources checked:'} <time dateTime={page.reviewed}>{page.reviewed}</time></p>}
        {page.toolLink && <Link className={styles.toolButton} href={page.toolLink}>Create your invoice <span aria-hidden="true">→</span></Link>}
        {translations.map(p => <p key={p.path} className={styles.note}><Link href={p.path} hrefLang={p.locale || 'en'}>{p.locale === 'nl' ? 'Lees deze gids in het Nederlands' : 'Read this guide in English'}</Link></p>)}
        {page.type === 'service' && <><WaitlistButton label="Join the waitlist" initialSkill={page.skill} initialUserType={role} /><p className={styles.note}>SkillLinkup is preparing for launch. This registers your interest, not a booking.</p></>}
      </div><aside className={styles.brief}><span className={styles.eyebrow}>{page.type === 'service' ? 'Example project brief' : nl ? 'Drie uitgangspunten' : 'Keep these three things clear'}</span><ol>{page.example.map(item => <li key={item}>{item}</li>)}</ol></aside></section>
      {children}
      <div className={styles.body}>
        <nav className={styles.contents} aria-label={nl ? 'Op deze pagina' : 'On this page'}><strong>{nl ? 'Op deze pagina' : 'On this page'}</strong>{page.template && <a href="#template">The proposal template</a>}{page.sections.map((section, i) => <a key={section.title} href={`#section-${i + 1}`}>{section.title}</a>)}<a href="#questions">{nl ? 'Veelgestelde vragen' : 'Common questions'}</a></nav>
        <article className={styles.article}>
          {page.template && <section id="template"><h2>Your copyable freelance proposal template</h2><p>Select and copy the text, then adapt it to the project. All bracketed items need your own details.</p><pre className={styles.template}>{page.template}</pre></section>}
          {page.sections.map((section, i) => <section id={`section-${i + 1}`} key={section.title}>
            <h2>{section.title}</h2><p>{section.body}</p>
            {section.items?.length > 0 && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
            {section.source && <p><a href={section.source[1]}>{section.source[0]}</a></p>}
            {section.links?.length > 0 && <p>{section.links.map((item, index) => <span key={item.path}>{index > 0 && ' · '}<Link href={item.path}>{item.label}</Link></span>)}</p>}
          </section>)}
          <section id="questions"><h2>{nl ? 'Veelgestelde vragen' : 'Common questions'}</h2>{page.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
          <section><h2>{nl ? 'Verder lezen' : 'Keep planning'}</h2><ul>{page.related.map(path => <li key={path}><Link href={path}>{findSeoPage(path)?.title || path.split('/').at(-1).replaceAll('-', ' ')}</Link></li>)}</ul></section>
        </article>
      </div><SeoWaitlistCTA skill={page.skill} role={role} locale={locale} />
    </main><Footer14 />
  </NextIntlClientProvider>;
}

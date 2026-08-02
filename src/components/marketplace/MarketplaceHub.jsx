import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  CircleDollarSign,
  Clock3,
  Globe2,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import styles from "./MarketplaceHub.module.css";

const icons = {
  verified: BadgeCheck,
  shield: ShieldCheck,
  people: Users,
  global: Globe2,
  local: MapPin,
  jobs: BriefcaseBusiness,
  salary: CircleDollarSign,
  fast: Clock3,
  quality: Star,
};

export default function MarketplaceHub({ config }) {
  const searchAction = config.search.action;

  return (
    <main className={`${styles.page} ${styles[config.tone]}`}>
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}><Sparkles /> {config.eyebrow}</span>
            <h1>{config.title}{" "}<em>{config.accent}</em></h1>
            <p>{config.description}</p>

            <form className={styles.search} action={searchAction} method="get">
              <label>
                <Search aria-hidden="true" />
                <input name="q" aria-label={config.search.keywordLabel} placeholder={config.search.keywordPlaceholder} />
              </label>
              {config.search.location && (
                <label>
                  <MapPin aria-hidden="true" />
                  <input name="location" aria-label="Location" placeholder={config.search.location} />
                </label>
              )}
              <button type="submit">{config.search.button}<ArrowRight /></button>
            </form>

            <div className={styles.heroTrust}>
              {config.trust.map((item) => (
                <span key={item}><Check />{item}</span>
              ))}
            </div>
          </div>

          <div className={styles.heroVisual}>
            <Image src={config.image} alt={config.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 52vw" />
            <div className={styles.proofCard}>
              <i><BadgeCheck /></i>
              <span><small>{config.proof.label}</small><strong>{config.proof.value}</strong></span>
            </div>
            <div className={styles.ratingCard}>
              <span><Star /> {config.rating.value}</span>
              <small>{config.rating.label}</small>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.stats}`} aria-label="Marketplace highlights">
        {config.stats.map((stat) => {
          const Icon = icons[stat.icon] || ShieldCheck;
          return <article key={stat.label}><Icon /><span><strong>{stat.value}</strong><small>{stat.label}</small></span></article>;
        })}
      </section>

      <section className={`${styles.container} ${styles.section}`}>
        <header className={styles.sectionHeader}>
          <div><span className={styles.eyebrow}>{config.categoryEyebrow}</span><h2>{config.categoryTitle}</h2></div>
          <Link href={config.categoryLink}>Explore all <ArrowRight /></Link>
        </header>
        <div className={styles.categoryGrid}>
          {config.categories.map((category) => {
            const Icon = icons[category.icon] || BriefcaseBusiness;
            return (
              <Link key={category.name} href={category.href} className={styles.categoryCard}>
                <i><Icon /></i>
                <span><strong>{category.name}</strong><small>{category.description}</small></span>
                <ArrowRight />
              </Link>
            );
          })}
        </div>
      </section>

      <section className={`${styles.container} ${styles.featurePanel}`}>
        <div className={styles.featureImage}>
          <Image src={config.feature.image} alt={config.feature.imageAlt} fill sizes="(max-width: 900px) 100vw, 55vw" />
          <div className={styles.featureBadge}>
            <BadgeCheck />
            <span><small>{config.feature.badgeLabel}</small><strong>{config.feature.badgeValue}</strong></span>
          </div>
        </div>
        <div className={styles.featureCopy}>
          <span className={styles.eyebrow}>{config.feature.eyebrow}</span>
          <h2>{config.feature.title}</h2>
          <p>{config.feature.description}</p>
          <ul>
            {config.feature.points.map((point) => <li key={point}><Check />{point}</li>)}
          </ul>
          <Link href={config.feature.href}>{config.feature.cta}<ArrowRight /></Link>
        </div>
      </section>

      <section className={`${styles.container} ${styles.section}`}>
        <header className={styles.sectionHeader}>
          <div><span className={styles.eyebrow}>{config.highlightEyebrow}</span><h2>{config.highlightTitle}</h2></div>
        </header>
        <div className={styles.highlightGrid}>
          {config.highlights.map((item) => (
            <article key={item.title}>
              <header><span>{item.kicker}</span><b>{item.meta}</b></header>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div>{item.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
              <footer><strong>{item.value}</strong><Link href={item.href}>{item.cta}<ArrowRight /></Link></footer>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.pathSection}>
        <div className={styles.container}>
          <header className={styles.centerHeader}>
            <span className={styles.eyebrow}>Choose your route</span>
            <h2>{config.pathTitle}</h2>
            <p>{config.pathDescription}</p>
          </header>
          <div className={styles.pathGrid}>
            {config.paths.map((path) => {
              const Icon = icons[path.icon] || Users;
              return (
                <article key={path.title}>
                  <i><Icon /></i>
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>
                  <Link href={path.href}>{path.cta}<ArrowRight /></Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.section}`}>
        <header className={styles.centerHeader}>
          <span className={styles.eyebrow}>Simple from the start</span>
          <h2>{config.stepsTitle}</h2>
        </header>
        <div className={styles.steps}>
          {config.steps.map((step, index) => (
            <article key={step.title}>
              <b>{index + 1}</b>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.container}>
          <header className={styles.centerHeader}>
            <span className={styles.eyebrow}>Trusted by people doing real work</span>
            <h2>{config.testimonialTitle}</h2>
          </header>
          <div className={styles.testimonials}>
            {config.testimonials.map((item) => (
              <article key={item.name}>
                <div className={styles.stars}>{[1,2,3,4,5].map((star) => <Star key={star} />)}</div>
                <blockquote>“{item.quote}”</blockquote>
                <footer><span>{item.initials}</span><strong>{item.name}<small>{item.role}</small></strong></footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.faqSection}`}>
        <header className={styles.centerHeader}>
          <span className={styles.eyebrow}>Good to know</span>
          <h2>Questions before you get started</h2>
        </header>
        <div className={styles.faqGrid}>
          {config.faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}<span>+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={`${styles.container} ${styles.cta}`}>
        <div>
          <span className={styles.eyebrow}>{config.cta.eyebrow}</span>
          <h2>{config.cta.title}</h2>
          <p>{config.cta.description}</p>
        </div>
        <div className={styles.ctaActions}>
          <Link href={config.cta.primaryHref}>{config.cta.primaryLabel}<ArrowRight /></Link>
          <Link href={config.cta.secondaryHref}>{config.cta.secondaryLabel}</Link>
        </div>
      </section>
    </main>
  );
}

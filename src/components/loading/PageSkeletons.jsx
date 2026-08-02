import styles from "./PageSkeletons.module.css";

function Line({ width = "100%", height }) {
  return <span className={styles.pulse} style={{ width, height }} />;
}

export function FreelancerProfileSkeleton() {
  return (
    <div
      className={styles.page}
      role="status"
      aria-label="Loading freelancer profile"
    >
      <div className={styles.shell}>
        <div className={styles.breadcrumb}>
          <Line width="190px" height="14px" />
        </div>
        <div className={styles.profileGrid}>
          <div>
            <div className={styles.profileCard}>
              <Line height="310px" />
              <div className={styles.profileCopy}>
                <Line width="58%" height="34px" />
                <Line width="42%" height="17px" />
                <Line width="72%" height="14px" />
                <div className={styles.pills}>
                  {[1, 2, 3, 4].map((item) => (
                    <Line key={item} width="74px" height="28px" />
                  ))}
                </div>
                <div className={styles.actions}>
                  <Line height="44px" />
                  <Line height="44px" />
                </div>
              </div>
            </div>
            <div className={styles.statusRow}>
              {[1, 2, 3, 4].map((item) => (
                <Line key={item} height="78px" />
              ))}
            </div>
            <div className={styles.copyCard}>
              <Line width="28%" height="26px" />
              <Line height="14px" />
              <Line width="94%" height="14px" />
              <Line width="76%" height="14px" />
            </div>
          </div>
          <div className={styles.booking}>
            <Line width="46%" height="36px" />
            <Line width="60%" height="13px" />
            <Line height="1px" />
            <div className={styles.calendar}>
              {Array.from({ length: 35 }, (_, item) => (
                <Line key={item} height="22px" />
              ))}
            </div>
            <Line height="44px" />
            <Line height="44px" />
          </div>
        </div>
        <SkeletonSections />
      </div>
      <span className="visually-hidden">Loading profile…</span>
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className={styles.page} role="status" aria-label="Loading details">
      <div className={styles.shell}>
        <div className={styles.breadcrumb}>
          <Line width="210px" height="14px" />
        </div>
        <div className={styles.detailHero}>
          <div>
            <Line width="32%" height="14px" />
            <Line width="78%" height="42px" />
            <Line width="55%" height="18px" />
            <div className={styles.pills}>
              <Line width="82px" height="28px" />
              <Line width="96px" height="28px" />
              <Line width="70px" height="28px" />
            </div>
          </div>
          <Line height="280px" />
        </div>
        <SkeletonSections />
      </div>
      <span className="visually-hidden">Loading details…</span>
    </div>
  );
}

function SkeletonSections() {
  return (
    <div className={styles.sections}>
      {[1, 2].map((section) => (
        <section key={section}>
          <Line width="26%" height="28px" />
          <div className={styles.cards}>
            {[1, 2, 3].map((card) => (
              <div key={card}>
                <Line height="120px" />
                <Line width="72%" height="17px" />
                <Line width="92%" height="13px" />
                <Line width="60%" height="13px" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

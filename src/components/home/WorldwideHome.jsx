import HomeHero from "./HomeHero";
import MarketplaceShowcase from "./MarketplaceShowcase";
import ProcessWorkspace from "./ProcessWorkspace";
import TrustStories from "./TrustStories";
import HomeFaqFooter from "./HomeFaqFooter";
import styles from "./WorldwideHome.module.css";

export default function WorldwideHome() {
  return (
    <main className={styles.page}>
      <HomeHero />
      <MarketplaceShowcase />
      <ProcessWorkspace />
      <TrustStories />
      <HomeFaqFooter />
    </main>
  );
}

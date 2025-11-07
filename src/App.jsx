import { useEffect, useState } from "react";
import Navbar from "./component/navbar";
import SocialBanner from "./component/socialBanner";
import HitItPage from "./component/HitItPage";
import SubpageWatermark from "./component/SubpageWatermark";
import Thoughts from "./component/Thoughts";
import YouAFit from "./component/YouAFit";
import OurShowcase from "./component/OurShowcase";
import JumpIn from "./component/JumpIn";
import homepageBackLogo from "./assets/homepagebacklogo.png";
import styles from "./App.module.css";

const SUBPAGE_WATERMARK_OPACITY = 0.17;

function App() {
  // simple hash-based router
  const [route, setRoute] = useState(() => (window.location.hash || '').replace('#',''));
  useEffect(() => {
    const onHash = () => setRoute((window.location.hash || '').replace('#',''));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  
  // Determine if we're on the homepage (support dev "/" and base path, plus index.html)
  const base = import.meta.env.BASE_URL || "/";
  const path = window.location.pathname;
  const baseWithSlash = base.endsWith('/') ? base : `${base}/`;
  const homeCandidates = new Set([
    '/',
    baseWithSlash,
    `${baseWithSlash}index.html`,
  ]);
  const isHome = homeCandidates.has(path);

  // Route to subpages by hash
  if (route === 'hitit') return <HitItPage />;
  if (route === 'thoughts') return <Thoughts />;
  if (route === 'thoughts-format') return <Thoughts scrollTo="format" />;
  if (route === 'youafit') return <YouAFit />;
  if (route === 'showcase') return <OurShowcase />;
  if (route === 'jumpin') return <JumpIn />;

  return (
    <div className="App">
      {/* Background watermark (fixed) only on subpages */}
      {!isHome && (
        <SubpageWatermark size="45vw" opacity={SUBPAGE_WATERMARK_OPACITY} position="center center" zIndex={0} />
      )}

      {/* Subtle glitter overlay to make background a bit brighter */}
      <div className="glitter-overlay" aria-hidden="true" />

      {/* Social banner and top links removed */}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {!isHome && <Navbar />}

        {/* Hero section on homepage that scrolls with content */}
        {isHome && (
          <section className={styles["hero-section"]} aria-label="Homepage hero">
            <div className={styles["hero-container"]}>
              {/* Left: Image */}
              <div className={styles["hero-left"]}>
                {/* Mobile hamburger and dropdown removed on homepage */}
                <img
                  className={`${styles["hero-fade-in"]} ${styles["hero-image"]}`}
                  src={homepageBackLogo}
                  alt="NRI Stories emblem"
                />
              </div>

              {/* Right: Copy */}
              <div className={`${styles["hero-right"]} copy-slide-in`}>
                {/* Top links removed */}
                {/* Tagline above the main headline */}
               
                <p className={`${styles["hero-subcopy"]} line-slide delay-1`}>
                  NRI Stories<span className="reg-mark">®</span><br></br> is a next-generation storytelling platform<br/>Authentic stories<br></br>from the global Indian diaspora.<br/> 
                  Told straight from the heart.<br/> 
                  In a visually immersive, documentary-style.
                </p>
                <h1 className={styles["headline"]}>
                  <span className={"line-slide delay-2 " + styles["headline-spaced"]}>Real People.</span>
                  <span className={"line-slide delay-3 " + styles["headline-spaced"]}>Real Journeys.</span>
                  <span className="line-slide delay-4">Real Emotions.</span>
                </h1>
                
                <button className="share-button popout-hitit-button line-slide delay-4" onClick={() => { window.location.hash = '#hitit'; }}>
                  Hit It
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;

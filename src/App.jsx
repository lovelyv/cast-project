import { useEffect, useState, useRef } from "react";
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
  const heroRef = useRef(null);
  const subcopyRef = useRef(null);
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
          <section className={styles["hero-section"]} aria-label="Homepage hero" ref={heroRef}>
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
               
                <p ref={subcopyRef} className={`${styles["hero-subcopy"]}`}> 
                  <span className={styles.embossed}><span className={styles.nowrap}>NRI stories<span className={styles['reg-mark']}>®</span></span></span><br></br> 
                  is a next generation<br/>storytelling podcast.<br></br><br></br>Authentic stories<br></br>from the global Indian diaspora.<br></br><br></br>
                  Told straight from the heart.<br/> 
                  In a visually immersive,<br/> <span className={styles.nowrap}>documentary style format.</span><br/>
                  We have coined it as D<span style={{fontSize: '0.7em'}}>OCU</span>C<span style={{fontSize: '0.7em'}}>AST</span>™.
                </p>
                <h1 className={styles["headline"]} style={{textAlign: 'center', lineHeight: 1.1}}>
                  <span className={styles["headline-people"]}>REAL PEOPLE.</span><br/>
                  <span className={styles["headline-journeys"]}>REAL JOURNEYS.</span>
                  <span className={styles["headline-emotions"]}>REAL EMOTIONS.</span>
                </h1>
                <div style={{ marginTop: '2.2rem' }}></div>
                <button
                  className={styles.pulse}
                  style={{
                    background: 'linear-gradient(90deg, #FFD700 0%, #FFF8DC 40%, #FFD700 60%, #B8860B 100%)',
                    color: '#3a2600',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    borderRadius: '2.2rem',
                    boxShadow: '0 2px 12px 0 rgba(255,140,0,0.10)',
                    cursor: 'pointer',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'block',
                    padding: '0.9em 2.2em',
                  }}
                  onClick={() => { window.location.hash = '#hitit'; }}
                >
                  Hit It
                </button>
                {/* Restore original slide-in and showButton logic for Hit It button */}
                {/*
                {slideIn && showButton && (
                 
                )}
                */}
                <div className={styles['bottom-spacer']} aria-hidden="true"></div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
export default App;

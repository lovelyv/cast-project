import { useEffect, useState } from "react";
import Navbar from "./component/navbar";
import SocialBanner from "./component/socialBanner";
import HitItPage from "./component/HitItPage";
import SubpageWatermark from "./component/SubpageWatermark";
import Thoughts from "./component/Thoughts";
import logo from "./assets/logo.png";
import homepageBackLogo from "./assets/homepagebacklogo.png";
//import topBanner from "./assets/tobbanner.png";

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

  return (
    <div className="App">
      {/* Background watermark (fixed) only on subpages */}
      {!isHome && (
        <SubpageWatermark size="45vw" opacity={0.15} position="center center" zIndex={0} />
      )}

      {/* Subtle glitter overlay to make background a bit brighter */}
      <div className="glitter-overlay" aria-hidden="true" />

      {/* Social banner and top links removed */}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {!isHome && <Navbar />}

        {/* Hero section on homepage that scrolls with content */}
        {isHome && (
          <section
            className="hero-section"
            style={{
              height: 'min(100svh, 100vh)',
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'flex-start',
              width: '100%',
              padding: '0',
              margin: '0',
              position: 'relative',
              overflowX: 'hidden',
            }}
            aria-label="Homepage hero"
          >
            <div className="hero-container" style={{
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'flex-start',
              width: '100%',
              gap: 0,
              flexWrap: 'nowrap',
            }}>
              {/* Left: Image */}
              <div
                className="hero-left"
                style={{
                  flex: '0 0 var(--left-width, 58vw)',
                  maxWidth: 'var(--left-width, 58vw)',
                  minWidth: 0,
                  overflow: 'hidden',
                  marginLeft: 0,
                  marginRight: 0,
                  position: 'relative',
                  height: 'var(--left-height, 100vh)',
                }}
              >
                {/* Mobile hamburger and dropdown removed on homepage */}
                <img
                  className="hero-fade-in hero-image"
                  src={homepageBackLogo}
                  alt="NRI Stories emblem"
                  style={{
                    width: 'var(--hero-img-width, auto)',
                    height: 'var(--hero-img-height, 100%)',
                    maxWidth: 'var(--left-width, 58vw)',
                    display: 'block',
                    objectFit: 'contain',
                    objectPosition: 'left center',
                    padding: '0',
                    border: 'none',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Right: Copy */}
              <div
                className="hero-right copy-slide-in"
                style={{
                  flex: '0 0 auto',
                  maxWidth: 'var(--right-width, 38vw)',
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginLeft: 0,
                  position: 'relative',
                }}
              >
                {/* Top links removed */}

                <h1 style={{
                  margin: 0,
                  fontWeight: 800,
                  fontSize: 'clamp(24px, 4.8vw, 64px)',
                  lineHeight: 1.1,
                  letterSpacing: '0.2px',
                  color: '#FFFF33', /* fluorescent yellow */
                }}>
                  <span className="line-slide delay-1">Real People.</span>
                  <span className="line-slide delay-2">Real Journeys.</span>
                  <span className="line-slide delay-3">Real Emotions.</span>
                </h1>
                <p className="hero-subcopy line-slide delay-4" style={{ marginTop: '14px' }}>
                  NRI Stories™ is a next-generation storytelling platform <br/>
                  Authentic stories from the global Indian diaspora.<br/> 
                  Told straight from the heart.<br/> 
                  In a visually immersive, documentary-style.
                </p>
                <button className="share-button line-slide delay-4" onClick={() => { window.location.hash = '#hitit'; }}>
                  Hit It <span aria-hidden="true"></span>
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

import Navbar from "./component/navbar";
import SocialBanner from "./component/socialBanner";
import logo from "./assets/logo.png";
import homepageBackLogo from "./assets/homepagebacklogo.png";

function App() {
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

  return (
    <div className="App">
      {/* Background watermark (fixed) only on subpages */}
      {!isHome && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${logo})`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '45vw auto',
          opacity: 0.15,
          pointerEvents: 'none',
          zIndex: 0
        }} />
      )}

      {/* Subtle glitter overlay to make background a bit brighter */}
      <div className="glitter-overlay" aria-hidden="true" />

      {/* Top concept link removed */}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Social icons strip at top-right on all pages */}
        <SocialBanner position="top-right" size="sm" />
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
                <img
                  className="hero-fade-in hero-image"
                  src={homepageBackLogo}
                  alt="NRI Stories emblem"
                  style={{
                    width: 'var(--hero-img-width, auto)',
                    height: 'var(--hero-img-height, 100%)',
                    maxWidth: 'var(--left-width, 58vw)',
                    maxHeight: '100vh',
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
                <h1 style={{
                  margin: 0,
                  fontWeight: 800,
                  fontSize: 'clamp(24px, 4.8vw, 64px)',
                  lineHeight: 1.1,
                  letterSpacing: '0.2px',
                }}>
                  <span className="line-slide delay-1">Real People.</span>
                  <span className="line-slide delay-2">Real Journeys.</span>
                  <span className="line-slide delay-3">Real Emotions.</span>
                </h1>
                <p className="hero-subcopy line-slide delay-4" style={{ marginTop: '14px' }}>
                  Authentic stories from the global Indian diaspora - told straight from the heart in a visually immersive, documentary-style format.
                </p>
                <button className="share-button line-slide delay-4">
                  Share Your Story
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

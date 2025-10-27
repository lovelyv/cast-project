import Navbar from "./component/navbar";
import nriimage from "./assets/nri1.png";
import InfoBox from "./component/infobox";

function App() {
  return (
    <div className="App">
      <style>{`
        /* Medium-only spacing: offset right box and clear fixed navbar */
        @media (min-width: 769px) and (max-width: 1024px) {
          .info-box-row.right .info-box-wrapper {
            margin-right: 2.5% !important;
          }
          .main-layout {
            padding-top: 4% !important;
          }
          .heading-text {
            margin-top: 1rem !important;
            white-space: nowrap !important;
          }
        }
        @media (min-width: 1025px) {
          .heading-text {
            white-space: nowrap !important;
          }
        }
        @media (max-width: 1024px) {
          .info-box-row.right {
            padding-right: 2.5% !important;
          }
          .content-column {
            padding-right: 2.5% !important;
          }
        }
        @media (max-width: 768px) {
          .info-box-wrapper {
            width: 100% !important;
            max-width: 100% !important;
          }
          .info-box-row {
            justify-content: center !important;
            padding-right: 4% !important;
          }
          /* Remove medium-only right margin on small screens to prevent overflow */
          .info-box-row.right .info-box-wrapper {
            margin-right: 0 !important;
          }
          .main-layout {
            flex-direction: column !important;
            padding-top: 80px !important;
          }
          .image-column {
            flex: 0 0 auto !important;
            width: 100% !important;
            margin-top: 0 !important;
          }
          .image-column img {
            padding-left: 0 !important;
            padding-top: 0 !important;
            height: 50vh !important;
          }
          .content-column {
            padding-right: 4% !important;
          }
        }
      `}</style>
      <Navbar />
      <div className="main-layout" style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        padding: '0 20px',
        alignItems: 'center',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflow: 'visible',
        justifyContent: 'center'
      }}>
        {/* Left: responsive image */}
  <div className="image-column" style={{ flex: '0 0 50%', display: 'flex', justifyContent: 'center', overflow: 'hidden', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', borderTopRightRadius: '8px', borderBottomRightRadius: '8px', boxShadow: '0 8px 24px rgba(16,24,40,0.08)' }}>
          <img
            src={nriimage}
            alt="NRI"
            style={{
              width: '100%',
              height: '75vh',
              objectFit: 'cover',
              paddingLeft: 0,
              boxSizing: 'border-box',
              borderRadius: 0
            }}
          />
        </div>

        {/* Right: heading and alternating InfoBoxes */}
  <div className="content-column" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', paddingRight: '2.5%', minWidth: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
          <p className="heading-text" style={{
            display: 'block',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 4vw, 4rem)',
            margin: 0,
            marginTop: '2rem',
            width: '100%',
            maxWidth: '100%',
            alignSelf: 'stretch',
            color: '#f3f4f6',
            lineHeight: 1.3,
            letterSpacing: '0.2px',
            fontFamily: "'Segoe UI', Roboto, system-ui, -apple-system, 'Helvetica Neue', Arial",
            textAlign: 'center',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            overflow: 'visible'
          }}>
            The viewing experience.
          </p>

          <div style={{ width: '100%', margin: '2rem auto 0', display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'visible' }}>
            {/* Box 1 - Left */}
            <div className="info-box-row" style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
              <div className="info-box-wrapper" style={{ width: '50%', minWidth: 0 }}>
                <InfoBox>
                  <strong>Visual Storytelling</strong>
                  <p>Cinematic B-roll, archival images and on-location frames add context and depth.</p>
                </InfoBox>
              </div>
            </div>

            {/* Box 2 - Right */}
            <div className="info-box-row right" style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', overflow: 'visible' }}>
              <div className="info-box-wrapper" style={{ width: '50%', minWidth: 0, maxWidth: '50%' }}>
                <InfoBox>
                  <strong>Sound you can feel</strong>
                  <p>Voice first, with layered sound design and a score that supports the emotion — never distracts.</p>
                </InfoBox>
              </div>
            </div>

            {/* Box 3 - Left; pulled slightly closer to Box 2 */}
            <div className="info-box-row" style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '-6px', width: '100%' }}>
              <div className="info-box-wrapper" style={{ width: '50%', minWidth: 0 }}>
                <InfoBox>
                  <strong>Editorial arcs</strong>
                  <p>Each episode is structured for momentum — opening hook, rising stakes, resolution, and reflection.</p>
                </InfoBox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 
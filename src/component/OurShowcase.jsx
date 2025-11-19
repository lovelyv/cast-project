import React from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import Footer from './Footer';


import styles from './OurShowcase.module.css';
import youaFitStyles from './YouAFit.module.css';
import SocialLinksBar from './SocialLinksBar';

function OurShowcase() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className={styles['all-page-showcase']} style={{ flex: 1 }}>
        <SubpageWatermark size="60vmin" position="center center" zIndex={0} />
      <h2 className={styles["showcase-h2"]}>
        PRESERVE your JOURNEY,<br/>INSPIRE the NEXT ONE.
      </h2>

        {/* Ticker Thumbnails Row 1 */}
        <div style={{
          display: 'flex',
          gap: '1em',
          justifyContent: 'center',
          margin: '2em 0 1em 0',
        }}>
          {[1,2,3,4].map((n) => (
            <a
              key={n}
              href={`https://www.example.com/ticker${n}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: 64,
                height: 64,
                borderRadius: '0.5em',
                background: `#222 url(https://img.youtube.com/vi/dQw4w9WgXcQ/${n}.jpg) center/cover no-repeat`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                border: '2px solid #fff',
                transition: 'transform 0.15s',
                overflow: 'hidden',
              }}
              tabIndex={0}
              title={`Dummy Ticker ${n}`}
            >
            </a>
          ))}
        </div>
        {/* Ticker Thumbnails Row 2 */}
        <div style={{
          display: 'flex',
          gap: '1em',
          justifyContent: 'center',
          margin: '0 0 1.5em 0',
        }}>
          {[5,6,7,8].map((n) => (
            <a
              key={n}
              href={`https://www.example.com/ticker${n}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: 64,
                height: 64,
                borderRadius: '0.5em',
                background: `#222 url(https://img.youtube.com/vi/dQw4w9WgXcQ/${n}.jpg) center/cover no-repeat`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                border: '2px solid #fff',
                transition: 'transform 0.15s',
                overflow: 'hidden',
              }}
              tabIndex={0}
              title={`Dummy Ticker ${n}`}
            >
            </a>
          ))}
        </div>

       

      

         <h2 className={styles["showcase-follow-h2"]}>Follow Us</h2>
          <div className={styles.socialShowcaseRow}>
            <SocialLinksBar size="sm" className="noMarginBottom" />
           
          </div>
      </div>
      <Footer />
    </div>
  );
}

export default OurShowcase;

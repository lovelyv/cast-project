import React from 'react';
import { TICKERS } from '../config';
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
        PRESERVE your JOURNEY.<br/>INSPIRE the NEXT ONE.
      </h2>

        {/* Ticker Thumbnails Grid */}
        <div className={styles['ticker-thumbnails-row']}>
          {TICKERS.map((ticker) => (
            <a
              key={ticker.id}
              href={ticker.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: 84,
                height: 84,
                borderRadius: '0.7em',
                background: `#222 url(${ticker.img}) center/cover no-repeat`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                border: '2px solid #fff',
                transition: 'transform 0.15s',
                overflow: 'hidden',
              }}
              tabIndex={0}
              title={ticker.title}
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

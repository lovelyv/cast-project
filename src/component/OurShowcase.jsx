import React from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import Footer from './Footer';

import styles from './OurShowcase.module.css';
import youaFitStyles from './YouAFit.module.css';

function OurShowcase() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className={styles['all-page-showcase']} style={{ flex: 1 }}>
        <SubpageWatermark size="60vmin" position="center center" zIndex={0} />
        <h1 className={styles["showcase-h2"]}>The Stories We Tell</h1>
        <div className={styles['showcase-content-bg']}>
          <span><strong>Resilience</strong>:&nbsp;from student visas to citizenships;<br/> the grit behind every milestone.</span><br/>
          <span><strong>Sacrifice</strong>:&nbsp;separation, cultural displacement<br/>and emotional endurance.</span><br/>
          <span><strong>Ambition</strong>:&nbsp;entrepreneurs, innovators and <br/>creators shaping industries worldwide.</span><br/>
          <span><strong>Identity:</strong>:&nbsp;families navigating dual worlds <br/>between roots and reinvention.</span><br/>
          <span><strong>Inspiration:</strong>: ordinary lives with<br/>extraordinary spirit.</span>
          <p className={styles.contrastText}>Immortalizing across digital platforms<br/> for all times to come</p>
        </div>

        {/* Ticker Thumbnails Row */}
        <div style={{
          display: 'flex',
          gap: '1em',
          justifyContent: 'center',
          margin: '2em 0 1em 0',
        }}>
          {[1,2,3,4,5].map((n) => (
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

        {/* Video Tickers Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5em',
          margin: '2em auto 0 auto',
          maxWidth: 700,
        }}>
          {[1,2,3,4,5,6].map((n) => (
            <a
              key={n}
              href={`https://www.example.com/video${n}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                aspectRatio: '16/9',
                background: '#222 url(https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg) center/cover no-repeat',
                borderRadius: '1em',
                position: 'relative',
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)',
                overflow: 'hidden',
                transition: 'transform 0.18s',
              }}
              tabIndex={0}
            >
              <span style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#fff',
                fontSize: '2.5em',
                background: 'rgba(0,0,0,0.4)',
                borderRadius: '50%',
                width: 56,
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
              }}>
                ▶
              </span>
            </a>
          ))}
        </div>

        {/* Jump In Button - now directly below the grid */}
  <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 2.5em 0' }}>
          <a
            href="#jumpin"
            className={youaFitStyles['jumpin-btn']}
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
          >
            <span>Jump In</span>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OurShowcase;

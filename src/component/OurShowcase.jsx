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
          <span><strong>Resilience</strong>:&nbsp;from student visas to citizenships; the grit behind every milestone.</span><br/>
          <span><strong>Sacrifice</strong>:&nbsp;separation, cultural displacement, and emotional endurance.</span><br/>
          <span><strong>Ambition</strong>:&nbsp;entrepreneurs, innovators, and creators shaping industries worldwide.</span><br/>
          <span><strong>Identity</strong>:&nbsp;families navigating dual worlds — between roots and reinvention.</span><br/>
          <span><strong>Inspiration</strong>:&nbsp;ordinary lives with extraordinary spirit.</span><br/>
          <span><strong>Identity:</strong>:&nbsp;families navigating dual worlds — between roots and reinvention.</span><br/>
          <span><strong>Inspiration:</strong>: ordinary lives with extraordinary spirit.</span>
          <p className={styles.contrastText}>Immortalizing across digital platforms for all times to come</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2em 0 0 0' }}>
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

import React from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import styles from './OurShowcase.module.css';

function OurShowcase() {
  return (
    <div className="App">
      {/* Background watermark */}
      <SubpageWatermark size="60vmin" position="center center" zIndex={0} />

      <Navbar />

      <div className="all-page">
        <div className="all-page-container">
          <h1 style={{ marginTop: '60px' }}>The Stories We Tell</h1>
          
          <p>
            <strong className={styles.storiesOf}>Resilience:</strong> from student visas to citizenships; the grit behind every milestone.
          </p>
          <p>
            <strong className={styles.storiesOf}>Sacrifice:</strong> separation, cultural displacement, and emotional endurance.
          </p>
          <p>
            <strong className={styles.storiesOf}>Ambition:</strong> entrepreneurs, innovators, and creators shaping industries worldwide.
          </p>
          <p>
            <strong className={styles.storiesOf}>Identity:</strong> families navigating dual worlds — between roots and reinvention.
          </p>
          <p>
            <strong className={styles.storiesOf}>Inspiration:</strong> ordinary lives with extraordinary spirit.
          </p>
          <p className={styles.contrastText}>Immortalizing across digital platforms for all times to come</p>
          
        </div>
      </div>
    </div>
  );
}

export default OurShowcase;

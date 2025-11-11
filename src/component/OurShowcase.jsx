import React from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import styles from './OurShowcase.module.css';

function OurShowcase() {
  return (
      <div className={styles['all-page-showcase']}> 
      <Navbar />    
        <SubpageWatermark size="60vmin" position="center center" zIndex={0} />
             <div className={styles['showcase-content-bg']}>
          <h1 className={styles["showcase-h2"]}>
            The Stories We Tell</h1>
          <span><strong>Resilience</strong>:&nbsp;from student visas to citizenships; the grit behind every milestone.</span><br/>

          <span><strong>Sacrifice</strong>:&nbsp;separation, cultural displacement, and emotional endurance.</span><br/>

          <span><strong>Ambition</strong>:&nbsp;entrepreneurs, innovators, and creators shaping industries worldwide.</span><br/>

          <span><strong>Identity</strong>:&nbsp;families navigating dual worlds — between roots and reinvention.</span><br/>

          <span><strong>Inspiration</strong>:&nbsp;ordinary lives with extraordinary spirit.</span><br/>
          <span><strong>Identity:</strong>:&nbsp;families navigating dual worlds — between roots and reinvention.</span><br/>
           <span><strong>Inspiration:</strong>: ordinary lives with extraordinary spirit.</span>
          
          <p className={styles.contrastText}>Immortalizing across digital platforms for all times to come</p>
          
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '2.5em' }}>
          <a href="#jumpin" className={styles['jumpin-link']} style={{ marginRight: '2vw' }}>
            <span style={{ fontSize: '1.5em', lineHeight: 1, display: 'inline-block', transform: 'translateY(1px)' }}>&rarr;</span>
            <span>Jump In</span>
          </a>
        </div>
      </div>
   
  );
}

export default OurShowcase;

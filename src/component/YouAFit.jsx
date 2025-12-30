import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTACT } from '../config';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
  import appStyles from '../App.module.css';
import styles from './YouAFit.module.css';
import Footer from './Footer';

function YouAFit() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);
  return (
   <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
       <div className={appStyles['all-page']}>
      <SubpageWatermark size="60vmin" position="center center" zIndex={0} />
      <div className={styles['youafit-content-bg']}>
        <span style={{ whiteSpace: 'nowrap', fontWeight: 700 }}>
          NRI stories
          <span className="reg-mark" style={{ verticalAlign: 'super' }}>®</span>
        </span>
        is looking forward to showcase you.
        <p>
          Reach out to us<br />if you or someone you know<br />has a story to tell<br />
          that fits any of these criteria.<br />
        </p>
  <h2 className={`${appStyles.headline} ${styles.headlineSpacing}`}>Stories of</h2>
        <div className={styles['stories-of']}>
          Success.<br />Sacrifices.<br />Raw emotions.<br />Overriding ambition.<br />
          Guts, valour and hard work.<br /><br />
        </div>
        
        
        <div className={styles['stories-of']}>
          Facing hurdles.<br />Motivational value.<br />Steely determination.<br />
          A never-say-die approach.<br />Attaining freedom & security.<br />
          Exemplary grit & perseverance.<br />Insulating family from insecurities.<br />
          Protracted separation from loved ones.<br />Consistent, persistent and steadfast focus.<br /><br />
        </div>
        
        
        <div className={styles['stories-of']}>
          Startups.<br />
          Market leaders.<br />
          Business acumen.<br />
          Being emulation worthy.<br />
          Trend setters and influencers.
        </div>
        <p>
            <br />
          <span style={{ fontWeight: 500 }}>Text, mail or call us.<br />We will reach out to you.</span>
        </p>
       <button
        className={appStyles['btn']}
        onClick={() => navigate('/jumpin')}>
          Jump In
        </button>
      </div>
       
      <Footer />
       </div>
    </div>
  );
}

export default YouAFit;

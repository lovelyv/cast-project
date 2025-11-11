import React from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import styles from './YouAFit.module.css';

function YouAFit() {
  return (
    <div className={styles['youafit-page']}>
      <Navbar />
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
        <h2 className={styles['youafit-h2']}>Stories of</h2>
        <div className={styles['stories-of']}>
          Success.<br />Sacrifices.<br />Raw emotions.<br />Overriding ambition.<br />
          Guts, valour and hard work.<br /><br />
        </div>
        <h2 className={styles['youafit-h2']}>Stories of</h2>
        <div className={styles['stories-of']}>
          Facing hurdles.<br />Motivational value.<br />Steely determination.<br />
          A never-say-die approach.<br />Attaining freedom & security.<br />
          Exemplary grit & perseverance.<br />Insulating family from insecurities.<br />
          Protracted separation from loved ones.<br />Consistent, persistent and steadfast focus.<br /><br />
        </div>
        <h2 className={styles['youafit-h2']}>Stories of</h2>
        <div className={styles['stories-of']}>
          Students.<br />Asylum seekers.<br />
          Undocumented aliens.<br />
          Being emulation worthy.<br />
          Families – wives, kids, parents.<br /><br />
        </div>
        <h2 className={styles['youafit-h2']}>Stories of</h2>
        <div className={styles['stories-of']}>
          The rich and powerful.<br />
          Startups.<br />
          Market leaders.<br />
          Business acumen.<br />
          Creating employment.<br />
          Helming organisations.<br />
          Trend setters and influencers.
        </div>
        <p>
          Text, mail or call us.<br /> we will reach out to you.
        </p>
        {/* Info boxes removed as requested */}
        <p>
          <strong>Email:</strong> <a style={{ color: '#D2691E', textDecoration: 'underline' }}>stories@nristories.com</a>
        </p>
        <p>
          <strong>Text:</strong> <a style={{ color: '#D2691E', textDecoration: 'underline' }}>+1 (234) 567-890</a>
        </p>
      </div>
      {/* Stackable links below last element */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5em' }}>
        <a href="#thoughts" className={styles['thoughts-link']} style={{ marginLeft: '2vw' }}>
          <span style={{ fontSize: '1.5em', lineHeight: 1, display: 'inline-block', transform: 'translateY(1px)' }}>&larr;</span>
          <span>The Thoughts</span>
        </a>
        <a href="#jumpin" className={styles['jumpin-link']} style={{ marginRight: '2vw' }}>
          <span style={{ fontSize: '1.5em', lineHeight: 1, display: 'inline-block', transform: 'translateY(1px)' }}>&rarr;</span>
          <span>Jump In</span>
        </a>
      </div>
    </div>
  );
}

export default YouAFit;

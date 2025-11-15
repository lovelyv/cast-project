import React from 'react';
import { CONTACT } from '../config';
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
          
          Startups.<br />
          Market leaders.<br />
          Business acumen.<br />
          Creating employment.<br />
          The rich and powerful.<br />
          Being emulation worthy.<br />
          Trend setters and influencers.
        </div>
        <p>
          Text, mail or call us.<br /> we will reach out to you.
        </p>
        {/* Info boxes removed as requested */}
        {/* Email contact above, removed duplicate */}

         <p>
          <strong>Email:</strong>{' '}
          <a
            href={`mailto:${CONTACT.EMAIL}`}
            style={{ color: '#D2691E', textDecoration: 'underline' }}
          >
            {CONTACT.EMAIL}
          </a>
        </p>

        <p>
          <strong>Text:</strong>{' '}
          {(() => {
            const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
            // Format the SMS number for display (e.g., +1234567890 -> +1 (234) 567-890)
            const raw = CONTACT.SMS_NUMBER;
            let displayNumber = raw;
            const match = raw.match(/^\+(\d)(\d{3})(\d{3})(\d{4})$/);
            if (match) {
              displayNumber = `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
            }
            if (isMobile) {
              return (
                <a
                  href={`sms:${CONTACT.SMS_NUMBER}`}
                  style={{ color: '#D2691E', textDecoration: 'underline' }}
                  className="mobile-tel-link"
                >
                  {displayNumber}
                </a>
              );
            } else {
              return <span style={{ color: '#D2691E', textDecoration: 'underline' }}>{displayNumber}</span>;
            }
          })()}
        </p>
      </div>
      {/* Stackable links below last element */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5em' }}>
        <a
          href="#thoughts"
          className={styles['thoughts-link']}
          style={{ marginLeft: '2vw' }}
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
        >
          <span style={{ fontSize: '1.5em', lineHeight: 1, display: 'inline-block', transform: 'translateY(1px)' }}>&larr;</span>
          <span>The Thoughts</span>
        </a>
        <a
          href="#jumpin"
          className={styles['jumpin-link']}
          style={{ marginRight: '2vw' }}
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
        >
          <span style={{ fontSize: '1.5em', lineHeight: 1, display: 'inline-block', transform: 'translateY(1px)' }}>&rarr;</span>
          <span>Jump In</span>
        </a>
      </div>
    </div>
  );
}

export default YouAFit;

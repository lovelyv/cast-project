import React from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import Footer from './Footer';
import styles from './SupportUs.module.css';

function SupportUs() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className={styles.supportUsPage}>
        <SubpageWatermark size="60vmin" position="center center" zIndex={0} />
        <h1 className={styles.title}>Support Us</h1>
        <p className={styles.description}>
          NRI Stories is a passion project dedicated to sharing authentic journeys from the global Indian diaspora.<br/><br/>
          If you enjoy our work and want to help us grow, you can support us in the following ways:
        </p>
        <ul className={styles.supportList}>
          <li>Share our podcast and website with friends and family</li>
          <li>Follow us on social media and engage with our content</li>
          <li>Send us your feedback and story ideas</li>
          <li>Consider making a donation to help us cover production costs</li>
        </ul>
        <div className={styles.donateBox}>
          <h2>Make a Donation</h2>
          <p>Every contribution helps us keep telling real stories. Thank you for your support!</p>
          <a href="mailto:contact@nristories.com?subject=Support%20NRI%20Stories" className={styles.donateBtn}>Contact Us to Donate</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SupportUs;

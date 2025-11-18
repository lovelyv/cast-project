import React from 'react';
import styles from './Footer.module.css';
import { CONTACT } from '../config';
import SocialLinksBar from './SocialLinksBar';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerRow}>
        <div className={styles.footerContent}>
        
          <div className={styles.contactDetails}>
            <span><a href={`mailto:${CONTACT.EMAIL}`}>{CONTACT.EMAIL}</a></span>
            <span><a href={`tel:${CONTACT.SMS_NUMBER}`}>{CONTACT.SMS_NUMBER}</a></span>
          </div>
        </div>
        <div className={styles.showcaseRight}>
          <a href="#showcase" className={styles.showcaseLink}>
            Our Showcase
          </a>
          <SocialLinksBar size="xs" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

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
            <span>
              <a
                href={`https://wa.me/${CONTACT.SMS_NUMBER.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: '0.5em' }}
              >
                {CONTACT.SMS_NUMBER} (WhatsApp)
              </a>
              <a
                href={`sms:${CONTACT.SMS_NUMBER}`}
                style={{ fontSize: '0.95em', color: '#888' }}
              >
                or Text us
              </a>
            </span>
          </div>
        </div>
        <div className={styles.showcaseRight}>
          <SocialLinksBar size="xs" className="footer-social-icons" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

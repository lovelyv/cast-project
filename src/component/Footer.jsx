import React from 'react';
import whatsappIcon from '../assets/whatsapp-green.svg';
import thoughtIcon from '../assets/thought-dots.svg';
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
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3em' }}>
              <a
                href={`tel:${CONTACT.SMS_NUMBER}`}
                style={{ color: 'inherit', textDecoration: 'none', marginRight: '0.2em' }}
              >
                {CONTACT.SMS_NUMBER}
              </a>
              <a
                href={`https://wa.me/${CONTACT.SMS_NUMBER.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <img src={whatsappIcon} alt="WhatsApp" style={{ width: 18, height: 18, verticalAlign: 'middle' }} />
              </a>
              <a
                href={`sms:${CONTACT.SMS_NUMBER}`}
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <img src={thoughtIcon} alt="Text us" style={{ width: 20, height: 20, verticalAlign: 'middle' }} />
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

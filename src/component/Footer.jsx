import React, { useState } from 'react';
import whatsappIcon from '../assets/whatsapp-green.svg';
import thoughtIcon from '../assets/thought-dots.svg';
import styles from './Footer.module.css';
import { CONTACT } from '../config';
import SocialLinksBar from './SocialLinksBar';
import { Link } from 'react-router-dom';

function Footer() {
  const [showContact, setShowContact] = useState(false);
  return (
    <footer className={styles.footer}>
      <div className={styles.footerRow}>
        <div className={styles.footerContent}>
          <div className={styles.contactExpanderBox}>
            <div className={styles.contactShowcaseRow}>
              <button
                className={styles.contactExpanderBtn}
                aria-expanded={showContact}
                aria-controls="footer-contact-details"
                onClick={() => setShowContact(v => !v)}
              >
                <span className={styles.contactExpanderBtnText}>Contact</span>
                <span className={styles.expanderIcon} aria-hidden="true">
                  {showContact ? '\u2013' : '+'}
                </span>
              </button>
              <Link to="/showcase" className={styles.showcaseFooterLink}>Showcase</Link>
              <Link to="/jumpin" className={styles.showcaseFooterLink}>Jump In</Link>
              <Link to="/supportus" className={styles.showcaseFooterLink}>Support Us</Link>
            </div>
            <div
              id="footer-contact-details"
              className={styles.contactDetails}
              style={{ maxHeight: showContact ? 200 : 0, opacity: showContact ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.3s cubic-bezier(.4,2,.6,1), opacity 0.2s' }}
            >
              <span><a href={`mailto:${CONTACT.EMAIL}`}>{CONTACT.EMAIL}</a></span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.7em' }}>
                <a
                  href={`tel:${CONTACT.SMS_NUMBER}`}
                  style={{ color: 'inherit', textDecoration: 'none', marginRight: '0.2em' }}
                >
                  {CONTACT.SMS_NUMBER}
                </a>
                <a
                  href={`https://wa.me/${CONTACT.SMS_NUMBER.replace(/[^\\d]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                  <img src={whatsappIcon} alt="WhatsApp" style={{ width: 24, height: 24, verticalAlign: 'middle' }} />
                </a>
                <a
                  href={`sms:${CONTACT.SMS_NUMBER}`}
                  style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                  <img src={thoughtIcon} alt="Text us" style={{ width: 26, height: 26, verticalAlign: 'middle' }} />
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.showcaseRight}>
          {/* Increase footer social icon size from xs to sm */}
          <SocialLinksBar size="sm" className="footer-social-icons" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span className={styles.contactTitle}>Contact Us</span>
        <div className={styles.contactDetails}>
          <span>Email: <a href="mailto:contact@nristories.com">contact@nristories.com</a></span>
          <span>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

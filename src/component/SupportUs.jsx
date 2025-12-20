import React, { useState } from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import Footer from './Footer';
import styles from './SupportUs.module.css';
import { CONTACT, DONATE_LINKS } from '../config';
import emailIcon from '../assets/email.svg';
import phoneIcon from '../assets/phone.svg';
import whatsappIcon from '../assets/whatsapp-green.svg';
import smsIcon from '../assets/sms.svg';

function SupportUs() {
  const [chipOpen, setChipOpen] = useState(false);
  const [chipAmount, setChipAmount] = useState('5');
  const handleProceedDonation = () => {
    const url = DONATE_LINKS[Number(chipAmount)];
    if (url && typeof url === 'string' && url.length > 0) {
      window.open(url, '_blank', 'noopener');
      setChipOpen(false);
    } else {
      alert('Donation link is not configured yet. Please add your Stripe Payment Link for the selected amount in src/config.js.');
    }
  };
  return (
    <div className={styles.pageRoot}>
      <Navbar />
      <div className={styles.supportUsPage}>
        <SubpageWatermark size="60vmin" position="center center" zIndex={0} />
        {/* Small sample video on top */}
        <div className={styles.videoSection}>
          <video
            className={styles.videoFrame}
            controls
            preload="metadata"
            playsInline
            muted
            poster="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm.jpg"
          >
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className={styles.videoCaption}>Sample video (short, muted)</div>
        </div>
        <h1 className={styles.title}>Support Us</h1>
        <div className={styles.description}>
          We are a group of<br/>
          committed communication professionals.<br/>
          Wanting to immortalise unsung heroes.<br/>
          By airing their stories as a video biography.<br/>
          In this we need your help.
        </div>
        <div className={styles.leftBoxWide}>
          <h3 className={styles.sectionTitle}>Collaborate with us</h3>
          <p>Do you have the skills and equipment?<br/>Want to volunteer?<br/>If so, get in touch.</p>
          {(() => {
                              const phoneDigits = (CONTACT.SMS_NUMBER || '').replace(/\D/g, '');
                              const mailHref = `mailto:${CONTACT.EMAIL || ''}`;
                              const telHref = phoneDigits ? `tel:+${phoneDigits}` : undefined;
                              const whatsappHref = phoneDigits ? `https://wa.me/${phoneDigits}` : undefined;
                              const smsHref = phoneDigits ? `sms:+${phoneDigits}` : undefined;
                              return (
                                <ul className={styles.contactList} aria-label="Contact options">
                                  <li>
                                    <a className={`${styles.contactItem} ${styles.email}`} href={mailHref}>
                                      <span className={styles.iconWrap} aria-hidden="true">
                                        <img src={emailIcon} alt="" width={22} height={22} />
                                      </span>
                                      <span className={styles.contactLabel}>Email</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a className={`${styles.contactItem} ${styles.phone}`} href={telHref}>
                                      <span className={styles.iconWrap} aria-hidden="true">
                                        <img src={phoneIcon} alt="" width={22} height={22} />
                                      </span>
                                      <span className={styles.contactLabel}>Phone Call</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a className={`${styles.contactItem} ${styles.whatsapp}`} href={whatsappHref} target="_blank" rel="noopener noreferrer">
                                      <span className={styles.iconWrap} aria-hidden="true">
                                        <img src={whatsappIcon} alt="" width={22} height={22} />
                                      </span>
                                      <span className={styles.contactLabel}>WhatsApp</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a className={`${styles.contactItem} ${styles.sms}`} href={smsHref}>
                                      <span className={styles.iconWrap} aria-hidden="true">
                                        <img src={smsIcon} alt="" width={22} height={22} />
                                      </span>
                                      <span className={styles.contactLabel}>SMS</span>
                                    </a>
                                  </li>
                                </ul>
                              );
                            })()}
        </div>
        {/* Additional support box */}
        <div className={styles.leftBoxWide}>
          <h3 className={styles.sectionTitle}>Chip in</h3>
          <p className={styles.chipInText}>Un–hyphenated programming<br/>involves time, energy,<br/>effort and expense.</p>
          <p className={styles.chipInText}>Any contribution helps.</p>
          <div className={styles.chipInRow}>
            <select
              id="chipAmount"
              className={styles.chipInSelect}
              aria-label="Contribution amount"
              value={chipAmount}
              onChange={e => setChipAmount(e.target.value)}
            >
              <option value="5">$ 5</option>
              <option value="10">$ 10</option>
              <option value="20">$ 20</option>
              <option value="50">$ 50</option>
              <option value="100">$ 100</option>
            </select>
            <button
              type="button"
              className={styles.chipInBtn}
              onClick={() => {
                if (!chipAmount) {
                  alert('Please select an amount first.');
                  return;
                }
                setChipOpen(true);
              }}
            >
              CHIP IN
            </button>
          </div>
        </div>
        {chipOpen && (
          <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="Chip in">
            <div className={styles.modalContent}>
              <div className={styles.modalTitle}>Secure payment via Stripe</div>
              <p>You'll be redirected to a Stripe-hosted checkout for <b>${chipAmount}</b>.</p>
              <div className={styles.modalActions}>
                <button type="button" className={`${styles.modalBtn}`} onClick={handleProceedDonation}>
                  Proceed
                </button>
                <button type="button" className={`${styles.modalBtn} ${styles.modalCancel}`} onClick={() => setChipOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Host Us box */}
        <div className={styles.leftBoxWide}>
          <h3 className={styles.sectionTitle}>Host Us</h3>
          <p>Invite us to speak or host a screening to bring these stories to your audience.</p>
        </div>
        {/* Sponsor Us box */}
        <div className={styles.leftBoxWide}>
          <h3 className={styles.sectionTitle}>Sponsor Us</h3>
          <p>Partner with us to sponsor an episode and help fund production and outreach.</p>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default SupportUs;

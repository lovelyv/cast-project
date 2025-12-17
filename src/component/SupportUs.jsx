import React from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import Footer from './Footer';
import styles from './SupportUs.module.css';
import { CONTACT } from '../config';
import emailIcon from '../assets/email.svg';
import phoneIcon from '../assets/phone.svg';
import whatsappIcon from '../assets/whatsapp-green.svg';
import smsIcon from '../assets/sms.svg';

function SupportUs() {
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
        
      </div>
      <Footer />
    </div>
  );
}

export default SupportUs;

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
  const [hostOption, setHostOption] = useState('A place to stay');
  const [sponsorOption, setSponsorOption] = useState('Sponsor an episode');
  const [sponsorRegion, setSponsorRegion] = useState('Africa');
  const [sponsorAck, setSponsorAck] = useState('Visual');
  const [sponsorEpisodePlan, setSponsorEpisodePlan] = useState('Per episode');
  const handleProceedDonation = () => {
    const url = DONATE_LINKS[Number(chipAmount)];
    if (url && typeof url === 'string' && url.length > 0) {
      window.open(url, '_blank', 'noopener');
      setChipOpen(false);
    } else {
      alert('Donation link is not configured yet. Please add your Stripe Payment Link for the selected amount in src/config.js.');
    }
  };
  const handleSponsorMail = () => {
    const subject = `Sponsor Us - ${sponsorOption}`;
    const body = `Region: ${sponsorRegion}\nAcknowledgement: ${sponsorAck}\nEpisode plan: ${sponsorEpisodePlan}\n\nDetails:`;
    const mailHref = `mailto:${CONTACT.EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailHref;
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
              Chip In
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
          <p>Showcasing NRIs globally<br/>involves a lot of travelling.</p>
          <p>Want to help us?</p>
          <div className={styles.chipInRow}>
            <select
              className={styles.chipInSelect}
              aria-label="Host us support option"
              value={hostOption}
              onChange={e => setHostOption(e.target.value)}
            >
              <option value="A place to stay">A place to stay</option>
              <option value="Travel arrangements">Travel arrangements</option>
              <option value="Local support">Local support</option>
              <option value="Any other">Any other</option>
            </select>
            <button
              type="button"
              className={styles.chipInBtn}
              onClick={() => {
                const subject = `Help Us - ${hostOption}`;
                const body = `I'd like to help with: ${hostOption}\n\nDetails:`;
                const mailHref = `mailto:${CONTACT.EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = mailHref;
              }}
            >
              Help Us
            </button>
          </div>
        </div>
        {/* Sponsor Us box */}
        <div className={styles.leftBoxWide}>
          <h3 className={styles.sectionTitle}>Sponsor Us</h3>
          <p>Want to promote your product,<br/>service, skills or facility?</p>
          <p><b>NRI stories</b><br/>is THE platform<br/>that you SHOULD advertise on.</p>
          
          {/* Regions wise */}
          <div className={styles.chipInRow}>
            <label htmlFor="sponsorRegion" className={styles.chipInLabel}>Region</label>
            <select
              id="sponsorRegion"
              className={styles.chipInSelect}
              aria-label="Region"
              value={sponsorRegion}
              onChange={e => setSponsorRegion(e.target.value)}
            >
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Australia & Pacific">Australia & Pacific</option>
              <option value="Middle East">Middle East</option>
            </select>
          </div>
          {/* Acknowledgement - visual, verbal */}
          <div className={styles.chipInRow}>
            <label htmlFor="sponsorAck" className={styles.chipInLabel}>Acknowledgement Type</label>
            <select
              id="sponsorAck"
              className={styles.chipInSelect}
              aria-label="Acknowledgement Type"
              value={sponsorAck}
              onChange={e => setSponsorAck(e.target.value)}
            >
              <option value="Visual">Visual</option>
              <option value="Verbal">Verbal</option>
              <option value="Both">Both</option>
            </select>
          </div>
          {/* Episodewise */}
          <div className={styles.chipInRow}>
            <label htmlFor="sponsorEpisodePlan" className={styles.chipInLabel}>Episode plan</label>
            <select
              id="sponsorEpisodePlan"
              className={styles.chipInSelect}
              aria-label="Episode plan"
              value={sponsorEpisodePlan}
              onChange={e => setSponsorEpisodePlan(e.target.value)}
            >
              <option value="Per episode">Per episode</option>
              <option value="Series (3)">Series (3)</option>
              <option value="Series (5)">Series (5)</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          {/* Get In Touch button below Episode plan */}
          <div className={`${styles.chipInRow} ${styles.ctaRow}`}>
            <button
              type="button"
              className={styles.chipInBtn}
              onClick={handleSponsorMail}
            >
              Get In Touch
            </button>
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default SupportUs;

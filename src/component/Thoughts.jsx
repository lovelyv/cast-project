import React, { useEffect, useState } from 'react';
import styles from './Thoughts.module.css';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';

function Thoughts({ scrollTo }) {
  useEffect(() => {
    if (!scrollTo) return;
    const scrollToTarget = () => {
      const el = document.getElementById(scrollTo);
      if (!el) return;
      const header = document.querySelector('nav');
      const headerHeight = header ? header.offsetHeight : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 12; // small breathing space
      window.scrollTo({ top, behavior: 'smooth' });
    };
    // ensure layout and fixed navbar are in place
    const t = setTimeout(scrollToTarget, 50);
    return () => clearTimeout(t);
  }, [scrollTo]);
  // Accordion state: [landscape, docucast, experience, viewing]
  const [open, setOpen] = useState([false, false, false, false]);
  const toggle = idx => setOpen(o => o.map((v, i) => i === idx ? !v : v));

  return (
    <div className="App">
      {/* Background watermark */}
      <SubpageWatermark size="60vmin" position="center center" zIndex={0} />
      <Navbar />
      <div className="hit-it-page">
        <div className="hit-it-page-container" style={{ maxWidth: 700, margin: '0 auto', marginTop: 40 }}>
          {/* Accordion 1: Landscape */}
          <div className={styles['accordion-section'] + ' ' + styles['docucast']}>
            <button onClick={() => toggle(0)} className={styles['accordion-header']}>
              <span className={styles['accordion-title']}>Landscape</span>
              <span className={styles['accordion-header-icon']}>{open[0] ? '▲' : '▼'}</span>
            </button>
            {open[0] && (
              <div className={styles['accordion-content']}>
                Over 6.5 million podcasts exist worldwide — yet most fade after a few episodes.<br />
                Traditional podcasts rely heavily on talk-based formats: two cameras, one composite shot, minimal narrative structure.<br />
                The ones that thrive do so through storytelling craft — not technology — by holding audience attention through cinematic pacing, emotional truth, and immersive presentation.
              </div>
            )}
          </div>
          {/* Accordion 2: Introducing DocuCast® */}
          <div className={styles['accordion-section']}>
            <button onClick={() => toggle(1)} className={styles['accordion-header']}>
              <span className={styles['accordion-title']}>Introducing DocuCast&trade;</span>
              <span className={styles['accordion-header-icon']}>{open[1] ? '▲' : '▼'}</span>
            </button>
            {open[1] && (
              <div className={styles['accordion-content']}>
                <span style={{ color: '#D2691E', fontWeight: '700' }}>Introducing DocuCast<span className={styles['docucast-tm-wrap']}><span className={styles['reg-mark']}>™</span></span></span> — Podcasts with Visual Enrichment.
                <br />A hybrid between a podcast and a documentary, each episode weaves interviews, archival footage, and cinematic visuals into a single narrative arc.<br />
                It's storytelling that looks, sounds, and feels different — a documentary in podcast form.
              </div>
            )}
          </div>
          {/* Accordion 3: The Experience */}
          <div className={styles['accordion-section']}>
            <button onClick={() => toggle(2)} className={styles['accordion-header']}>
              <span className={styles['accordion-title']}>The Experience</span>
              <span className={styles['accordion-header-icon']}>{open[2] ? '▲' : '▼'}</span>
            </button>
            {open[2] && (
              <div className={styles['accordion-content']}>
                High-production, multi-camera, documentary-style storytelling.<br />
                Designed for digital audiences who crave emotional depth and visual substance.<br />
                A platform where the NRI voice is heard, seen, and preserved.
              </div>
            )}
          </div>
          {/* Accordion 4: The Viewing */}
          <div className={styles['accordion-section']}>
            <button onClick={() => toggle(3)} className={styles['accordion-header']}>
              <span className={styles['accordion-title']}>The Viewing</span>
              <span className={styles['accordion-header-icon']}>{open[3] ? '▲' : '▼'}</span>
            </button>
            {open[3] && (
              <div className={styles['accordion-content']}>
                <div className="info-boxes">
                  <div className="info-box">
                    <h3>Visual Storytelling</h3>
                    <p>Cinematic B-roll, archival images, and on-location frames add context and depth.</p>
                  </div>
                  <div className="info-box">
                    <h3>Sound you can feel</h3>
                    <p>Voice first, layered sound design and a score that supports the emotion - never distracts.</p>
                  </div>
                  <div className="info-box">
                    <h3>Editorial arcs</h3>
                    <p>Each episode is structured for momentum - opening hook, rising stakes, resolution, and reflection.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thoughts;

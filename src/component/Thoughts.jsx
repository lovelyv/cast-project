import React, { useEffect, useState, useRef } from 'react';
import styles from './Thoughts.module.css';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import visualStory from '../assets/visualstory.jpeg';
import soundfeel from '../assets/soundfeel.jpeg';

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
  // Refs for each header
  const headerRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Scroll the header into view with a small offset when opened
  const toggle = idx => {
    setOpen(o => {
      const newOpen = o.map((v, i) => i === idx ? !v : v);
      // Only scroll if opening (not closing)
      setTimeout(() => {
        if (newOpen[idx] && headerRefs[idx].current) {
          // For the first accordion, scroll header into view, then scroll up by navbar height + extra
          if (idx === 0) {
            headerRefs[idx].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
              const nav = document.querySelector('nav');
              const navHeight = nav ? nav.offsetHeight : 0;
              // Use a smaller offset for small screens
              const isSmall = window.innerWidth <= 600;
              const extra = isSmall ? 8 : 40;
              window.scrollBy({ top: -navHeight - extra, behavior: 'smooth' });
            }, 400);
          } else {
            const nav = document.querySelector('nav');
            const navHeight = nav ? nav.offsetHeight : 0;
            const rect = headerRefs[idx].current.getBoundingClientRect();
            const scrollY = window.scrollY + rect.top - navHeight - 16;
            window.scrollTo({ top: scrollY, behavior: 'smooth' });
          }
        }
      }, 50);
      return newOpen;
    });
  };

  return (
    <div>
        <Navbar />
      
  <div className={styles['all-page-thoughts']}> 
    <SubpageWatermark size="60vmin" position="center center" zIndex={0} />
         <div className={styles['thoughts-content-bg']}>
          {/* Accordion 1: Landscape */}
          <div className={styles['accordion-section'] + ' ' + styles['docucast']}>
            <button ref={headerRefs[0]} onClick={() => toggle(0)} className={styles['accordion-header']}>
              <span className={styles['accordion-title']}>Landscape</span>
              <span className={styles['accordion-header-icon']}>{open[0] ? '▲' : '▼'}</span>
            </button>
            {open[0] && (
              <div className={styles['accordion-content']}>
                <span className={styles.overcrowded}>The Podcast world is overcrowded.</span><br />
                Over 6.5 million podcasts exist worldwide.<br />
                yet...<br /> 
                most fade away<br />
                after just a few episodes.<br /><br />
                Traditional podcasts<br />
                rely heavily on talk-based formats<br />
                Two cameras, one composite shot.<br />
                Minimal narrative structure.<br /><br />
                The ones that thrive<br />
                do so through storytelling craft.<br /><br />
                By holding viewer attention<br />
                through cinematic pacing,<br />
                emotional truth, <i>and</i> immersive presentation.
              </div>
            )}
          </div>
          {/* Accordion 2: Introducing DocuCast® */}
          <div className={styles['accordion-section']}>
            <button ref={headerRefs[1]} onClick={() => toggle(1)} className={styles['accordion-header']}>
              <span className={styles['accordion-title']}><span className="docucast-big">D</span>OCU<span className="docucast-big">C</span>AST&trade;</span>
              <span className={styles['accordion-header-icon']}>{open[1] ? '▲' : '▼'}</span>
            </button>
            {open[1] && (
              <div className={styles['accordion-content']}>
                We have coined it as <span className="docucast-big">D</span>OCU<span className="docucast-big">C</span>AST&trade;.<br /><br />
                A hybrid<br />
                Between a podcast <i>and</i> a documentary.<br /><br />
                Each episode has interviews, archival footage <i>and</i> cinematic visuals.<br />
                Woven into a single narrative arc.<br /><br />
                The storytelling that looks, sounds, and feels different.<br />
                A documentary style podcast - with visual enrichment.
              </div>
            )}
          </div>
          {/* Accordion 3: The Experience */}
          <div className={styles['accordion-section']}>
            <button ref={headerRefs[2]} onClick={() => toggle(2)} className={styles['accordion-header']}>
              <span className={styles['accordion-title']}>The Experience</span>
              <span className={styles['accordion-header-icon']}>{open[2] ? '▲' : '▼'}</span>
            </button>
            {open[2] && (
              <div className={styles['accordion-content']}>
                Multicam setup<br />
                High on content<br /><br />
                Designed for digital audiences<br />who crave emotional depth and visual substance.<br />
                A platform where the NRI voice is heard, seen, and preserved.
              </div>
            )}
          </div>
          {/* Accordion 4: The Viewing */}
          <div className={styles['accordion-section']}>
            <button ref={headerRefs[3]} onClick={() => toggle(3)} className={styles['accordion-header']}>
              <span className={styles['accordion-title']}>The Viewing</span>
              <span className={styles['accordion-header-icon']}>{open[3] ? '▲' : '▼'}</span>
            </button>
            {open[3] && (
              <div className={styles['accordion-content']}>
               
                  <div className={styles.container}>
                  <div className={styles['left-box']}>
                    <h3>Visual Storytelling</h3>
                    <p>Cinematic B-roll, archival images, and on-location frames add context and depth.</p>
                  </div>
                  <div className={styles['right-box']}>
                    <img
                      src={visualStory}
                      alt="Visual Story"
                    />
                  </div>
                  </div>
                
                
                  <div className={styles.container}>
                  <div className={styles['left-box']}>
                    <h3>Sound you can feel</h3>
                    <p>Voice first, layered sound design and a score that supports the emotion - never distracts.</p>
                  </div>
                  <div className={styles['right-box']}>
                    <img
                      src={soundfeel}
                      alt="Sound Feel"
                    />
                  </div>
                  </div>
                
               
                  <div className={styles.container}>
                  <div className={styles['left-box']}>
                    <h3>Editorial arcs</h3>
                    <p>Each episode is structured for momentum - opening hook, rising stakes, resolution, and reflection.</p>
                  </div>
                  
                  </div>
                
              </div>
            )}
          </div>
        </div>
        {/* Right-aligned You a Fit link below all content */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '2.5em' }}>
          <a
            href="#youafit"
            className={styles['youafit-arrow-link']}
            style={{ position: 'static', right: 'unset', bottom: 'unset' }}
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
          >
            <span style={{ fontSize: '1.5em', lineHeight: 1, display: 'inline-block', transform: 'translateY(1px)' }}>→</span>
            <span>You a Fit?</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Thoughts;

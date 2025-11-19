import React, { useEffect, useState, useRef } from 'react';
import styles from './Thoughts.module.css';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import visualStory from '../assets/visualstory.jpeg';
import soundfeel from '../assets/soundfeel.jpeg';
import Footer from './Footer';

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
      const isOpening = !o[idx];
      const newOpen = o.map((_, i) => i === idx ? isOpening : false);
      setTimeout(() => {
        if (newOpen[idx] && headerRefs[idx].current) {
          const nav = document.querySelector('nav');
          const navHeight = nav ? nav.offsetHeight : 0;
          const extra = window.innerWidth <= 600 ? 8 : 32; // leave more space above
          const rect = headerRefs[idx].current.getBoundingClientRect();
          const scrollY = window.scrollY + rect.top - navHeight - extra;
          window.scrollTo({ top: scrollY, behavior: 'smooth' });
        }
      }, 50);
      return newOpen;
    });
  };

  return (
   <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
       <div className={styles['all-page-thoughts']}>
      <SubpageWatermark />
      <div className={styles['thoughts-content-bg']}>
  <span className={styles['accordion-content']}>
    Our<br/>
    <b>D</b>
    <b style={{fontSize: '0.8em', marginBottom: '-0.08em'}}>OCU</b>
    <b>C</b>
    <b style={{fontSize: '0.8em', marginBottom: '-0.08em'}}>AST</b>™.
  
  </span>
  <p className={styles['accordion-content']}>
    will feature stories<br/>
    that speak about<br/>
    Resilience<br/>
    Sacrifice<br/>Ambition<br/>Identity<br/>Inspiration<br/></p>      
          {/* Accordion 1: Landscape */}
          <div className={styles['accordion-section'] + ' ' + styles['docucast']}>
            <button ref={headerRefs[0]} onClick={() => toggle(0)} className={styles['accordion-header']}>
              <span className={styles['accordion-title']}>Landscape</span>

            </button>
            {open[0] && (
              <div className={styles['accordion-content']}>
                <span className={styles.overcrowded}>The Podcast world<br/> is overcrowded.</span><br />
                Over 6.5 million podcasts<br/>exist worldwide.<br />
                <b>Yet...</b><br /> 
                most fade away<br />
                after just a few episodes.<br /><br />
                Traditional podcasts<br />
                rely heavily<br/>on talk-based formats.<br /><br/>
                Two cameras.<br/>One composite shot.<br />
                Minimal narrative structure.<br /><br />
                The ones that thrive<br />
                do so through storytelling craft.<br /><br />
                By holding viewer attention<br />
                through cinematic pacing,<br />
                emotional truth<br/> and immersive presentation.<br />
              </div>
            )}
          </div>
          {/* Accordion 2: Introducing DocuCast® */}
          <div className={styles['accordion-section']}>
            <button ref={headerRefs[1]}  onClick={() => toggle(1)} className={styles['accordion-header']}>
              <span className={styles['accordion-title']} >
                <b>D</b>
                <b style={{fontSize: '0.8em', marginBottom: '-0.08em'}}>OCU</b>
                <b>C</b>
                <b style={{fontSize: '0.8em', marginBottom: '-0.08em'}}>AST</b>™
              </span>

            </button>
            {open[1] && (
              <div className={styles['accordion-content']}>
                We have coined it as <b>D<span style={{fontSize: '0.8em'}}>OCU</span>C<span style={{fontSize: '0.8em'}}>AST</span>&trade;</b>.<br /><br />
                A hybrid<br />
                between a podcast<br/>and a documentary.<br /><br />
                Each episode has interviews,<br/>archival footage<br/>and cinematic visuals.<br />
                Woven into a single narrative arc.<br /><br />
                Storytelling that looks,<br/>sounds, and feels different.<br />
                A documentary style podcast<br/>with visual enrichment.<br/>
                
                
              </div>
            )}
          </div>
          {/* Accordion 3: The Experience */}
          <div className={styles['accordion-section']}>
            <button ref={headerRefs[2]} onClick={() => toggle(2)} className={styles['accordion-header']}>
              <span className={styles['accordion-title']}>Experience</span>

            </button>
            {open[2] && (
              <div className={styles['accordion-content']}>
                
                <div className={styles.container}>
                  <div className={styles['left-box']}>
                    <h3>Visual Storytelling</h3>
                    <p>Cinematic B-roll.<br/>Archival images.<br/>On-location frames.<br/><br/>All of these<br/>add context and depth.</p>
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
                    <h3>Sound<br/>you can feel</h3>
                    <p>Layered sound design.<br /><br />A score<br />that supports
                     the emotion.<br />Sound that never distracts.</p>
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
                      <p>Each episode is <br/>structured for momentum.<br/><br/>Opening hook.<br/>Rising stakes. <br/>Resolution and reflection.<br/></p>
                    </div>
                   <div className={styles['left-box']}>
                      <h3>The Result</h3>
                      <p>Good production value.<br/>High on content.<br/><br/>
                      Designed for<br/>digital audiences<br/>
                      who crave emotional depth and<br/>visual substance.<br/><br/>
                      A platform<br/>where the NRI voice<br/>is heard, seen and preserved.</p>
                    </div>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '2.5em' }}>
                  <a
                    href="#youafit"
                   className={styles['youafit-btn']}
                   style={{ position: 'static', right: 'unset', bottom: 'unset', marginBottom: '2.5em' }}
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
                  >
                    <span>You a Fit?</span>
                  </a>
                </div>
              </div>
            )}
          </div>
            
          
        </div>
      </div>
        <Footer />  
    </div>
  );
}

export default Thoughts;

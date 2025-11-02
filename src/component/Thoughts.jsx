import React from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';

function Thoughts() {
  return (
    <div className="App">
      {/* Background watermark */}
      <SubpageWatermark size="60vmin" position="center center" zIndex={0} />

      <Navbar />

      <div className="hit-it-page">
        <div className="hit-it-page-container">
          <h1 style={{ marginTop: '60px' }}>Landscape</h1>
          <p>
            Over 6.5 million podcasts exist worldwide — yet most fade after a few episodes.
Traditional podcasts rely heavily on talk-based formats: two cameras, one composite shot, minimal narrative structure.
The ones that thrive do so through storytelling craft — not technology — by holding audience attention through cinematic pacing, emotional truth, and immersive presentation.
          </p>
          <h1 style={{ marginTop: '60px' }}>Format</h1>
          <p>
            <span style={{ color: '#D2691E', fontWeight: '700' }}>Introducing DocuCast™</span> — Podcasts with Visual Enrichment.
 A hybrid between a podcast and a documentary, each episode weaves interviews, archival footage, and cinematic visuals into a single narrative arc.
 It's storytelling that looks, sounds, and feels different — a documentary in podcast form.
          </p>
          <h1 style={{ marginTop: '60px' }}>Experience</h1>
          <p>
            High-production, multi-camera, documentary-style storytelling.
Designed for digital audiences who crave emotional depth and visual substance.
A platform where the NRI voice is heard, seen, and preserved.
          </p>
          <h2>The Viewing experience </h2>
          
          <div className="info-boxes">
            <div className="info-box">
              <h3>Visual Storytelling</h3>
              <p>Cinematic B-roll, archival images, and on-location frames add context and dept.</p>
            </div>
            <div className="info-box">
              <h3>Sound you can feel</h3>
              <p>Voice first, layered sound design and a scrore that supports the emotion - never distracts.</p>
            </div>
            <div className="info-box">
              <h3>Editorial arcs</h3>
              <p>Each episode is structured for momentum - opening hook, rising stakes, resolution, and reflection.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thoughts;

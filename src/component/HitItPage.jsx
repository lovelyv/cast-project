import React from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';

function HitItPage() {
  return (
    <div className="App">
      {/* Background watermark */}
  <SubpageWatermark size="60vmin" opacity={0.15} position="center center" zIndex={0} />

      <Navbar />

      <div className="hit-it-page">
        <div className="hit-it-page-container">
          <p>
            NRI Stories™ is a next-generation storytelling platform — real stories, told without filters, judgment, or embellishment. Every episode explores the lived experiences of Non-Resident Indians — their journeys across continents, sacrifices, ambitions, and triumphs. We believe that authentic emotion, not opinion, drives connection.
          </p>

          {/* Add your form or content here */}
        </div>
      </div>
    </div>
  );
}

export default HitItPage;

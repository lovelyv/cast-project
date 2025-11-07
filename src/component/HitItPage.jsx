import React from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';

function HitItPage() {
  return (
    <div className="App">
      {/* Background watermark */}
  <SubpageWatermark size="60vmin" position="center center" zIndex={0} />

      <Navbar />

      <div className="hit-it-page">
        <div className="hit-it-page-container">
          <p>
            Its all about real stories,<br></br>told without filters, judgment, or embellishment.<br></br><p>Every episode explores the lived experiences of Non-Resident Indians —<br></br> their journeys across continents, sacrifices, ambitions, and triumphs. We believe that authentic emotion, not opinion, drives connection.
          </p>
    </p>
          {/* Add your form or content here */}
        </div>
      </div>
    </div>
  );
}

export default HitItPage;

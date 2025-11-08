import React from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import hindilogo from '../assets/hindilogo.png';
import '../App.css';
import { Link } from 'react-router-dom';


function HitItPage() {
  const [imgSize, setImgSize] = React.useState({ width: null, height: null });

  React.useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setImgSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = hindilogo;
  }, []);

  return (
    <>
  <div className="App hititpage-padded hitit-main-container" style={{ position: 'relative', minHeight: '100vh', color: '#222' }}>
      {/* Background watermark */}
      <SubpageWatermark size="60vmin" position="center center" zIndex={0} />

      <div style={{ marginBottom: '2.5rem' }}>
        <Navbar />
      </div>

      <div
        className="hit-it-page"
        id="hititpage-padded"
        style={{
          paddingTop: '3.5rem',
          paddingBottom: '1.5rem',
          borderTop: '3.5rem solid transparent',
          borderBottom: '1.5rem solid transparent',
          boxSizing: 'border-box',
        }}
      >
        <div className="hit-it-page-container">
          
          <p>
            Its all about real stories.<br></br>Told without filters, judgment, or embellishment.<br></br><br></br>Every story explores<br></br>the lived experiences of Non-Resident Indians.<br></br>People of Indian heritage<br></br><br></br>
            Their journeys across continents.<br></br>Sacrifices, ambitions, and triumphs.<br></br><br></br>We firmly believe that <br></br>authentic emotion, not opinion<br></br>drives connection.
          </p>
          {/* Add your form or content here */}
         <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={hindilogo} alt="Hindi Logo" style={{ width: '40vw', maxWidth: 300, minWidth: 80, height: 'auto' }} />
          </div>
     
        </div>
      </div>
    </div>
    {/* Right-bottom clickable arrow and label */}
    <a
      href="#thoughts"
      className="thethought-arrow-link"
      style={{
        position: 'fixed',
        right: '2vw',
        bottom: '2vw'
      }}
    >
      <span style={{ fontSize: '1.5em', lineHeight: 1, display: 'inline-block', transform: 'translateY(1px)' }}>→</span>
      <span>The Thought</span>
    </a>
    </>
  );
}

export default HitItPage;

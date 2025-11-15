import React from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import hindilogo from '../assets/hindilogo.png';
import styles from './hititpage.module.css';


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
  <div>
    
        <Navbar />
      

      <div className={styles['all-page-hitit']}>
        {/* Background watermark (moved inside for stacking context) */}
        <SubpageWatermark size="60vmin" position="center center" zIndex={1} />
        <div className={styles['hitit-content-bg']}>
          <p>
            Its all about real stories.<br />Told without filters, judgment,<br/>or embellishment.<br /><br />Every story explores<br />the real life experiences<br/>of Non-Resident Indians,<br />people of Indian heritage<br /><br />
            Their journeys across continents.<br />Sacrifices, ambitions and triumphs.<br /><br />We firmly believe that <br />authentic emotions<br/>matter more than opinion.<br />
          </p>
          <img src={hindilogo} alt="Hindi Logo" className={styles['hitit-img']} />
        </div>
        <a
          href="#thoughts"
          className={styles['thought-btn']}
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
        >
          The Thought
        </a>
        
      </div>
      </div>
    
    </>
  );
}

export default HitItPage;

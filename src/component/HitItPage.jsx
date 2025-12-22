import React from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import hindilogo from '../assets/hindilogo.png';
import styles from './hititpage.module.css';


import { Link } from 'react-router-dom';
import Footer from './Footer';


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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className={styles['all-page-hitit']} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Background watermark (moved inside for stacking context) */}
        <SubpageWatermark />
       
       <div className={styles['hitit-centered-content']}>
         
          <p>
            <h1 className={styles["h1"]}>
              REAL&nbsp;PEOPLE
            </h1>
            It's all about real stories.<br />Told without filters, judgement<br/>or embellishment.<br /><br />
             <h1 className={styles["h1"]}>
              REAL&nbsp;&nbsp;EMOTIONS
             </h1>
              Every story explores<br />the real life experiences<br/>of<br/>Non Resident Indians,<br />people of Indian lineage.<br /><br />
             <h1 className={styles["h1"]}>
              REAL&nbsp;JOURNEYS
             </h1>
            Their journeys across continents.<br />
            Sacrifices, ambitions and triumphs.<br /><br />
     
          </p>
          <img src={hindilogo} alt="Hindi Logo" className={styles['hitit-img']} />
          <a
            href="#thoughts"
            className={styles['thought-btn']}
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
          >
            The Thought
          </a>
        </div>
      </div>
     
    </div>
  );
}

export default HitItPage;

import React from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import hindilogo from '../assets/hindilogo.png';
import styles from './hititpage.module.css';
import appStyles from '../App.module.css';


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
      <div className={appStyles['all-page']}>
        {/* Background watermark (moved inside for stacking context) */}
        <SubpageWatermark />
       
       <div className={styles['hitit-centered-content']}>
          <h2 className={`${appStyles.headline}`}>REAL PEOPLE</h2>
          <p>
            It's all about real stories.<br />
            Told without filters, judgement<br />
            or embellishment.<br /><br />
          </p>
          <h2 className={`${appStyles.headline}`}>REAL EMOTIONS</h2>
          <p>
            Every story explores<br />
            the real life experiences<br />
            of<br />
            Non Resident Indians,<br />
            people of Indian lineage.<br /><br />
          </p>
          <h2 className={`${appStyles.headline}`}>REAL JOURNEYS</h2>
          <p>
            Their journeys across continents.<br />
            Sacrifices, ambitions and triumphs.<br /><br />
          </p>
          <img src={hindilogo} alt="Hindi Logo" className={styles['hitit-img']} />
          <a
            href="#thoughts"
            className={appStyles['btn']}
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

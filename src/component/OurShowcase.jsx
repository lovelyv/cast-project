import React from 'react';
import { COUNTRY_FLAGS } from './countryFlags';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import Footer from './Footer';

import CircleFlagRow from './CircleFlagRow';


import styles from './OurShowcase.module.css';
import youaFitStyles from './YouAFit.module.css';
import SocialLinksBar from './SocialLinksBar';

function OurShowcase() {
  // Show all countries in the 3D carousel (6 at a time per rotation)
  const allCountries = COUNTRY_FLAGS;
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className={styles['all-page-showcase']} style={{ flex: 1 }}>
        <SubpageWatermark size="60vmin" position="center center" zIndex={0} />
        <h2 className={styles["showcase-h2"]}>
          PRESERVE your JOURNEY.<br/>INSPIRE the NEXT ONE.
        </h2>
        {/* Centered 3D carousel showing 8 countries at a time, slower rotation, flat base; wider blocks with spacing and fixed center rotation */}
        <div className={styles.carouselCenter}>
          <CircleFlagRow countries={allCountries} duration="110s" tilt="0deg" blockWidth="160px" blockHeight="110px" spacing={25} radius={260} />
        </div>
        {/* Country Flag Thumbnails Grid - 4 per row */}
        <div className={styles['country-flags-grid']}>
          {Array.from({ length: Math.ceil(COUNTRY_FLAGS.length / 4) }).map((_, rowIdx) => (
            <div className={styles['country-flags-row']} key={rowIdx}>
              {COUNTRY_FLAGS.slice(rowIdx * 4, rowIdx * 4 + 4).map((country) => (
                <a
                  key={country.name}
                  href={country.url}
                  className={styles['country-flag-block']}
                  tabIndex={0}
                  title={country.name}
                >
                  <div className={styles['country-name-block']}>
                    {country.name}
                  </div>
                  <img
                    src={country.img}
                    alt={country.name + ' flag'}
                    className={styles['country-flag-img']}
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
        <h2 className={styles["showcase-follow-h2"]}>Follow Us</h2>
        <div className={styles.socialShowcaseRow}>
          <SocialLinksBar size="sm" className="noMarginBottom" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OurShowcase;

import React, { useEffect, useRef, useState } from 'react';
import searchIcon from '../assets/search.svg';
import { useNavigate } from 'react-router-dom';
import { COUNTRY_FLAGS } from './countryFlags';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';
import Footer from './Footer';

import CircleFlagRow from './CircleFlagRow';


import styles from './OurShowcase.module.css';
import appStyles from '../App.module.css';
import youaFitStyles from './YouAFit.module.css';
import SocialLinksBar from './SocialLinksBar';

function OurShowcase() {
  const focusSentinelRef = useRef(null);
  // Show all countries in the 3D carousel (6 at a time per rotation)
  const allCountries = COUNTRY_FLAGS;
  // Search and filter state
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  // Get unique regions from data
  const regionOptions = Array.from(new Set(COUNTRY_FLAGS.flatMap(c => c.region ? c.region.split(',').map(r => r.trim()) : [])));
  // Filtered countries by search and region
  const filteredCountries = COUNTRY_FLAGS.filter(c => {
    const matchesRegion = region === 'All' || (c.region && c.region.split(',').map(r => r.trim()).includes(region));
    const searchLower = search.trim().toLowerCase();
    const nameLower = c.name.toLowerCase();
    const aliases = Array.isArray(c.aliases) ? c.aliases.map(a => a.toLowerCase()) : [];
    const matchesSearch =
      !searchLower ||
      nameLower.includes(searchLower) ||
      nameLower === searchLower ||
      aliases.some(alias => alias.includes(searchLower) || alias === searchLower);
    return matchesRegion && matchesSearch;
  });

  // On mount, move viewport and focus to the top heading for accessibility
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch {
      window.scrollTo(0, 0);
    }
    if (focusSentinelRef.current && typeof focusSentinelRef.current.focus === 'function') {
      // Delay slightly to ensure layout is ready and Chrome doesn't auto-focus heading
      setTimeout(() => focusSentinelRef.current && focusSentinelRef.current.focus(), 50);
    }
  }, []);

  const navigate = useNavigate();
  return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
       <div className={appStyles['all-page']} style={{ flex: 1 }}>
        <div ref={focusSentinelRef} tabIndex="-1" aria-hidden="true" className={styles.focusSentinel} />
        <SubpageWatermark size="60vmin" position="center center" zIndex={0} />
        <div className={appStyles['container']} >
        <h2 className={`${appStyles.headline}`}>
          PRESERVE <span className={styles.blackWord}>your</span> JOURNEY.<br/>INSPIRE <span className={styles.blackWord}>the</span> NEXT.
        </h2>
        {/* Centered 3D carousel showing 8 countries at a time, slower rotation, flat base; wider blocks with spacing and fixed center rotation */}
        <div className={styles.carouselCenter}>
          <CircleFlagRow countries={allCountries} duration="30s" tilt="0deg" blockWidth="160px" blockHeight="110px" spacing={25} radius={260} />
        </div>

        {/* Search + Filter Combo */}
  <div className={styles.searchFilterCombo}>  
          <input
            type="text"
            placeholder="Search country"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.showcaseSearchInput}
            aria-label="Search countries"
          />
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            className={styles.showcaseRegionSelect}
            aria-label="Filter by region"
          >
            <option value="All">All</option>
            {regionOptions.sort().map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Country Flag Thumbnails Grid - 4 per row, filtered by search and region, sequential with no empty spaces */}
        <div className={styles['country-flags-grid']}>
          {(() => {
            const rows = [];
            for (let i = 0; i < filteredCountries.length; i += 4) {
              rows.push(filteredCountries.slice(i, i + 4));
            }
            return rows.map((row, rowIdx) => (
              <div className={styles['country-flags-row']} key={rowIdx}>
                {row.map((country) => (
                  <a
                    key={country.name + '-' + country.url}
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
            ));
          })()}
        </div>
        
        {/* Tagline above Support Us button */}
        <p >
          <strong><em className={styles.tagline}>IP registration underway.</em></strong><br/>
          In 7 countries, across 3 continents.
        </p>

        
          <button
            className={appStyles['btn']}
            onClick={() => navigate('/supportus')}
          >
            Support Us
          </button>
       
      </div>
     
      <Footer />
       </div>
    </div>
  );
}

export default OurShowcase;

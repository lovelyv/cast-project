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
  const navigate = useNavigate();
  // Region filter state
  const [region, setRegion] = useState("All");
  // Search/filter state
  const [search, setSearch] = useState("");
  // Custom region filters
  const customRegions = {
    'Top NRI Countries': ['United States', 'UAE', 'Malaysia', 'Canada', 'Saudi Arabia', 'Myanmar', 'UK', 'South Africa', 'Sri Lanka', 'Kuwait'],
    'North America': ['USA', 'Canada', 'Mexico'],
    'Middle East (Gulf)': ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain'],
    'Europe': ['UK', 'Germany', 'France', 'Netherlands', 'Ireland', 'Italy', 'Spain','Russia'],
    'Asia-Pacific': ['Singapore', 'Australia', 'New Zealand'],
    'Africa': ['South Africa', 'Mauritius', 'Kenya', 'Tanzania', 'Uganda'],
    'Caribbean / West Indies': ['Trinidad & Tobago', 'Guyana', 'Suriname', 'Jamaica'],
    'Latin America': ['Brazil', 'Argentina', 'Chile', 'Peru'],
    'South Asia'  : ['Nepal', 'Sri Lanka'],
    'Southeast Asia': ['Singapore', 'Malaysia', 'Thailand', 'Indonesia', 'Philippines', 'Vietnam'],
  };
  // Region options: only custom regions, alphabetically (with 'All' first)
  const allCustomRegions = Object.keys(customRegions);
  const pinnedTop = 'Top NRI Countries';
  const otherRegions = allCustomRegions
    .filter(r => r.trim().toLowerCase() !== pinnedTop.trim().toLowerCase())
    .sort((a, b) => a.localeCompare(b));
  const regionOptions = [pinnedTop, ...otherRegions]; // 'All' is rendered explicitly as the first option
  // Filter countries by search and region (supports customRegions)
  const filteredCountries = COUNTRY_FLAGS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    let matchesRegion = true;
    if (region !== 'All') {
      const list = customRegions[region];
      if (Array.isArray(list)) {
        const normList = list.map(s => (s || '').toLowerCase().trim());
        const nameNorm = (c.name || '').toLowerCase().trim();
        const aliases = Array.isArray(c.aliases) ? c.aliases.map(a => (a || '').toLowerCase().trim()) : [];
        matchesRegion = normList.includes(nameNorm) || aliases.some(a => normList.includes(a));
      } else {
        matchesRegion = c.region === region;
      }
    }
    return matchesRegion && matchesSearch;
  });

  // Modal state for country video modal
  const [modalCountry, setModalCountry] = useState(null);
  // Dummy YouTube links for modal
  const dummyVideos = [
    {
      title: 'Sample Video 1',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    },
    {
      title: 'Sample Video 2',
      url: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
      thumb: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/mqdefault.jpg',
    },
    {
      title: 'Sample Video 3',
      url: 'https://www.youtube.com/watch?v=V-_O7nl0Ii0',
      thumb: 'https://img.youtube.com/vi/V-_O7nl0Ii0/mqdefault.jpg',
    },
  ];
  const focusSentinelRef = useRef(null);
  // Show all countries in the 3D carousel (6 at a time per rotation)
  const allCountries = COUNTRY_FLAGS;

  return (
    <div>
         <Navbar />
       <div className={appStyles['all-page']} style={{ flex: 1 }}>
        <SubpageWatermark />
        <SubpageWatermark size="60vmin" position="center center" zIndex={0} />
        <div className={appStyles['container']} >
        <h2 className={`${appStyles.headline}`}>
          PRESERVE <span className={styles.blackWord}>your</span> JOURNEY.<br/>INSPIRE <span className={styles.blackWord}>the</span> NEXT.
        </h2>
        <CircleFlagRow countries={allCountries} duration="30s" tilt="0deg" blockWidth="160px" blockHeight="110px" spacing={25} radius={260} />
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
            {regionOptions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        {/* Filter label below search/filter combo */}
        <p className={styles['country-name-block']}>
          {region === 'All' ? 'Showing all countries' : `Region: ${region}`}
        </p>

        {/* Country Flag Thumbnails Grid - 4 per row, filtered by search and region, sequential with no empty spaces */}
        <div className={styles['country-flags-grid']}>
          {Array.from({ length: Math.ceil(filteredCountries.length / 4) }).map((_, rowIdx) => (
            <div className={styles['country-flags-row']} key={rowIdx}>
              {filteredCountries.slice(rowIdx * 4, rowIdx * 4 + 4).map((country) => (
                <div
                  key={country.name + '-' + country.url}
                  className={styles['country-flag-block']}
                  tabIndex={0}
                  style={{ position: 'relative' }}
                  onClick={() => setModalCountry(country.name)}
                >
                  <a href={country.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles['country-name-block']}>
                      {country.name}
                    </div>
                    <img src={country.img} alt={country.name + ' flag'} className={styles['country-flag-img']} />
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Tagline above Support Us button */}
        <div className={styles.scrimTaglineBox}>
          <strong><em className={styles.tagline}>IP registration underway.</em></strong><br />
          <span>In 7 countries, across 3 continents.</span>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '2em' }}>
          <button
            className={appStyles['btn']}
            onClick={() => navigate('/supportus')}
          >
            Support Us
          </button>
        </div>
        </div>
        <Footer />
        {modalCountry && (
          <CountryModal
            country={COUNTRY_FLAGS.find(c => c.name === modalCountry)}
            videos={dummyVideos}
            onClose={() => { setModalCountry(null); }}
          />
        )}
      </div>
    </div>
  );
}

// Modal component for country videos
function CountryModal({ country, videos, onClose }) {
  // Lock background scroll while modal is open
  useEffect(() => {
    const scrollY = window.scrollY;
    const original = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = original.overflow;
      document.body.style.position = original.position;
      document.body.style.top = original.top;
      document.body.style.width = original.width;
      window.scrollTo(0, scrollY);
    };
  }, []);
  if (!country) return null;
  return (
    <div className={styles['country-modal-overlay']} onClick={onClose}>
      <div className={styles['country-modal']} onClick={e => e.stopPropagation()}>
  <button className={styles['modal-close']} onClick={onClose} aria-label="Close modal">&times;</button>
        <div className={styles['modal-title']}>{country.name} - Featured Videos</div>
        <div className={styles['modal-videos-row']}>
          {videos.slice(0, 3).map((vid) => (
            <a
              key={vid.url}
              href={vid.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles['modal-video-link']}
            >
              <div className={styles['modal-thumb-container']}>
                <img src={vid.thumb} alt={vid.title} className={styles['modal-thumb']} />
                <span className={styles['modal-play']}>&#9654;</span>
              </div>
              <div className={styles['modal-video-title']}>{vid.title}</div>
            </a>
          ))}
        </div>
          {/* Bottom playlist link */}
          <div className={styles['modal-bottom-link-wrap']}>
            <button
              type="button"
              className={styles['modal-bottom-btn']}
              onClick={() => window.open('https://www.youtube.com/playlist?list=PL1234567890', '_blank', 'noopener,noreferrer')}
              aria-label="Watch on YouTube playlist"
            >
              <span className={styles['modal-bottom-icon']} aria-hidden="true">&#9654;</span>
              <span className={styles['modal-bottom-text']}>Watch on YouTube</span>
            </button>
          </div>
      </div>
    </div>
  );
}

export default OurShowcase;

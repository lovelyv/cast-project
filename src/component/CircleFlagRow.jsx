import React, { useState, useEffect, useCallback } from 'react';
import styles from './CircleFlagRow.module.css';

// 3D hexagon layout with upright, readable blocks
export default function CircleFlagRow({ countries = [], duration = '12s', tilt = '0deg', blockSize = '110px', blockWidth = '140px', blockHeight = '110px', spacing = 20, radius: radiusProp }) {
  const size = 100;
  const hexCount = 8;
  const angleStep = 360 / hexCount;
  const baseRadius = radiusProp != null ? Number(radiusProp) : 220;
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const radiusScale = viewportWidth <= 640 ? 0.65 : viewportWidth <= 1024 ? 0.8 : 1;
  const radius = (baseRadius * radiusScale) + spacing;
  const [startIndex, setStartIndex] = useState(0);
  const parseDurationMs = (str) => {
    if (typeof str !== 'string') return 0;
    const sMatch = str.match(/([0-9.]+)s$/);
    if (sMatch) return parseFloat(sMatch[1]) * 1000;
    const msMatch = str.match(/([0-9.]+)ms$/);
    if (msMatch) return parseFloat(msMatch[1]);
    return 0;
  };

  // Advance batch exactly at the end of each full rotation
  useEffect(() => {
    const totalMs = parseDurationMs(duration) || 0;
    if (!countries.length || !totalMs) return;
    const stepMs = totalMs / hexCount;
    let tick = 0;
    const id = setInterval(() => {
      tick += 1;
      if (tick >= hexCount) {
        tick = 0;
        setStartIndex((prev) => {
          const next = prev + hexCount;
          return next >= countries.length ? 0 : next;
        });
      }
    }, stepMs);
    return () => clearInterval(id);
  }, [countries.length, duration, hexCount]);
  const getBatch = (arr, start, count) => {
    if (!arr.length) return [];
    const end = start + count;
    if (end <= arr.length) return arr.slice(start, end);
    const first = arr.slice(start, arr.length);
    const second = arr.slice(0, end % arr.length);
    return first.concat(second);
  };

  const handleAnimationIteration = useCallback(() => {
    if (!countries.length) return;
    setStartIndex((prev) => {
      const next = prev + hexCount;
      return next >= countries.length ? 0 : next;
    });
  }, [countries.length]);


  return (
    <div
      className={styles['folded-wall-row']}
      style={{ ['--carousel-duration']: duration, ['--carousel-tilt']: tilt, ['--block-size']: blockSize, ['--block-width']: blockWidth, ['--block-height']: blockHeight }}
    >
      <div
        className={`${styles['hexagon-group']} ${styles['hexagon-animate']}`}
      >
      {getBatch(countries, startIndex, hexCount).map((country, i) => {
        const angle = i * angleStep;
        return (
          <div
            key={country.name || i}
            className={styles['hex-face-block']}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
              transformStyle: 'preserve-3d',
              transformOrigin: '50% 50%',
            }}
          >
            <a
              href={country.url}
              tabIndex={0}
              title={country.name}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
            >
              <div
                className={styles['country-name-block']}
                style={{
                  color: '#FFFFAA',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  marginBottom: '0.3em',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  position: 'relative',
                }}
              >
                {country.name}
              </div>
              <img
                src={country.img}
                alt={`${country.name} flag`}
                style={{ width: '60px', height: '40px' }}
              />
            </a>
          </div>
        );
      })}
      </div>
    </div>
  );
}

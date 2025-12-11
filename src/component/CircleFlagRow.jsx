import React, { useState, useEffect, useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';
import styles from './CircleFlagRow.module.css';
import logo from '../assets/logo.png';

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
  const [offsetAngle, setOffsetAngle] = useState(0);
  const [offsetTilt, setOffsetTilt] = useState(0);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const lastOffsetRef = useRef(0);
  const lastTiltRef = useRef(0);
  const velXRef = useRef(0); // degrees per second for rotation
  const velTiltRef = useRef(0); // degrees per second for tilt
  const lastMoveTsRef = useRef(0);
  const inertiaRafRef = useRef(0);
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
    let rafId;
    let lastTs;
    const speedDegPerSec = 360 / (totalMs / 1000);
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

    const animate = (ts) => {
      if (draggingRef.current) {
        lastTs = ts;
        rafId = requestAnimationFrame(animate);
        return;
      }
      if (lastTs == null) lastTs = ts;
      const dt = (ts - lastTs) / 1000; // seconds
      lastTs = ts;
      setOffsetAngle((prev) => prev + speedDegPerSec * dt);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => clearInterval(id);
    // cleanup raf
    // eslint-disable-next-line no-undef
    return () => {
      clearInterval(id);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [countries.length, duration, hexCount]);

  const onPointerDown = (e) => {
    draggingRef.current = true;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    dragStartXRef.current = e.clientX;
    dragStartYRef.current = e.clientY;
    lastOffsetRef.current = offsetAngle;
    lastTiltRef.current = offsetTilt;
    velXRef.current = 0;
    velTiltRef.current = 0;
    lastMoveTsRef.current = performance.now();
  };
  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    const now = performance.now();
    const dt = Math.max(0.001, (now - lastMoveTsRef.current) / 1000);
    const dx = e.clientX - dragStartXRef.current;
    const dy = e.clientY - dragStartYRef.current;
    // map pixel delta to degrees; tune sensitivity
    const degX = dx * 0.35; // slightly less sensitive for smoother control
    const degTilt = dy * -0.18; // slightly less sensitive
    const nextTilt = Math.max(-25, Math.min(25, lastTiltRef.current + degTilt));
    // Flush synchronously to reduce perceived delay during drag
    flushSync(() => {
      setOffsetAngle(lastOffsetRef.current + degX);
      setOffsetTilt(nextTilt);
    });
    // velocities (deg/sec) from deltas
    velXRef.current = (degX) / dt;
    velTiltRef.current = (degTilt) / dt;
    lastMoveTsRef.current = now;
  };
  const onPointerUp = () => {
    draggingRef.current = false;
    // start inertia animation: decay velocities smoothly
    const friction = 0.92; // decay per frame (~60fps)
    const tiltFriction = 0.90;
    const minVel = 1; // deg/sec threshold to stop
    const step = () => {
      // convert current velocities to per-frame delta
      const rotVel = velXRef.current;
      const tiltVel = velTiltRef.current;
      // apply
      setOffsetAngle((prev) => prev + rotVel * (1 / 60));
      setOffsetTilt((prev) => {
        const next = prev + tiltVel * (1 / 60);
        return Math.max(-25, Math.min(25, next));
      });
      // decay
      velXRef.current *= friction;
      velTiltRef.current *= tiltFriction;
      if (Math.abs(velXRef.current) < minVel && Math.abs(velTiltRef.current) < minVel) {
        inertiaRafRef.current = 0;
        return;
      }
      inertiaRafRef.current = requestAnimationFrame(step);
    };
    if (!inertiaRafRef.current) inertiaRafRef.current = requestAnimationFrame(step);
  };
  useEffect(() => () => { if (inertiaRafRef.current) cancelAnimationFrame(inertiaRafRef.current); }, []);
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
        className={styles['hexagon-group']}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{ transform: `translate(-50%, -50%) rotateX(${offsetTilt}deg)`, cursor: draggingRef.current ? 'grabbing' : 'grab', userSelect: 'none' }}
      >
      {/* Base plane sized to radius */}
      <div
        className={styles['carousel-base']}
        style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
      >
        <img
          src={logo}
          alt="Site logo"
          style={{
            width: `${Math.max(80, Math.floor(radius * 0.9))}px`,
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))',
            userSelect: 'none',
          }}
        />
      </div>
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
              transform: `translate(-50%, -50%) rotateY(${angle + offsetAngle}deg) translateZ(${radius}px)`,
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

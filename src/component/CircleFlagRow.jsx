import React, { useState, useEffect, useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';
import styles from './CircleFlagRow.module.css';
import logo from '../assets/logo.png';

// 3D hexagon layout with upright, readable blocks
export default function CircleFlagRow({ countries = [], duration = '12s', tilt = '0deg', blockSize = '110px', blockWidth = '140px', blockHeight = '110px', spacing = 20, radius: radiusProp }) {
  const size = 100;
  const hexCount = 8; // show 8 at a time
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
  const startIndexRef = useRef(0);
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

  useEffect(() => {
    const totalMs = parseDurationMs(duration) || 0;
    if (!countries.length || !totalMs) return;
    let rafId;
    let lastTs;
    let rotAccum = 0; // degrees accumulated since last batch advance
    const speedDegPerSec = -360 / (totalMs / 1000);

    const animate = (ts) => {
      if (draggingRef.current) {
        lastTs = ts;
        rafId = requestAnimationFrame(animate);
        return;
      }
      if (lastTs == null) lastTs = ts;
      const dt = (ts - lastTs) / 1000; // seconds
      lastTs = ts;
      const delta = speedDegPerSec * dt;
      rotAccum += Math.abs(delta);
      setOffsetAngle((prev) => {
        let next = prev + delta;
        // keep angle bounded to avoid floating drift
        if (next >= 360 || next <= -360) next = next % 360;
        return next;
      });
      // Advance batch exactly when a full 360° rotation has accumulated
      if (rotAccum >= 360) {
        rotAccum = 0;
        // After one full rotation, advance by 8 to show the next set
        flushSync(() => {
          setStartIndex((prev) => (prev + hexCount) % countries.length);
          setOffsetAngle(0);
        });
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => { if (rafId) cancelAnimationFrame(rafId); };
  }, [countries.length, duration]);

  const onPointerDown = (e) => {
    draggingRef.current = true;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    dragStartXRef.current = e.clientX;
    dragStartYRef.current = e.clientY;
    lastOffsetRef.current = offsetAngle;
    lastTiltRef.current = offsetTilt;
    startIndexRef.current = startIndex;
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
    // Folding rotation into index steps so visible countries update while dragging
    const stepSize = angleStep;
    const totalAngle = lastOffsetRef.current + degX;
  const steps = Math.trunc(totalAngle / stepSize);
  const foldedAngle = totalAngle - steps * stepSize; // keep within one step range
  // Move forward in config order when dragging right (positive dx)
  const nextStartIndex = ((startIndexRef.current + steps) % countries.length + countries.length) % countries.length;
    // Flush synchronously to reduce perceived delay during drag
    flushSync(() => {
      setStartIndex(nextStartIndex);
      setOffsetAngle(foldedAngle);
      setOffsetTilt(nextTilt);
    });
    // velocities (deg/sec) from deltas
    velXRef.current = (degX) / dt;
    velTiltRef.current = (degTilt) / dt;
    lastMoveTsRef.current = now;
  };
  const onPointerUp = () => {
    draggingRef.current = false;
    // Update refs baseline post-drag
    startIndexRef.current = startIndex;
    lastOffsetRef.current = offsetAngle;
    // start inertia animation: decay velocities smoothly
    const friction = 0.92; // decay per frame (~60fps)
    const tiltFriction = 0.90;
    const minVel = 1; // deg/sec threshold to stop
    const step = () => {
      // convert current velocities to per-frame delta
      const rotVel = velXRef.current;
      const tiltVel = velTiltRef.current;
      // apply
      setOffsetAngle((prev) => {
        const next = prev + rotVel * (1 / 60);
        // fold into index updates when passing step boundaries
        const steps = Math.trunc(next / angleStep);
        if (steps !== 0) {
          // Keep progression consistent with config order during inertia
          const newIndex = ((startIndexRef.current + steps) % countries.length + countries.length) % countries.length;
          startIndexRef.current = newIndex;
          setStartIndex(newIndex);
        }
        return next - steps * angleStep;
      });
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
  // Batch helper to show exactly 8 items
  const getBatch = (arr, start, count) => {
    if (!arr.length) return [];
    const end = start + count;
    if (end <= arr.length) return arr.slice(start, end);
    const first = arr.slice(start, arr.length);
    const second = arr.slice(0, end % arr.length);
    return first.concat(second);
  };


  // Derive responsive block sizes from provided props (px values)
  const parsePx = (val, fallback) => {
    const n = typeof val === 'string' ? parseFloat(val) : Number(val);
    return Number.isFinite(n) ? n : fallback;
  };
  const bw = parsePx(blockWidth, 140);
  const bh = parsePx(blockHeight, 110);
  const mdBw = Math.round(bw * 0.9);
  const mdBh = Math.round(bh * 0.9);
  const smBw = Math.round(bw * 0.8);
  const smBh = Math.round(bh * 0.82);
  return (
    <div
      className={styles['folded-wall-row']}
      style={{
        ['--carousel-duration']: duration,
        ['--carousel-tilt']: tilt,
        ['--block-size']: blockSize,
        ['--block-width']: `${bw}px`,
        ['--block-height']: `${bh}px`,
        ['--block-width-md']: `${mdBw}px`,
        ['--block-height-md']: `${mdBh}px`,
        ['--block-width-sm']: `${smBw}px`,
        ['--block-height-sm']: `${smBh}px`,
      }}
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

import React from 'react';
import logo from '../assets/logo.png';

/**
 * SubpageWatermark
 * Renders a fixed, low-opacity logo background on subpages.
 */
export default function SubpageWatermark({
  size = '45vw',
  opacity = 0.15,
  position = 'center center',
  zIndex = 0,
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0, // avoid 100vw/100vh to prevent mobile horizontal scroll
        backgroundImage: `url(${logo})`,
        backgroundPosition: position,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${size} auto`,
        opacity,
        pointerEvents: 'none',
        zIndex,
      }}
    />
  );
}

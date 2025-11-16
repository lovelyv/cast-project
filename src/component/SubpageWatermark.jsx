import React from 'react';
import logo from '../assets/logo.png';

/**
 * SubpageWatermark
 * Renders a fixed, low-opacity logo background on subpages.
 */
export default function SubpageWatermark() {
  const watermarkStyle = {
    position: 'fixed',
    inset: 0, // avoid 100vw/100vh to prevent mobile horizontal scroll
    backgroundImage: `url(${logo})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '45vw auto',
    opacity: 0.23,
    pointerEvents: 'none',
    zIndex: 0,
  };
  return (
    <div
      aria-hidden="true"
      style={watermarkStyle}
    />
  );
}

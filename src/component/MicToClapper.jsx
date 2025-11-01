import React from 'react'

// MicToClapper: Fade-in animation showing a microphone, then a clapperboard
// (black and white stripes) fading in next to it.
export default function MicToClapper({ width = '100%', height, className }) {
  const W = 900
  const H = 180

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="title desc"
    >
      <title id="title">Microphone and clapperboard fade-in transition</title>
      <desc id="desc">A studio microphone fades in on the left, followed by a film clapperboard with black and white stripes on the right.</desc>

      <defs>
        <linearGradient id="panelGrad3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f3b4b" />
          <stop offset="100%" stopColor="#364154" />
        </linearGradient>
        <linearGradient id="silverGrad3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7f8fa" />
          <stop offset="30%" stopColor="#dfe3ea" />
          <stop offset="60%" stopColor="#c2c9d3" />
          <stop offset="100%" stopColor="#a6afbd" />
        </linearGradient>
        <linearGradient id="metalDark3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9aa3af" />
          <stop offset="100%" stopColor="#5f6977" />
        </linearGradient>
        <radialGradient id="silverSheen3" cx="35%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Panel - transparent background */}
      <rect x="0" y="0" width={W} height={H} rx="16" fill="transparent" />

      {/* Microphone (left side, fades in first) */}
      <g transform="translate(280,90)" opacity="0">
        {/* Base */}
        <rect x="-20" y="60" width="40" height="8" rx="4" fill="url(#metalDark3)" />
        {/* Stem */}
        <rect x="-6" y="30" width="12" height="30" rx="6" fill="url(#metalDark3)" />
        {/* Mic body */}
        <ellipse cx="0" cy="0" rx="30" ry="40" fill="url(#silverGrad3)" stroke="#9aa3af" strokeWidth="1.5" />
        {/* Grille lines */}
        <g stroke="#8d97a6" strokeWidth="2.5" opacity="0.7">
          <line x1="-24" y1="-20" x2="24" y2="-20" />
          <line x1="-24" y1="-8" x2="24" y2="-8" />
          <line x1="-24" y1="4" x2="24" y2="4" />
          <line x1="-24" y1="16" x2="24" y2="16" />
        </g>
        {/* Sheen */}
        <ellipse cx="-5" cy="-8" rx="18" ry="15" fill="url(#silverSheen3)" opacity="0.6" />
        
        {/* Fade in microphone */}
        <animate attributeName="opacity" from="0" to="1" dur="1.2s" fill="freeze" />
      </g>

      {/* Clapperboard (right side, fades in after mic) */}
      <g transform="translate(560,90)" opacity="0">
        {/* Main board body */}
        <rect x="-60" y="10" width="120" height="60" rx="6" fill="#2b3646" stroke="#475568" strokeWidth="1.5" />
        {/* Top clapper with black & white stripes */}
        <g>
          <rect x="-60" y="-30" width="120" height="36" rx="4" fill="#1f2833" />
          {/* White stripes */}
          <rect x="-60" y="-30" width="24" height="36" fill="#e6edf5" />
          <rect x="-24" y="-30" width="24" height="36" fill="#e6edf5" />
          <rect x="12" y="-30" width="24" height="36" fill="#e6edf5" />
          {/* Separator line */}
          <line x1="-60" y1="6" x2="60" y2="6" stroke="#475568" strokeWidth="2" />
        </g>
        {/* Small detail lines on body */}
        <g fill="#e6edf5" opacity="0.8">
          <rect x="-50" y="18" width="30" height="6" rx="2" />
          <rect x="-50" y="30" width="40" height="6" rx="2" />
          <rect x="-50" y="42" width="35" height="6" rx="2" />
        </g>

        {/* Fade in clapperboard after mic */}
        <animate attributeName="opacity" from="0" to="1" dur="1.2s" begin="1s" fill="freeze" />
      </g>

      {/* No overlay - keep transparent */}
    </svg>
  )
}
